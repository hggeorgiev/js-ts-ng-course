import {Component, Output, EventEmitter} from '@angular/core'

@Component({
  selector: 'counter',
  template: `
    <div>
      <h1>{{counter}}</h1>
      <button (click)="change(1)">+1</button>
      <button (click)="change(-1)">-1</button>
    </div>`
})
export class Counter {
  counter = 0
  
  @Output() changes = new EventEmitter();
  
  change(increment) {
    this.counter += increment;
    //we use emit as next is marked as deprecated
    this.changes.emit(this.counter);
  }
}