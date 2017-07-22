import {Component, OnInit} from '@angular/core';
import {Person} from './person';
import {DetailsComponent} from './details.component'
import {PersonService} from './person.service'

@Component({
    selector: 'my-app',
    template: `
        <ul>
            <li (click)="selected=person" *ngFor="let person of persons">{{person.firstName}} {{person.lastName}}</li>
        </ul>
        <list-details [person]="selected"></list-details> 
        
        <!-- (deleteRequest)="delete($event)" -->
    `,
    providers: [PersonService]
})
export class AppComponent implements OnInit {
    persons: Person[]
    selected: Person
    
    constructor(private _personService: PersonService) {}
    
    ngOnInit() {
        this.persons = this._personService.getAll();
    }
    
    //delete(person) {
    //    this._personService.delete(person)
    //    this.selected = null; 
    //}
 }
