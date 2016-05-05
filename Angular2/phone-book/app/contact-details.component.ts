import {Component, Input} from 'angular2/core'
import {NgForm} from 'angular2/common' 
import {Person} from "./person"
import {ContactsService} from "./contact.service"

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
                <input id="firstName" name="firstName" [ngModel]="contact.firstName" ngControl="firstName" required><br/>
                
                <label for="lastName">Last Name: </label>
                <input id="lastName" name="lastName" [ngModel]="contact.lastName" ngControl="lastName" required><br/>
                
                <label for="email">email: </label>
                <input id="email" name="email" [ngModel]="contact.email" ngControl="email"><br/>
                
                <label></label>
                <input  type="submit" 
                        class="btn btn-danger"
                        value="{{ !contact.id ? 'Add' : 'Save' }}"
                        [disabled]="!form.valid || form.pristine" />
                <a href="#" class="text-danger" (click)="onCancel()">Cancel</a>
            </form>
        </div>
    `,
    styles: ['.alert {margin-left: 104px;}']
})
export class ContactDetailsComponent {
    @Input()
    contact: Person
    showEdit: boolean = false
    
    
    constructor(private _personService: ContactsService) {}
    
    remove(person: Person) {
        this._personService.remove(person.id);
    }
    
    onSubmit(form: NgForm) {
        if(! form.valid) return;
        
        let dirtyContact: Person = form.value
        dirtyContact.id = this.contact.id
        
        this._personService.update(dirtyContact);
            
        this.contact = dirtyContact
         
        this.showEdit = false
    }
    
    onCancel() {
        this.showEdit = false
    }
 }