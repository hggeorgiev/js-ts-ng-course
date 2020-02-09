import { Injectable } from "@angular/core";
import { Contact } from "./contact.interface";
import { Observable, Subject } from "rxjs/Rx";


@Injectable()
export class ContactsService {
  private static _contactId = 5;
  public selectedContact$: Observable<Contact>;
  public selectedContactSource: Subject<Contact>;


  constructor() {
    this.selectedContactSource = new Subject<Contact>();
    this.selectedContact$      = this.selectedContactSource.asObservable();
  }

  CONTACTS: Contact[] = [
    {id: ContactsService._contactId++, firstName: "Gordon", lastName: "Freeman", email: "freeman@blackmesa.com"},
    {id: ContactsService._contactId++, firstName: "Alyx", lastName: "Vance", email: "alyx@resitance.com"},
    {id: ContactsService._contactId++, firstName: "Wallace", lastName: "Breen", email: "breen@blackmesa.com"},
    {id: ContactsService._contactId++, firstName: "Barney", lastName: "Calhoun", email: "calhoun@blackmesa.com"},
    {id: ContactsService._contactId++, firstName: "Eli", lastName: "Vance", email: "vance@blackmesa.com"}
  ];

  public selectContact(contact: Contact) {
    this.selectedContactSource.next(contact)
  }

  public getSelectedContact(): Observable<Contact> {
    return this.selectedContact$;
  }


  public getAll(): Contact[] {
    return this.CONTACTS;
  }

  public remove(id: number) {
    let ind = this.findIndexById(id);
    if (ind >= 0)
      this.CONTACTS.splice(ind, 1);
  }

  private findById(contactId: number): Contact {
    return this.CONTACTS.find(row => row.id == contactId)
  }

  private findIndexById(contactId: number) {
    let contact = this.findById(contactId);
    if (!contact) return -1;

    return this.CONTACTS.indexOf(contact);
  }

  update(contact: Contact) {
    let ind = this.findIndexById(contact.id);
    if (ind < 0) return null;

    this.CONTACTS.splice(ind, 1, contact);

    return contact.id;
  }
}