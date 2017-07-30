/* Copyright (C) 2017 Centroida & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to:
 * or to prometheus@itce.com
 */

import { NgModule }                 from '@angular/core'
import { FormsModule }              from '@angular/forms'
import { CommonModule }            from '@angular/common'
import { ContactsRoutingModule }    from './contacts-routing.module'
import { MyUpperPipe }              from '../my-upper.pipe'
import { ContactsComponent }        from './contacts.component'
import { ContactsService }          from './contacts.service'
import { ContactDetailsComponent }  from './contact-details.component'
import { ContactsListComponent }    from "./contacts-list.component"
import { EmailValidator }           from "../email-validator.directive"
import { DialogService }            from "../dialog.service"

@NgModule({
  imports:      [ CommonModule,
                  FormsModule,
                  ContactsRoutingModule ],
  declarations: [ ContactsComponent,
                  ContactsListComponent, 
                  ContactDetailsComponent, 
                  MyUpperPipe,
                  EmailValidator ],
  providers:    [ ContactsService,
                  DialogService ]
})
export class ContactsModule {}