/* Copyright (C) 2017 Centroida & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import 'rxjs/add/operator/map'
import { Contact } from "./contact"
import { ContactsService } from "./contact.service"

@Component({
    selector: 'contacts-list',
    template: `
        <ul>
            <li *ngFor="let person of persons" class="item" [class.active]="selected==person.id">
                <a (click)="onSelect(person)">{{person.firstName}} {{person.lastName | uppercase}}</a>
                <a (click)="remove(person)" class="remove" title="Remove"><span class="glyphicon glyphicon-remove-sign"></span></a>
            </li>
        </ul>
    `
})
export class ContactsListComponent implements OnInit 
{
    selected: number
    persons: Contact[]

    constructor(
        private personService: ContactsService, 
        private router: Router,
        private route: ActivatedRoute
    ) {}

    remove(person: Contact) {    
        this.personService.remove(person.id)
        if(person.id==this.selected )
            this.router.navigate(['/contacts'])
    }

    onSelect(person: Contact) {
        this.router.navigate(['/contacts', person.id])
    }

    ngOnInit() {
        this.persons = this.personService.getAll();

        this.route.params
            .map((params: Params) => +params['id'])
            .subscribe(contactId => this.selected = contactId)
    }
}
