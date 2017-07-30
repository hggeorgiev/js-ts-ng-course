/* Copyright (C) 2017 Centroida & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import {Component, OnInit} from '@angular/core';
import {Contact} from "./contact"

@Component({
    selector: 'my-app',
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