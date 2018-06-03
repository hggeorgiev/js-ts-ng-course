
import {Component} from '@angular/core';

let PERSONS = [
    { "name": "Max", },
    { "name": "Chris", },
    { "name": "Michael", },
    { "name": "John", },
    { "name": "Jenny", } ]


@Component({
    selector: 'my-app',
    template: `
        <ul>
            <li *ngFor="let person of persons | repeat">{{person.name}}</li>
        </ul>
        <div>
                <input [(ngModel)]="new">
                <button (click)="add()">Add</button>
                <button (click)="reset()">Reset</button>
        </div>
        <pre>{{persons|json}}</pre>
    `
})
export class AppComponent {
    persons = PERSONS
    
    new = ''
    
    add() {
        this.persons.push({name: this.new})
    }
    
    reset() {
        this.persons.splice(0, this.persons.length);
    }
 }
