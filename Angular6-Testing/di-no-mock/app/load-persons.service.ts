import {Injectable} from '@angular/core';
import {Person} from './person';

let PERSONS: Person[] = [
    { "id": 1, "firstName": "Max",     "lastName": "Smith",  "email": "max@gmail.com" },
    { "id": 2, "firstName": "Chris",   "lastName": "Raches", "email": "chris@gmail.com" },
    { "id": 3, "firstName": "Michael", "lastName": "Alloy",  "email": "michael@gmail.com" },
    { "id": 4, "firstName": "John",    "lastName": "Doe",    "email": "john@gmail.com" },
    { "id": 5, "firstName": "Jenny",   "lastName": "Doe",    "email": "jenny@gmail.com" } ]
    
@Injectable()
export class LoadPersonsService {
        load() {
            return PERSONS;
        }
}