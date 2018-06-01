import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core'
import {Person} from "./person"
import {ContactsService} from "./contact.service"

@Component({
    selector: 'contacts-list',
    template: `
        <ul>
            <li *ngFor="let person of persons" class="item" [class.active]="selected==person">
                <a (click)="onSelect(person)">{{person.firstName}} {{person.lastName | uppercase}}</a>
                <a (click)="remove(person)" class="remove" title="Remove"><span class="glyphicon glyphicon-remove-sign"></span></a>
            </li>
        </ul>
    `
})
export class ContactsListComponent implements OnInit {
    @Input()
    selected: Person
    @Output()
    selectedChange = new EventEmitter<Person>()
    
    persons: Person[]
    
    constructor(private _personService: ContactsService) {}
    
    remove(person: Person) {
        if(person.id==this.selected.id ) {
            this.selected = null
            this.selectedChange.emit(this.selected)
        }
            
        this._personService.remove(person.id);
    }
    
    onSelect(person: Person) {
        this.selected = person
        this.selectedChange.emit(this.selected)
    }
    
    ngOnInit() {
        this.persons = this._personService.getAll();
    }
 }
