import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './main/shared/material.module';

@NgModule({
    declarations: [AppComponent],
    imports: [CommonModule, BrowserModule, BrowserAnimationsModule, AppRoutingModule, MaterialModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
