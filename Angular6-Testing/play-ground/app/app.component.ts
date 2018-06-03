import {Component} from '@angular/core'
@Component({
    selector: 'my-app',
    template: `
        <greet></greet>
        <router-outlet></router-outlet>
        <a [routerLink]="['']">List</a> | <a [routerLink]="['about']">About</a>
    `
})
export class AppComponent {}