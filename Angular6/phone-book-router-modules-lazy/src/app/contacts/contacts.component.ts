

import { Component }     from '@angular/core'

@Component({
    selector: 'contacts',
    template: `
        <contacts-list></contacts-list>
        
        <a id="add" class="text-danger" [routerLink]="['/contacts', -1]"><span class="glyphicon glyphicon-plus"></span>Add</a>
        
        <router-outlet></router-outlet>
    `
})
export class ContactsComponent {}