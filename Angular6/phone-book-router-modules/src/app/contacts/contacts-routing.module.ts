
import { NgModule }                 from '@angular/core'
import { RouterModule, Routes }     from '@angular/router'

import { ContactsComponent }        from './contacts.component'
import { ContactDetailsComponent }  from './contact-details.component'
import { CanDeactivateGuard }       from '../can-deactivate-guard';

const routes: Routes = [
  { 
    path: 'contacts',       
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