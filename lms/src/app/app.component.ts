import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { MainTitleService } from './main/service/main-title.service';
import { DestroyableComponent } from './main/shared/components/destroyable.component';

@Component({
    selector: 'lms-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends DestroyableComponent implements OnInit {
    public pageTitle = 'Courses';

    constructor(public titleService: MainTitleService, private cdr: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {
        this.titleService.title$.pipe(takeUntil(this.destroy$$)).subscribe((data) => {
            if (data) {
                this.pageTitle = data;
                this.cdr.detectChanges();
            }
        });
    }
}
