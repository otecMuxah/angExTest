import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MainTitleService } from './main/service/main-title.service';

@Component({
    selector: 'lms-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
    public pageTitle = 'Courses';

    constructor(public titleService: MainTitleService, private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.titleService.title$.subscribe((data) => {
            if (data) {
                this.pageTitle = data;
                this.cdr.detectChanges();
            }
        });
    }
}
