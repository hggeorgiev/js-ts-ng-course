import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ContactsComponent } from './contacts.component'
import { ContactDetailsComponent } from './contact-details.component'
import { CanDeactivateGuard } from '../can-deactivate-guard';

// Don't forget to add resolver to module providers.
const routes: Routes = [
  {
    path: '',
    resolve: {
      contacts: ContactsResolver
    },
    component: ContactsComponent,
    children: [
      {path: ':id', component: ContactDetailsComponent, canDeactivate: [CanDeactivateGuard]},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanDeactivateGuard]
})
export class ContactsRoutingModule {
}


