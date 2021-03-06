import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { CourseShortInfo } from './models/course-short-info.model';
import { CourseListService } from './services/course-list.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { CourseListFilter } from './models/course-list-filter.model';
import { DestroyableComponent } from '../shared/components/destroyable.component';
import { MainTitleService } from '../service/main-title.service';
import { CourseListInstructor } from './models/course-list-instructor.model';

export const COURSE_LIST_PAGE_TITLE = 'Courses';

@Component({
    selector: 'lms-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent extends DestroyableComponent implements OnInit, AfterViewInit {
    @ViewChild('filterForm')
    public filterForm: NgForm | undefined;

    public filter: CourseListFilter = {
        term: '',
        status: '',
    };

    public displayedColumns = ['id', 'imageUrl', 'name', 'status'];
    public availableStatuses$: Observable<string[]> = this.courseListService.availableStatuses$;

    public courses$: Observable<CourseShortInfo[]> = new Observable<CourseShortInfo[]>();
    public filter$$: BehaviorSubject<CourseListFilter> = new BehaviorSubject(this.filter);

    constructor(private courseListService: CourseListService, private titleService: MainTitleService) {
        super();
    }

    public ngOnInit(): void {
        this.titleService.setTitle(COURSE_LIST_PAGE_TITLE);
        this.courses$ = combineLatest([this.courseListService.getCourses(), this.filter$$]).pipe(
            map(([courses, filter]) => this.filterCoursesByTermAndStatus(courses, filter)),
            takeUntil(this.destroy$$)
        );
    }

    public ngAfterViewInit(): void {
        this.filterForm?.form?.valueChanges
            .pipe(debounceTime(200), takeUntil(this.destroy$$))
            .subscribe((filter: CourseListFilter) => this.filter$$.next(filter));
    }

    public listTrackBy(index: number, item: CourseShortInfo): number {
        return item.id;
    }

    private filterCoursesByTermAndStatus(courses: CourseShortInfo[], filter: CourseListFilter): CourseShortInfo[] {
        return courses.filter((course) => {
            return (
                (course.name.toLocaleLowerCase().indexOf(filter.term.toLocaleLowerCase()) !== -1 ||
                    this.filterByAuthor(course, filter.term)) &&
                course.status.toLocaleLowerCase().indexOf(filter.status.toLocaleLowerCase()) !== -1
            );
        });
    }

    private filterByAuthor(course: CourseShortInfo, term: string): boolean {
        return course.instructors.some(
            (instructor: CourseListInstructor) =>
                instructor.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) !== -1
        );
    }
}
