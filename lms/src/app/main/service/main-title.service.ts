import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MainTitleService {
    private title$$ = new BehaviorSubject('');
    public title$ = this.title$$.asObservable();
    constructor() {}

    public setTitle(title: string): void {
        this.title$$.next(title);
    }
}
