import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: ` Name:
        {{firstName | myUpper}}
    `
})
export class AppComponent {
    firstName = 'Todor'
}
