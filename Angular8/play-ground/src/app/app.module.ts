

import { NgModule }                 from '@angular/core'
import { BrowserModule }            from '@angular/platform-browser'
import { AppRoutingModule }         from './app-routing.module'
import { AppComponent }             from './app.component'
import { NotFoundComponent } from "./not-found/not-found.component";

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule ],
  declarations: [ AppComponent, NotFoundComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}