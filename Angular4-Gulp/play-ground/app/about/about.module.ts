/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { NgModule }           from '@angular/core'
import { CommonModule }       from '@angular/common'
import { AboutRoutingModule } from "./about-routing.module"
import { AboutComponent }     from './about.component'

@NgModule({
  imports:      [ CommonModule, AboutRoutingModule ],
  declarations: [ AboutComponent ]
})
export class AboutModule {}