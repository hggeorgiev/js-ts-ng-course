import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, merge, Observable } from "rxjs/index";
import { map, scan } from "rxjs/internal/operators";

@Component({
  selector: 'app-root',
  template: `    
    Counter: <span #counter id="counter">{{ $totals | async}}</span><br/>
    <br/>

    <button #add id="add" value="+1">+</button>
    <button #sub id="sub" value="-1">-</button>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  $totals: Observable<number>
  @ViewChild('add') addBtn: ElementRef<HTMLButtonElement>;
  @ViewChild('sub') subBtn: ElementRef<HTMLButtonElement>;
  @ViewChild('counter') counter: ElementRef<HTMLSpanElement>;

  constructor() {
  }

  ngAfterViewInit() {
    const increment$ = fromEvent(this.addBtn.nativeElement, 'click');
    const decrement$ = fromEvent(this.subBtn.nativeElement, 'click');
    const clicks$    = merge(increment$, decrement$).pipe(map((event) => parseInt(event.target.value, 10)
    ));

    this.$totals = clicks$.pipe(scan(
      (total, value) => {
        console.log("The total is", total)
        console.log("The new value is", value);
        return total + value;
      }, 0
    ));




  }



}
