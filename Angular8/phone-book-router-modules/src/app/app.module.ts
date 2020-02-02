

import { NgModule }              from '@angular/core'
import { BrowserModule }         from '@angular/platform-browser'
import { RouterModule }          from '@angular/router'

import { AppComponent }          from './app.component'
import { AboutComponent }        from './about/about.component'
import { AppRoutingModule }      from './app-routing.module'

import { ContactsModule }      from './contacts/contacts.module'

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule, ContactsModule ],
  declarations: [ AppComponent, AboutComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}