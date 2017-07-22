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
var core_1 = require("@angular/core");
var ContactsService = (function () {
    function ContactsService() {
        this.CONTACTS = [
            { id: ContactsService._contactId++, firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
            { id: ContactsService._contactId++, firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
            { id: ContactsService._contactId++, firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
            { id: ContactsService._contactId++, firstName: "John", lastName: "Doe", email: "john@gmail.com" },
            { id: ContactsService._contactId++, firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
        ];
    }
    ContactsService.prototype.getAll = function () {
        return this.CONTACTS;
    };
    ContactsService.prototype.getById = function (id) {
        return this.findById(id);
    };
    ContactsService.prototype.remove = function (id) {
        var ind = this.findIndexById(id);
        if (ind >= 0)
            this.CONTACTS.splice(ind, 1);
    };
    ContactsService.prototype.update = function (contact) {
        var ind = this.findIndexById(contact.id);
        if (ind < 0)
            return null;
        this.CONTACTS.splice(ind, 1, contact);
        return contact.id;
    };
    ContactsService.prototype.add = function (contact) {
        contact.id = ContactsService._contactId++;
        this.CONTACTS.push(contact);
        return contact.id;
    };
    ContactsService.prototype.findById = function (contactId) {
        return this.CONTACTS.find(function (row) { return row.id == contactId; });
    };
    ContactsService.prototype.findIndexById = function (contactId) {
        var contact = this.findById(contactId);
        if (!contact)
            return -1;
        return this.CONTACTS.indexOf(contact);
    };
    ContactsService._contactId = 1;
    ContactsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ContactsService);
    return ContactsService;
}());
exports.ContactsService = ContactsService;
//# sourceMappingURL=contact.service.js.map