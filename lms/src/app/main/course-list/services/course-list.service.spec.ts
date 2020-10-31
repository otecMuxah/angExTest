import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CourseListService } from './course-list.service';

describe('CourseListService', () => {
    let service: CourseListService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [CourseListService],
        });
        service = TestBed.inject(CourseListService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
