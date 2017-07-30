/* Copyright (C) 2017 Centroida & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { NgModule }       from '@angular/core'
import { BrowserModule }  from '@angular/platform-browser'
import { HttpModule }     from '@angular/http';
import { RouterModule, Route }     from '@angular/router';
import { AppComponent }   from './app.component'
import { PersonsDetailsComponent } from './details.component'
import { GreeterComponent } from './greeter.component'
import { AboutComponent }   from './about.component'

let routes: Route[] = [
  {path: '',       component: PersonsDetailsComponent, pathMatch: "full" },
  {path: 'about',  component: AboutComponent},
  {path: '**',     redirectTo: "/" }
]

@NgModule({
  imports:      [ BrowserModule, HttpModule, RouterModule.forRoot(routes, {useHash: true}) ],
  declarations: [ AppComponent, GreeterComponent, PersonsDetailsComponent, AboutComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}