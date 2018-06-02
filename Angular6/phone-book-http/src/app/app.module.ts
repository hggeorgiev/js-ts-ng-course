
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContactsListComponent } from './contacts-list.component';
import { ContactDetailsComponent } from './contact-details.component';
import { EmailValidator } from './email-validator.directive';
import { ContactsService } from './contact.service';
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  declarations: [AppComponent, ContactsListComponent, ContactDetailsComponent, EmailValidator],
  bootstrap: [AppComponent],
  providers: [ContactsService]
})
export class AppModule {
}
