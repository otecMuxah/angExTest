import { NgModule } from '@angular/core';
import { CourseListComponent } from './course-list.component';
import { SharedModule } from '../shared/shared.module';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { MaterialModule } from '../shared/material.module';
import { RouterModule, Routes } from '@angular/router';
import { CourseListItemResolverService } from './course-list-item/course-list-item-resolver.service';
import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { CourseListService } from './services/course-list.service';

const routes: Routes = [
    { path: '', component: CourseListComponent, data: { title: 'Courses list' } },
    { path: ':id', component: CourseListItemComponent, resolve: { course: CourseListItemResolverService } },
];

@NgModule({
    imports: [SharedModule, MaterialModule, RouterModule.forChild(routes)],
    declarations: [CourseListComponent, CourseListItemComponent, InstructorListComponent],
    providers: [CourseListItemResolverService, CourseListService],
})
export class CourseListModule {}
