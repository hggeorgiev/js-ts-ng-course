import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'my-app',
    template: `
        {{ message | async}} 
    `
})
export class AppComponent implements OnInit {
    message: Observable<string>;
    
    ngOnInit() {
        this.message = Observable.create( (observer) => {
            setTimeout( () => observer.next('Hi, I am an observable message'), 2000 )
        })


    }


 }
