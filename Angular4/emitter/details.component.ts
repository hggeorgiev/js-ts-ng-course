import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Person} from './person';
import {PersonService} from './person.service'

@Component({
    selector: 'list-details',
    template: `
        <div *ngIf='person'>
            First Name: <b>{{person.firstName}}</b><br/>
            LastName: <b>{{person.lastName}}</b><br/>
            <button (click)="delete()">Delete</button>
        </div>
    `
})
export class DetailsComponent {
    @Input()
    person: Person;
    
    //@Output()
    //deleteRequest = new EventEmitter<Person>();
    
    constructor(private _personService: PersonService) {}
    
    delete() {
        this._personService.delete(this.person);
        this.person = null;
        
        //this.deleteRequest.emit(this.person);
    }
 }