/* Copyright (C) 2017 Centroida & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to:
 * or to prometheus@itce.com
 */

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { ContactsListComponent } from './contacts-list.component';
import { ContactDetailsComponent } from './contact-details.component';
import { EmailValidator } from './email-validator.directive';
import { ContactsService } from './contact.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule ],
  declarations: [ AppComponent, ContactsListComponent, ContactDetailsComponent, EmailValidator ],
  bootstrap:    [ AppComponent ],
  providers:    [ ContactsService ]
})
export class AppModule {}