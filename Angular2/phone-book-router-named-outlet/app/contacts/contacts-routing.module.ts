/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
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
import { ContactsListComponent }    from './contacts-list.component'
import { ContactDetailsComponent }  from './contact-details.component'
import { CanDeactivateGuard }       from '../can-deactivate-guard';

const routes: Routes = [
  { 
    path: ':id',       
    component: ContactsComponent,
    children: [
      { path: '', component: ContactDetailsComponent , canDeactivate: [CanDeactivateGuard] },
      { path: '', component: ContactsListComponent , outlet: 'ContactsList' }
    ] 
  },
  { 
    path: '',       
    component: ContactsComponent,
    children: [
      { path: '', component: ContactsListComponent , outlet: 'ContactsList' }
    ] 
  }
]

@NgModule({
  imports:      [ RouterModule.forChild(routes) ],
  exports:      [ RouterModule ],
  providers:    [ CanDeactivateGuard ]
})
export class ContactsRoutingModule {}