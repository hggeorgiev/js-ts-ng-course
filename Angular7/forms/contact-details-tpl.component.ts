
import {Component, Input, Output, OnChanges, EventEmitter} from '@angular/core'
import {NgForm} from '@angular/forms'
import {Contact} from "./contact"
import {ContactsService} from "./contact.service"
import {EmailValidator} from "./email-validator.directive"

@Component({
    selector: 'contact-details',
    template: `
        <div id="contactsDetailsContainer" *ngIf="contact">
            <span *ngIf="!showEdit">
                <label>First Name: </label><b>{{contact.firstName}}</b><br/>
                <label>Last Name: </label><b>{{contact.lastName}}</b><br/>
                <label>email: </label><b>{{contact.email}}</b><br/>
                <label></label><a class="text-danger" (click)="showEdit=true"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>
            </span>
            <form name="editContactForm" #form="ngForm" (ngSubmit)="onSubmit(form)" *ngIf="showEdit" novalidate>
                <label for="firstName">First Name: </label>
                <input id="firstName" name="firstName" [ngModel]="contact.firstName" required><br/>
                <div class="alert alert-danger" role="alert" *ngIf="form.controls.firstName && !form.controls.firstName.pristine && !form.controls.firstName.valid">First name is required</div>
                
                <label for="lastName">Last Name: </label>
                <input id="lastName" name="lastName" [ngModel]="contact.lastName" required><br/>
                <div class="alert alert-danger" role="alert" *ngIf="form.controls.lastName && !form.controls.lastName.pristine && !form.controls.lastName.valid">Last name is required</div>
                
                <label for="email">Email: </label>
                <input id="email" name="email" [ngModel]="contact.email" email><br/>
                <div class="alert alert-danger" role="alert" *ngIf="form.controls.email && !form.controls.email.valid">Email is invalid</div>
                
                
                <label></label>
                <input type="submit" class="btn btn-danger" value="{{ !contact.id ? 'Add' : 'Save' }}" [disabled]="form.invalid || form.pristine" />
                <a href="#" class="text-danger" (click)="onCancel()">Cancel</a>
            </form>
        </div>
    `,
    styles: ['.alert {margin-left: 104px;}']
})
export class ContactDetailsComponent implements OnChanges {
    @Input()
    contact: Contact;
    @Output()
    contactChange = new EventEmitter<Contact>();
    @Input()
    showEdit: boolean;


    constructor(private _personService: ContactsService) {}

    remove(person: Contact) {
        this._personService.remove(person.id);
    }

    ngOnChanges(changes) {
        if(changes && changes.contact && changes.contact.currentValue!==changes.contact.previousValue)
            this.showEdit = ( this.contact && this.contact.id === null )
    }

    onSubmit(form: NgForm) {
        if(! form.valid) return;

        let dirtyContact: Contact = form.value;
        dirtyContact.id = this.contact.id;

        if(this.contact.id === null)
            this._personService.add(dirtyContact) ;
        else
            this._personService.update(dirtyContact);

        this.contact = dirtyContact;

        this.contactChange.emit(this.contact);

        this.showEdit = false
    }

    onCancel() {
        this.showEdit = false;

        if( this.contact.id === null ) {
            this.contact = null;
            this.contactChange.emit(this.contact);
        }
    }
}
