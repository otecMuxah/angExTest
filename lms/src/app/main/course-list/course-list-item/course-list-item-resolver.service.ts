import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CourseListService } from '../services/course-list.service';
import { Observable, of } from 'rxjs';
import { CourseExpandedInfo } from '../models/course-expanded-info.model';

@Injectable({
    providedIn: 'root',
})
export class CourseListItemResolverService implements Resolve<CourseExpandedInfo> {
    constructor(private courseListService: CourseListService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CourseExpandedInfo> {
        const id = route?.paramMap?.get('id');
        return id ? this.courseListService.getCourse(id) : of({} as CourseExpandedInfo);
    }
}
