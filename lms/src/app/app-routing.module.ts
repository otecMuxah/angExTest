import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'courses',
        loadChildren: () => import('./main/course-list/course-list.module').then((m) => m.CourseListModule),
    },
    { path: '', pathMatch: 'full', redirectTo: 'courses' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
