import {Injectable} from '@angular/core';

import {LoadPersonsService} from './load-persons.service'
import { Person } from "../person";

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
