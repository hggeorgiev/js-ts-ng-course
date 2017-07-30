/* Copyright (C) 2017 Centroida & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var contacts_component_1 = require('./contacts.component');
var contacts_list_component_1 = require('./contacts-list.component');
var contact_details_component_1 = require('./contact-details.component');
var can_deactivate_guard_1 = require('../can-deactivate-guard');
var routes = [
    {
        path: ':id',
        component: contacts_component_1.ContactsComponent,
        children: [
            { path: '', component: contact_details_component_1.ContactDetailsComponent, canDeactivate: [can_deactivate_guard_1.CanDeactivateGuard] },
            { path: '', component: contacts_list_component_1.ContactsListComponent, outlet: 'ContactsList' }
        ]
    },
    {
        path: '',
        component: contacts_component_1.ContactsComponent,
        children: [
            { path: '', component: contacts_list_component_1.ContactsListComponent, outlet: 'ContactsList' }
        ]
    }
];
var ContactsRoutingModule = (function () {
    function ContactsRoutingModule() {
    }
    ContactsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule],
            providers: [can_deactivate_guard_1.CanDeactivateGuard]
        }), 
        __metadata('design:paramtypes', [])
    ], ContactsRoutingModule);
    return ContactsRoutingModule;
}());
exports.ContactsRoutingModule = ContactsRoutingModule;
//# sourceMappingURL=contacts-routing.module.js.map