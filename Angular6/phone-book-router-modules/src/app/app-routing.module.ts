import { ContactsModule } from './contacts/contacts.module';


import { NgModule }                 from '@angular/core'
import { RouterModule, Routes }     from '@angular/router'

import { AboutComponent }           from './about/about.component'

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' }
]

@NgModule({
  imports:      [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports:      [ RouterModule ]
})
export class AppRoutingModule {}