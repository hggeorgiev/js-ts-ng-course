/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import { Component } from '@angular/core'
import { DialogService } from "./dialog.service"

@Component({
    selector: 'my-app',
    providers: [DialogService],
    styles: [
        "ul { margin-left: 10px; background: #eee; padding: 15px; }", 
        "li {display: inline-block;}",
        "li~li:before { content: '|'; margin: 0 7px 0 5px; }",
        ".active, .active a { color: #c40030; }"],
    template: `
        <ul>
            <li [routerLinkActive]="['active']"><a [routerLink]="['/contacts']">Contacts</a></li>
            <li><a [routerLink]="['/about']" [routerLinkActive]="['active']">About</a></li>
        </ul>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {}