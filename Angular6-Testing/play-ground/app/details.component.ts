import {Component, OnInit} from '@angular/core'
import {Person} from './person'
import {PersonService} from './person.service'
import {LoadPersonsService} from './load-persons.service'

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