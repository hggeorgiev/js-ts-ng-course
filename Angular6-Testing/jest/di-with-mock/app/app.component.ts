import {Component, OnInit} from '@angular/core'
import {Person} from './person'
import {PersonService} from './person.service'
import {LoadPersonsService} from './load-persons.service'

@Component({
    selector: 'app-root',
    template: `
        <ul>
            <li *ngFor="let person of persons">{{person.firstName}} {{person.lastName}}</li>
        </ul>
    `,
    providers: [PersonService, LoadPersonsService]
})
export class AppComponent implements OnInit {
    constructor(private _personService: PersonService) {}

    persons: Person[]

    ngOnInit() {
        this.persons = this._personService.getAll();
    }
}
