import { Injectable } from "@angular/core"
import { Contact } from "./contact"

@Injectable()
export class ContactsService {
  static _contactId = 1;

  CONTACTS: Contact[] = [
    {id: ContactsService._contactId++, firstName: "Gordon", lastName: "Freeman", email: "freeman@blackmesa.com"},
    {id: ContactsService._contactId++, firstName: "Alyx", lastName: "Vance", email: "alyx@resistance.com"},
    {id: ContactsService._contactId++, firstName: "Wallace", lastName: "Breen", email: "breen@blackmesa.com"},
    {id: ContactsService._contactId++, firstName: "Barney", lastName: "Calhoun", email: "calhoun@blackmesa.com"},
    {id: ContactsService._contactId++, firstName: "Eli", lastName: "Vance", email: "vance@blackmesa.com"}
  ];

  getAll() {
    return this.CONTACTS;
  }

  getById(id: number) {
    return this.findById(id);
  }

  remove(id: number) {
    let ind = this.findIndexById(id);
    if (ind >= 0)
      this.CONTACTS.splice(ind, 1);
  }

  update(contact: Contact) {
    let ind = this.findIndexById(contact.id);
    if (ind < 0) return null;

    this.CONTACTS.splice(ind, 1, contact);

    return contact.id;
  }

  add(contact: Contact) {
    contact.id = ContactsService._contactId++;

    this.CONTACTS.push(contact);

    return contact.id;
  }

  private findById(contactId: number): Contact {
    return this.CONTACTS.find(row => row.id == contactId)
  }

  private findIndexById(contactId: number) {
    let contact = this.findById(contactId);
    if (!contact) return -1;

    return this.CONTACTS.indexOf(contact);
  }
}
