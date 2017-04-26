/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component } from '@angular/core'
import { ContactsService } from './contacts.service'

@Component({
    selector: 'my-app',
    template: `
        <ul>
            <li *ngFor="let contact of contacts" class="item" [class.active]="selected == contact">
                <a href='#' (click)='onSelect(contact)'>{{contact.firstName}} {{contact.lastName | myUpper}}</a>
                <a href='#' onclick='ctrl.remove(event, " + contact.id + ")' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>
            </li>
        </ul>

        <contact-details></contact-details>
    `
})
export class AppComponent {
    contacts: Contact[]
    selected: Contact

    constructor(contactsService: ContactsService) {
        this.contacts = contactsService.getAll()
    }

    onSelect(contact: Contact) {
        this.selected = contact
    }
}