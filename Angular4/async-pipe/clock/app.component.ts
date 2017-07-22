import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'my-app',
    template: `
        {{ time | async | date : 'mediumTime'}} 
    `
})
export class AppComponent implements OnInit {
    time: Observable<Date>;
    
    ngOnInit() {
        this.time = Observable.create( (observer) => {
            setInterval( () => {
                observer.next(new Date())
                console.log('tick')
            }, 1000 )   
        })
    }
 }
