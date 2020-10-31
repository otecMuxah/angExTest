import { CourseListInstructor } from './course-list-instructor.model';

export interface CourseExpandedInfo {
    id: number;
    images: Array<string>;
    instructors: Array<CourseListInstructor>;
    name: string;
    status: string;
}
