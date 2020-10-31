/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { CourseListService } from '../services/course-list.service';
import { CourseListItemComponent } from './course-list-item.component';

describe('CourseListItemComponent', () => {
    let component: CourseListItemComponent;
    let fixture: ComponentFixture<CourseListItemComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [RouterModule.forRoot([]), SharedModule, MaterialModule, BrowserAnimationsModule],
                declarations: [CourseListItemComponent],
                providers: [CourseListService],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
