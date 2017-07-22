/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { NgModule }                 from '@angular/core'
import { BrowserModule }            from '@angular/platform-browser'
import { AppRoutingModule }         from './app-routing.module'
import { AppComponent }             from './app.component'
import { FailComponent }            from "./fail/fail.component"

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule ],
  declarations: [ AppComponent, FailComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}