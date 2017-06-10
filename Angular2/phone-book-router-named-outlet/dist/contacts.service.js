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
var ContactsService = (function () {
    function ContactsService() {
        this.contacts = [
            { id: 1, firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
            { id: 2, firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
            { id: 3, firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
            { id: 4, firstName: "John", lastName: "Doe", email: "john@gmail.com" },
            { id: 5, firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
        ];
    }
    ContactsService.prototype.getAll = function () {
        return Promise.resolve(this.contacts);
    };
    ContactsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ContactsService);
    return ContactsService;
}());
exports.ContactsService = ContactsService;
//# sourceMappingURL=contacts.service.js.map