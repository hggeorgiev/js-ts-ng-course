/* Copyright (C) 2017 Centroida & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to:
 * or to prometheus@itce.com
 */

import { NgModule }             from '@angular/core'
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms'
import { RouterModule }         from '@angular/router'
import { ContactsComponent }    from './contacts.component'
import { ContactsListComponent } from './contacts-list.component'
import { ContactDetailsComponent } from './contact-details.component'
import { EmailValidator }       from './email-validator.directive'
import { ContactsService }      from './contact.service'

import { ContactsRoutingModule }     from './contacts-routing.module';

@NgModule({
  imports:      [ CommonModule, FormsModule, ContactsRoutingModule ],
  declarations: [ ContactsComponent, ContactsListComponent, ContactDetailsComponent, EmailValidator ],
  providers:    [ ContactsService ]
})
export class ContactsModule {}