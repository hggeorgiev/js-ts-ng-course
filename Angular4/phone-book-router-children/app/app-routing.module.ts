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

import { ContactsComponent }        from './contacts/contacts.component'
import { ContactDetailsComponent }  from './contacts/contact-details.component'
import { AboutComponent }           from './about/about.component'
import { CanDeactivateGuard }       from './can-deactivate-guard';

const routes: Routes = [
  { 
    path: 'contacts',       
    component: ContactsComponent,
    children: [
      { path: ':id', component: ContactDetailsComponent , canDeactivate: [CanDeactivateGuard] },
    ] 
  },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' }
]

@NgModule({
  imports:      [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports:      [ RouterModule ],
  providers:    [ CanDeactivateGuard ]
})
export class AppRoutingModule {}