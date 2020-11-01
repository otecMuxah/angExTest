import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Data } from '@angular/router';
import { first, takeUntil } from 'rxjs/operators';
import { MainTitleService } from '../../service/main-title.service';
import { DestroyableComponent } from '../../shared/components/destroyable.component';
import { CourseExpandedInfo } from '../models/course-expanded-info.model';
import { CourseListInstructor } from '../models/course-list-instructor.model';
import { CourseListService } from '../services/course-list.service';

@Component({
    selector: 'lms-course-list-item',
    templateUrl: './course-list-item.component.html',
    styleUrls: ['./course-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListItemComponent extends DestroyableComponent implements OnInit {
    public course: CourseExpandedInfo | undefined;

    public courseForm = new FormGroup({
        name: new FormControl(''),
        status: new FormControl(''),
        images: new FormControl([]),
        instructors: new FormControl([]),
    });

    constructor(
        private route: ActivatedRoute,
        private titleService: MainTitleService,
        public courseListService: CourseListService,
        private cdr: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        // temporary to get statuses and instructors from course list, needed if navigated on course detailed info by direct link
        this.courseListService
            .getCourses()
            .pipe(first())
            .subscribe(() => {
                this.cdr.detectChanges();
            });

        this.route.data.pipe(takeUntil(this.destroy$$)).subscribe((data: Data) => {
            this.course = data.course;
            this.titleService.setTitle(`Course - ${this.course?.name}`);
            this.courseForm.reset(this.course);
            this.cdr.detectChanges();
        });
    }

    public selectedInstructor(event: MatAutocompleteSelectedEvent): void {
        const instructorsControl = this.courseForm.get('instructors');
        const toSet = [...instructorsControl?.value, event.option.value];
        instructorsControl?.setValue(toSet);
    }

    public removeInstructor(instructorToRemove: CourseListInstructor): void {
        const instructorsControl = this.courseForm.get('instructors');
        const result: CourseListInstructor[] = instructorsControl?.value.filter(
            (instructor: CourseListInstructor) => instructor.name !== instructorToRemove.name
        );
        instructorsControl?.setValue(result);
    }
}
