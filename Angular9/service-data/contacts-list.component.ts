import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
import {ContactsService} from "./contacts.service";
import {Contact} from "./contact.interface";
@Component({
    selector: 'contacts-list',
    template: `
        <ul>
        
           <li *ngFor="let contact of contacts" class="item" [class.active]="selected==contact">
               <a (click)="onSelect(contact)">{{contact.firstName}} {{contact.lastName | uppercase}}</a>
               <a (click)="remove(contact)" class="remove" title="Remove"><span class="glyphicon glyphicon-remove-sign"></span></a>
           </li>
         
        
        
        </ul>
     

      `
})
export class ContactsListComponent implements OnInit {

    // @Input() contact:Contact;
    // @Output() contactChange = new EventEmitter<Contact>();

    public selected: Contact;
    public contacts: Contact[];

    constructor(private contactsService: ContactsService) {
        this.contactsService.getSelectedContact().subscribe((contact) => {
            this.selected = contact;
        })

    }

    onSelect(contact: Contact) {
        this.selected = contact;
        //this.contactChange.emit(contact)
        this.contactsService.selectContact(contact);

    }


    remove(contact: Contact) {
        this.contactsService.remove(contact.id);
        // this.contactChange.emit(undefined);
    }

    ngOnInit() {
        this.contacts = this.contactsService.getAll()
    }

}