import {Component, Output, EventEmitter} from '@angular/core'

@Component({
  selector: 'counter',
  templateUrl: 'app/counter.component.html'
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