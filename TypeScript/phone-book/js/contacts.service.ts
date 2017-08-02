/* Copyright (C) 2017 Centroida & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: info@itce.com
 * or to prometheus@itce.com
 */

/// <reference path="Contact.interface.ts" />

declare interface Array<T> {
	find(f: (T) => boolean ): T
}

class ContactsService {
	private static _contactId = 5;
	private CONTACTS: Contact[] = [
			{ id: 1, firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
			{ id: 2, firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
			{ id: 3, firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
			{ id: 4, firstName: "John", lastName: "Doe", email: "john@gmail.com" },
			{ id: 5, firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
		];
		
	getAll(): Contact[] {
		return this.CONTACTS;
	}
	
	getById(id: number): Contact {
		return this.findById(id);
	}
	
	remove(id: number): void {
		var ind = this.findIndexById(id);
		if( ind>=0 )
			this.CONTACTS.splice(ind,1);
	}
	
	findById(contactId: number): Contact {
		return this.CONTACTS.find(function(row){
			return row.id == contactId;
		})
	}

	private findIndexById(contactId: number): number {
		var contact = this.findById(contactId);
		if( !contact ) return -1;

		return this.CONTACTS.indexOf(contact);
	}
	
	update(contact: Contact): number {
		var ind = this.findIndexById(contact.id);
		if( ind<0 ) return null;
		
		this.CONTACTS.splice( ind, 1, contact );
		
		return contact.id;
	}
	
	add(contact: Contact): number {
		contact.id = ++ContactsService._contactId;
		
		this.CONTACTS.push( contact );
		
		return contact.id;
	}
}