import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
        {{ message | async}} 
    `
})
export class AppComponent implements OnInit {
  message: Observable<string>;

  ngOnInit() {
    this.message = new Observable<string>()( (observer) => {
      setTimeout( () => observer.next('Hi, I am an observable message'), 2000 )
    })


  }


}

