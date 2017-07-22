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
var router_1 = require('@angular/router');
require('rxjs/add/operator/map');
require('rxjs/add/operator/filter');
var contact_service_1 = require("./contact.service");
var ContactsListComponent = (function () {
    function ContactsListComponent(personService, router, route) {
        this.personService = personService;
        this.router = router;
        this.route = route;
    }
    ContactsListComponent.prototype.remove = function (person) {
        var _this = this;
        if (person.id == this.selected)
            this.router.navigate(['/contacts'])
                .then(function (success) { return success && _this.personService.remove(person.id); });
        else
            this.personService.remove(person.id);
    };
    ContactsListComponent.prototype.onSelect = function (person) {
        this.router.navigate(['/contacts', person.id]);
    };
    ContactsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.persons = this.personService.getAll();
        this.sub = this.route
            .params
            .map(function (params) { return +params['id']; })
            .subscribe(function (contactId) { return _this.selected = contactId; });
    };
    ContactsListComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ContactsListComponent = __decorate([
        core_1.Component({
            selector: 'contacts-list',
            template: "\n        <ul>\n            <li *ngFor=\"let person of persons\" class=\"item\" [class.active]=\"selected==person.id\">\n                <a (click)=\"onSelect(person)\">{{person.firstName}} {{person.lastName | uppercase}}</a>\n                <a (click)=\"remove(person)\" class=\"remove\" title=\"Remove\"><span class=\"glyphicon glyphicon-remove-sign\"></span></a>\n            </li>\n        </ul>\n    "
        }), 
        __metadata('design:paramtypes', [contact_service_1.ContactsService, router_1.Router, router_1.ActivatedRoute])
    ], ContactsListComponent);
    return ContactsListComponent;
}());
exports.ContactsListComponent = ContactsListComponent;
//# sourceMappingURL=contacts-list.component.js.map