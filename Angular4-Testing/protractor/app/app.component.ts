import {Component, OnInit} from '@angular/core';
import {Person} from "./person"

@Component({
    selector: 'my-app',
    template: `
        <contacts-list [(selected)]="selected"></contacts-list>
        
        <a id="add" href="#" class="text-danger" (click)="onAdd()"><span class="glyphicon glyphicon-plus"></span>Add</a>
        
        <contact-details [(contact)]="selected"></contact-details>
    `
})
export class AppComponent {
    selected: Person
    
    onAdd() {
        this.selected = {id: null, firstName: '', lastName: '', email: ''}
    }
}