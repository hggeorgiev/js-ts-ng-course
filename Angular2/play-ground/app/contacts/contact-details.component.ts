/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core'
import { NgForm }           from "@angular/forms"
import { ContactsService }  from "./contacts.service"

@Component({
    selector: 'contact-details',
    template: `
        <div id="contactsDetailsContainer" *ngIf="contact">
            <span *ngIf="!showEdit">
                <label>First Name: </label><b>{{contact.firstName}}</b><br/>
                <label>Last Name: </label><b>{{contact.lastName}}</b><br/>
                <label>email: </label><b>{{contact.email}}</b><br/>
                <label></label><a href="#" class="text-danger" (click)="showEdit = true"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>
            </span>
            <form name="editContactForm" #form="ngForm" (ngSubmit)="onSubmit($event, form)" *ngIf="showEdit" novalidate>
                <label for="firstName">First Name: </label>
                <input id="firstName" name="firstName" [ngModel]="contact.firstName" required><br/>
                <div class="alert alert-danger" role="alert" *ngIf="form.controls.firstName && !form.controls.firstName.pristine && !form.controls.firstName.valid">First name is required</div>
                
                <label for="lastName">Last Name: </label>
                <input id="lastName" name="lastName" [ngModel]="contact.lastName" required><br/>
                <div class="alert alert-danger" role="alert" *ngIf="form.controls.lastName && !form.controls.lastName.pristine && !form.controls.lastName.valid">Last name is required</div>

                <label for="email">email: </label>
                <input id="email" name="email" [ngModel]="contact.email" email><br/>
                <div class="alert alert-danger" role="alert" *ngIf="form.controls.email && !form.controls.email.valid">Email is invalid</div>
                
                <label></label>
                <input type="submit" [disabled]="form.invalid || form.pristine" [value]="contact.id!==-1 ? 'Save' : 'Add'" class="btn btn-danger" />
                <a href="#" class="text-danger" (click)="onCancel()">Cancel</a>
            </form>
        </div>
    `
})
export class ContactDetailsComponent implements OnChanges {
    @Input()
    contact: Contact
    
    @Output()
    contactChange = new EventEmitter<Contact>()

    showEdit = false

    constructor(private contactsService: ContactsService) {}

    onCancel() {
        this.showEdit = false

        if( this.contact && this.contact.id===-1 ) {
            this.contact = null
            this.contactChange.emit(this.contact)
        }
    }

    onSubmit(event: UIEvent, form: NgForm) {
        event.preventDefault()
        
        if(! form.valid ) return

        let dirtyContact: Contact = form.value
        dirtyContact.id = this.contact.id

        if(this.contact.id === -1)
            this.contactsService.add(dirtyContact)   
        else
            this.contactsService.update(dirtyContact);

        this.contact = dirtyContact

        this.contactChange.emit(dirtyContact)

        this.showEdit = false
    }

    ngOnChanges(changes) {
        if(changes && changes.contact && changes.contact.currentValue!==changes.contact.previousValue)
            this.showEdit = ( this.contact && this.contact.id === -1 )
    }
}