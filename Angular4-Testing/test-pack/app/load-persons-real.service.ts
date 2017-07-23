import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map'
import {Http, Response} from '@angular/http'
import {Observable} from 'rxjs/Observable'
import {Person} from './person';
    
const CONTACTS_URL = 'contacts.json'
    
@Injectable()
export class LoadPersonsRealService {
        constructor(private http: Http) {}
        
        load() {
            return this.http.get(CONTACTS_URL)
                    .map((res: Response) => {
						let data: Person[] = res.json()
						 
						return data;
					})
        }
}