import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DestroyableComponent } from './components/destroyable.component';

const modules = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
];

@NgModule({
    imports: modules,
    exports: modules,
    declarations: [DestroyableComponent],
})
export class SharedModule {}
