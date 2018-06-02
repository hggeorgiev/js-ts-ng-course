
import { NgModule }             from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ContactsComponent }    from './contacts/contacts.component'
import { AboutComponent }       from './about/about.component'
import { CanDeactivateGuard }     from './can-deactivate-guard';

const routes: Routes = [
  { path: 'contacts',       component: ContactsComponent },
  { path: 'contacts/:id',   component: ContactsComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'about',          component: AboutComponent },
  { path: '',               redirectTo: '/contacts', pathMatch: 'full' }
]

@NgModule({
  imports:      [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports:      [ RouterModule ],
  providers:    [ CanDeactivateGuard ]
})
export class AppRoutingModule {}