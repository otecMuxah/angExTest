import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CourseExpandedInfo } from '../models/course-expanded-info.model';
import { CourseListInstructor } from '../models/course-list-instructor.model';
import { CourseShortInfo } from '../models/course-short-info.model';

const BASE_URL = 'http://localhost:3080/api';

@Injectable()
export class CourseListService {
    private allStatuses: string[] = [];
    private allInstructors: CourseListInstructor[] = [];
    private availableStatuses$$ = new BehaviorSubject<string[]>([]);
    private availableInstructors$$ = new BehaviorSubject<CourseListInstructor[]>([]);
    public availableInstructors$: Observable<CourseListInstructor[]> = this.availableInstructors$$.asObservable();
    public availableStatuses$: Observable<string[]> = this.availableStatuses$$.asObservable();
    constructor(private http: HttpClient) {}

    public getCourses(): Observable<CourseShortInfo[]> {
        return this.http.get<CourseShortInfo[]>(`${BASE_URL}/courses`).pipe(
            tap((courses) => {
                // mock for statuses and instructors
                courses.forEach((course) => {
                    this.allStatuses.push(course.status);
                    this.allInstructors.push(...course.instructors);
                });
                this.availableStatuses$$.next([...new Set([...this.allStatuses])]);
                this.availableInstructors$$.next(
                    this.allInstructors.filter(
                        (instructor, index, self) =>
                            index === self.findIndex((i) => i.image === instructor.image && i.name === instructor.name)
                    )
                );
            }),
            catchError(this.errorHandler)
        );
    }

    public getCourse(id: number | string): Observable<CourseExpandedInfo> {
        return this.http.get<CourseExpandedInfo>(`${BASE_URL}/courses/${id}`).pipe(catchError(this.errorHandler));
    }

    private errorHandler(error: HttpErrorResponse): Observable<never> {
        console.log(error.message);
        return throwError({ status: error.status, errors: error.error });
    }
}
