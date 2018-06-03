import { Component, OnInit } from '@angular/core'
import { fromEvent, merge } from "rxjs";
import { map, scan } from "rxjs/internal/operators";


@Component({
  selector: 'app-root',
  template: `
    Counter: <span id="counter"></span><br/>
    <br/>

    <button id="add" value="+1">+</button>
    <button id="sub" value="-1">-</button>
  `
})
export class AppComponent implements OnInit {
  ngOnInit() {
    let addBtn = document.getElementById('add');
    let subBtn = document.getElementById('sub');

    let counter = document.getElementById('counter');

    let increment$ = fromEvent(addBtn, 'click');
    let decrement$ = fromEvent(subBtn, 'click');
    let clicks$    = merge(increment$, decrement$).pipe(map((event: any) => parseInt(event.target.value)))
    // function to use and seed value
    let totals$    = clicks$.pipe(scan((total, value) => {

        console.log("The total is", total)
        console.log("The new value is", value);
        return total + value

      }, 0)
    )


    // totals$.subscribe((deviation: number)=> console.log(deviation) )

    totals$.subscribe(total => counter.innerHTML = total.toString())
  }
}
