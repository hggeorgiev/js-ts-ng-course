import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { ContactsComponent } from './contacts/contacts.component'
import { ContactsListComponent } from './contacts/contacts-list.component'
import { ContactDetailsComponent } from './contacts/contact-details.component'
import { EmailValidator } from './email-validator.directive'
import { ContactsService } from './contacts/contact.service'
import { AboutComponent } from './about/about.component'
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule],
  declarations: [AppComponent, ContactsComponent, ContactsListComponent, ContactDetailsComponent, EmailValidator, AboutComponent],
  bootstrap: [AppComponent],
  providers: [ContactsService]
})
export class AppModule {
}