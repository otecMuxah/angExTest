import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainTitleService } from './main/service/main-title.service';
import { MaterialModule } from './main/shared/material.module';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, AppRoutingModule, MaterialModule],
            declarations: [AppComponent],
            providers: [MainTitleService],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'Courses'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.pageTitle).toEqual('Courses');
    });

    it('should render title "Courses"', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        const el = compiled.querySelector('span.title');
        expect(el.innerHTML).toEqual('Courses');
    });
});
