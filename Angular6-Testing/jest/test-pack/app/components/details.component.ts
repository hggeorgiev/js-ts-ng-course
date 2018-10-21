import {Component, OnInit} from '@angular/core'
import { PersonService } from "../services/person.service";
import { LoadPersonsService } from "../services/load-persons.service";
import { Person } from "../person";


@Component({
    selector: 'persons-details',
    template: `
        <ul>
            <li *ngFor="let person of persons">{{person.firstName}} {{person.lastName}}</li>
        </ul>
    `,
    providers: [PersonService, LoadPersonsService]
})
export class PersonsDetailsComponent implements OnInit {
    constructor(private _personService: PersonService) {}

    persons: Person[]

    ngOnInit() {
        this.persons = this._personService.getAll();
    }
}
