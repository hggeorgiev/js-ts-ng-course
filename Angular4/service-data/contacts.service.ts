import {Injectable} from "@angular/core";
import {Contact} from "./contact.interface";
import {Subject, Observable} from "rxjs/Rx";



@Injectable()
export class ContactsService {
    private static _contactId = 5;
    public selectedContact$: Observable<Contact>;
    public selectedContactSource: Subject<Contact>;


    constructor() {
        this.selectedContactSource = new Subject<Contact>();
        this.selectedContact$ = this.selectedContactSource.asObservable();
    }

    private CONTACTS: Contact[] = [
        {id: 1, firstName: "Max", lastName: "Smith", email: "max@gmail.com"},
        {id: 2, firstName: "Chris", lastName: "Raches", email: "chris@gmail.com"},
        {id: 3, firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com"},
        {id: 4, firstName: "John", lastName: "Doe", email: "john@gmail.com"},
        {id: 5, firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com"}
    ];

    public selectContact(contact:Contact) {
        this.selectedContactSource.next(contact)
    }

    public getSelectedContact():Observable<Contact> {
        return this.selectedContact$;
    }


    public getAll(): Contact[] {
        return this.CONTACTS;
    }

    public remove(id: number) {
        let ind = this.findIndexById(id);
        if( ind>=0 )
            this.CONTACTS.splice(ind, 1);
    }

    private findById(contactId: number): Contact {
        return this.CONTACTS.find(row => row.id == contactId )
    }

    private findIndexById(contactId: number) {
        let contact = this.findById(contactId);
        if( !contact ) return -1;

        return this.CONTACTS.indexOf(contact);
    }

    update(contact: Contact) {
        let ind = this.findIndexById(contact.id);
        if( ind<0 ) return null;

        this.CONTACTS.splice( ind, 1, contact );

        return contact.id;
    }
}