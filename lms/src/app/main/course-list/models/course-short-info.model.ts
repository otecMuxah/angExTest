import { CourseListInstructor } from './course-list-instructor.model';

export interface CourseShortInfo {
    id: number;
    imageUrl: string;
    instructors: Array<CourseListInstructor>;
    name: string;
    status: string;
}
