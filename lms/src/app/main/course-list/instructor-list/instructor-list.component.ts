import { Component, Input } from '@angular/core';
import { CourseListInstructor } from '../models/course-list-instructor.model';

@Component({
    selector: 'lms-instructor-list',
    templateUrl: './instructor-list.component.html',
    styleUrls: ['./instructor-list.component.scss'],
})
export class InstructorListComponent {
    @Input()
    public instructors: CourseListInstructor[] = [];
}
