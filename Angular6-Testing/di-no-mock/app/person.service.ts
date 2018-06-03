import {Injectable} from '@angular/core';
import {Person} from './person';
import {LoadPersonsService} from './load-persons.service'
    
@Injectable()
export class PersonService {
    private persons: Person[]
    
    constructor(loadPersonsService: LoadPersonsService) {
        this.persons = loadPersonsService.load();
    }
    
    getAll() {
        return this.persons
    }
}