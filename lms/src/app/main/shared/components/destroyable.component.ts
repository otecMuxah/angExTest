import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    template: '',
    selector: 'lms-destroyable',
})
export class DestroyableComponent implements OnDestroy {
    protected destroy$$ = new Subject();

    ngOnDestroy(): void {
        this.destroy$$.next();
        this.destroy$$.complete();
    }
}
