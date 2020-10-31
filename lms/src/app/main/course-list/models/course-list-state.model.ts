import { CourseShortInfo } from './course-short-info.model';

export interface CourseListState {
    courses?: Array<CourseShortInfo>;
    filter?: Filter;
}

export interface Filter {
    status: string;
    term: string;
}
