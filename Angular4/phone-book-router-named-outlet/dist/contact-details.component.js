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
var ContactDetailsComponent = (function () {
    function ContactDetailsComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ContactDetailsComponent.prototype, "contact", void 0);
    ContactDetailsComponent = __decorate([
        core_1.Component({
            selector: 'contact-details',
            template: "\n\n        <div *ngIf=\"contact\" id=\"contactsDetailsContainer\">\n            <label>First Name: </label><b>{{contact.firstName}}</b><br/>\n            <label>Last Name: </label><b>{{contact.lastName}}</b><br/>\n            <label>email: </label><b>{{contact.email}}</b><br/>\n            <label></label><a href=\"#\" class=\"text-danger\" onclick=\"ctrl.edit(event,' + contact.id + ')\"><span class=\"glyphicon glyphicon-edit\"></span>Edit</a><br/>\n        <div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], ContactDetailsComponent);
    return ContactDetailsComponent;
}());
exports.ContactDetailsComponent = ContactDetailsComponent;
//# sourceMappingURL=contact-details.component.js.map