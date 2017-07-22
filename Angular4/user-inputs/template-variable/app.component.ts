import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <input #box (keyup)="onKey(box.value)">
        <p>{{values}}</p>
    `
})
export class AppComponent {
    values='';

    // without strong typing
    onKey(value:string) {
        this.values += value + ' | ';
    }
}
