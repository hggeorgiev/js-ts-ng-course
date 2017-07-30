/* Copyright (C) 2017 Centroida & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { NgModule }                 from '@angular/core'
import { RouterModule, Routes }     from '@angular/router'

import { ContactsComponent }        from './contacts.component'
import { ContactDetailsComponent }  from './contact-details.component'
import { CanDeactivateGuard }       from '../can-deactivate-guard';

const routes: Routes = [
  { 
    path: '',       
    component: ContactsComponent,
    children: [
      { path: ':id', component: ContactDetailsComponent , canDeactivate: [CanDeactivateGuard] },
    ] 
  }
]

@NgModule({
  imports:      [ RouterModule.forChild(routes) ],
  exports:      [ RouterModule ],
  providers:    [ CanDeactivateGuard ]
})
export class ContactsRoutingModule {}