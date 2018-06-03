import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ContactsComponent } from './contacts.component'
import { ContactsListComponent } from './contacts-list.component'
import { ContactDetailsComponent } from './contact-details.component'
import { ContactsService } from './contact.service'
import { ContactsRoutingModule } from './contacts-routing.module';


@NgModule({
  imports: [CommonModule, FormsModule, ContactsRoutingModule, ReactiveFormsModule],
  declarations: [ContactsComponent, ContactsListComponent, ContactDetailsComponent],
  providers: [ContactsService]
})
export class ContactsModule {
}