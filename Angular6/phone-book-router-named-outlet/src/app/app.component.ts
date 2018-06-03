

import { Component } from '@angular/core'
import { DialogService } from "./dialog.service"

@Component({
    selector: 'app-root',
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