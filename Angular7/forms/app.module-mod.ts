
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { ContactsListComponent } from './contacts-list.component';
import { ContactDetailsComponent } from './contact-details.component';
import { EmailValidator } from './email-validator.directive';
import { ContactsService } from './contact.service';
import {ReactiveFormsModule} from "../../../Angular4-Automation/play-ground/public/lib/js/@angular/forms/src/form_providers";

@NgModule({
    // Include ReactiveFormsModule
    imports:      [ BrowserModule, FormsModule, HttpModule, ReactiveFormsModule ],
    declarations: [ AppComponent, ContactsListComponent, ContactDetailsComponent, EmailValidator ],
    bootstrap:    [ AppComponent ],
    providers:    [ ContactsService ]
})
export class AppModule {}