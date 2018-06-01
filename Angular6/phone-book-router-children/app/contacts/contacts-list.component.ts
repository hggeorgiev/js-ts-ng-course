/* Copyright (C) 2017 Centroida & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: info@itce.com
 * or to prometheus@itce.com
 */

import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import { Contact } from "./contact"
import { ContactsService } from "./contact.service"
import { Subscription } from 'rxjs/Subscription'

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
export class ContactsListComponent implements OnInit, OnDestroy
{
    selected: number
    persons: Contact[]
    private paramsSub: Subscription
    private routerSub: Subscription

    constructor(
        private personService: ContactsService, 
        private router: Router,
        private route: ActivatedRoute
    ) {}

    remove(person: Contact) {
        if(person.id==this.selected )
            this.router.navigate(['/contacts'])
                .then( (success) => success && this.personService.remove(person.id) )
        else
            this.personService.remove(person.id)
    }

    onSelect(person: Contact) {
        this.router.navigate(['/contacts', person.id])
    }

    ngOnInit() {
        this.persons = this.personService.getAll();
        
        this.routerSub = this.router.events
            .filter((e) => e instanceof NavigationEnd)
            .subscribe( () => {
                if( this.paramsSub )
                    this.paramsSub.unsubscribe()
                if( this.route.firstChild )
                    this.paramsSub = this.route.firstChild
                        .params
                        .map((params: Params) => +params['id'])
                        .subscribe(contactId => this.selected = contactId)
            })
        
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe()
        this.routerSub.unsubscribe()
    }
}
