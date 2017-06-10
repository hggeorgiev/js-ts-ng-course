import { ContactsModule } from './contacts/contacts.module';
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

import { AboutComponent }           from './about/about.component'

const routes: Routes = [
  { path: 'contacts', loadChildren: 'app/contacts/contacts.module#ContactsModule' },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' }
]

@NgModule({
  imports:      [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports:      [ RouterModule ]
})
export class AppRoutingModule {}