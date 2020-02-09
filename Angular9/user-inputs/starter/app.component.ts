import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <input (keyup)="onKey($event)">
        <p>{{values}}</p>
    `
})
export class AppComponent {
    values='';

    // without strong typing
    onKey(event:any) { // KeyboardEvent
        this.values +=  event.target.value + ' | '; // (<HTMLInputElement>event.target).value
    }
}
