import {Component, OnInit} from '@angular/core';
import {Contact} from "./contact"

@Component({
    selector: 'app-root',
    template: `
        <contacts-list [(selected)]="selected"></contacts-list>
        
        <a id="add" href="#" class="text-danger" (click)="onAdd()"><span class="glyphicon glyphicon-plus"></span>Add</a>
        
        <contact-details [(contact)]="selected"></contact-details>
    `
})
export class AppComponent {
    selected: Contact
    
    onAdd() {
        this.selected = {id: null, firstName: '', lastName: '', email: ''}
    }
}