/* Copyright (C) 2017 Centroida & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to:
 * or to prometheus@itce.com
 */

import { NgModule }             from '@angular/core'
import { BrowserModule }        from '@angular/platform-browser'
import { FormsModule }          from '@angular/forms'
import { RouterModule }         from '@angular/router'
import { AppComponent }         from './app.component'
import { ContactsComponent }    from './contacts/contacts.component'
import { ContactsListComponent } from './contacts/contacts-list.component'
import { ContactDetailsComponent } from './contacts/contact-details.component'
import { EmailValidator }       from './email-validator.directive'
import { ContactsService }      from './contacts/contact.service'
import { AboutComponent }         from './about/about.component'

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule ],
  declarations: [ AppComponent, ContactsComponent, ContactsListComponent, ContactDetailsComponent, EmailValidator, AboutComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ ContactsService ]
})
export class AppModule {}