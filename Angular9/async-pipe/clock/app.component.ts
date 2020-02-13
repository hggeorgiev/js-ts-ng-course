import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    {{ time | async | date : 'mediumTime'}}
  `
})
export class AppComponent implements OnInit {
  time: Observable<Date>;

  ngOnInit() {
    this.time = new Observable<Date>()( (observer) => {
      setInterval( () => {
        observer.next(new Date())
        console.log('tick')
      }, 1000 )
    })
  }
}
