/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

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