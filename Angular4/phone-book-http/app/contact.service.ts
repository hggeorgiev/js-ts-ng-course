/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import {Injectable} from "@angular/core"
import {Http, Response} from '@angular/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import {Contact} from "./contact"

const CONTACTS_URL = 'contacts.json'

@Injectable()
export class ContactsService {
	private static _contactId = 1;
	
	constructor(private http: Http) {}
	
	getAll(): Observable<Contact[]> {
		return this.http.get(CONTACTS_URL)
                    .map((res: Response) => {
						let data: Contact[] = this.extractData(res)
						 
						data.map((val) => { ContactsService._contactId = Math.max(val.id, ContactsService._contactId) })
						ContactsService._contactId++;
						 
						return data;
					})
                    .catch(this.handleError)
	}
	
	getById(id: number) {
		return this.findById(id);
	}
	
	remove(id: number) {
		throw 'Unimpemented functionality'
	}
	
	update(contact: Contact) {
		throw 'Unimpemented functionality'
	}
	
	add(contact: Contact) {
		throw 'Unimpemented functionality'
	}
	
	private findById(contactId: number): Contact {
		throw 'Unimpemented functionality'
	}
	
	private findIndexById(contactId: number) {
		throw 'Unimpemented functionality'
	}
	
	private extractData(res: Response) {
		if (res.status < 200 || res.status >= 300) {
			throw new Error('Bad response status: ' + res.status);
		}
		let body = res.json();
		return body || { };
	}
	
	private handleError (error: any) {
		// In a real world app, we might send the error to remote logging infrastructure
		let errMsg = error.message || error.status + ' ' + error.statusText + ': ' + error.url || 'Server error';
		console.error(errMsg); // log to console instead
		return Observable.throw(errMsg);
	}
}