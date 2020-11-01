/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MainTitleService } from '../service/main-title.service';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { CourseListComponent } from './course-list.component';
import { CourseShortInfo } from './models/course-short-info.model';
import { CourseListService } from './services/course-list.service';

const courseListServiceStub = {
    getCourses(): Observable<CourseShortInfo[]> {
        const courses = [
            {
                id: 88,
                name: 'Fundamentals of Credit',
                imageUrl: 'https://picsum.photos/100/100',
                status: 'DRAFT',
                instructors: [
                    {
                        name: 'Roli Jain',
                        image: 'https://picsum.photos/300/300',
                    },
                    {
                        name: 'Sebastian Taylor',
                        image: 'https://picsum.photos/300/300',
                    },
                ],
            },
            {
                id: 89,
                name: 'Accounting Fundamentals',
                status: 'PUBLISHED',
                imageUrl: 'https://picsum.photos/100/100',
                instructors: [
                    {
                        name: 'Will Smith',
                        image: 'https://picsum.photos/300/300',
                    },
                ],
            },
        ];
        return of(courses);
    },
};

describe('CourseListComponent', () => {
    let component: CourseListComponent;
    let fixture: ComponentFixture<CourseListComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [RouterModule.forRoot([]), SharedModule, MaterialModule, BrowserAnimationsModule],
                declarations: [CourseListComponent],
                providers: [MainTitleService, { provide: CourseListService, useValue: courseListServiceStub }],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create list of courses', () => {
        component.courses$.subscribe((courses) => {
            expect(courses[0]?.id).toEqual(88);
        });
    });

    it('should create filtered list of courses by status', () => {
        component.filter = {
            term: '',
            status: 'PUBLISHED',
        };
        component.filter$$.next(component.filter);
        component.courses$.subscribe((courses) => {
            expect(courses[0]?.status).toEqual('PUBLISHED');
        });
    });
    it('should search courses by course name', () => {
        component.filter = {
            term: 'accounting',
            status: '',
        };
        component.filter$$.next(component.filter);
        component.courses$.subscribe((courses) => {
            expect(courses[0]?.name).toEqual('Accounting Fundamentals');
        });
    });
    it('should search courses by instructor name', () => {
        component.filter = {
            term: 'will smith',
            status: '',
        };
        component.filter$$.next(component.filter);
        component.courses$.subscribe((courses) => {
            expect(courses[0]?.instructors[0].name).toEqual('Will Smith');
        });
    });
    it('should render list of courses', () => {
        const compiled = fixture.debugElement.nativeElement;
        const el = compiled.querySelector('a.course-link');
        expect(el.innerHTML).toEqual('Fundamentals of Credit');
    });
});
