/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var contacts_component_1 = require('./contacts.component');
var contacts_list_component_1 = require('./contacts-list.component');
var contact_details_component_1 = require('./contact-details.component');
var email_validator_directive_1 = require('./email-validator.directive');
var contact_service_1 = require('./contact.service');
var contacts_routing_module_1 = require('./contacts-routing.module');
var ContactsModule = (function () {
    function ContactsModule() {
    }
    ContactsModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, contacts_routing_module_1.ContactsRoutingModule],
            declarations: [contacts_component_1.ContactsComponent, contacts_list_component_1.ContactsListComponent, contact_details_component_1.ContactDetailsComponent, email_validator_directive_1.EmailValidator],
            providers: [contact_service_1.ContactsService]
        }), 
        __metadata('design:paramtypes', [])
    ], ContactsModule);
    return ContactsModule;
}());
exports.ContactsModule = ContactsModule;
//# sourceMappingURL=contacts.module.js.map