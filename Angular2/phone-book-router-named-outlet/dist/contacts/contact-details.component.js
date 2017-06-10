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
var forms_1 = require('@angular/forms');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/fromPromise');
var contact_service_1 = require("./contact.service");
var dialog_service_1 = require("../dialog.service");
var ContactDetailsComponent = (function () {
    function ContactDetailsComponent(contactsService, router, route, dialogService) {
        this.contactsService = contactsService;
        this.router = router;
        this.route = route;
        this.dialogService = dialogService;
    }
    ContactDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var id = +params['id'];
            if (id > 0) {
                if (!_this.contact || _this.contact.id != id) {
                    _this.contact = _this.contactsService.getById(+id);
                    _this.showEdit = false;
                }
            }
            else if (id === -1) {
                _this.contact = { id: null, firstName: '', lastName: '', email: '' };
                _this.showEdit = true;
            }
            else {
                _this.contact = null;
                _this.showEdit = false;
            }
        });
    };
    ContactDetailsComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ContactDetailsComponent.prototype.onSubmit = function (form) {
        if (!form.valid)
            return;
        var dirtyContact = form.value;
        dirtyContact.id = this.contact.id;
        var saveId;
        if (this.contact.id === null)
            saveId = this.contactsService.add(dirtyContact);
        else
            saveId = this.contactsService.update(dirtyContact);
        this.contact = this.contactsService.getById(saveId);
        this.router.navigate(['/contacts', saveId]);
        this.showEdit = false;
    };
    ContactDetailsComponent.prototype.onCancel = function () {
        this.showEdit = false;
        if (this.contact.id === null) {
            this.router.navigate(['/contacts']);
        }
    };
    ContactDetailsComponent.prototype.canDeactivate = function () {
        if (!this.showEdit || !this.form.dirty)
            return true;
        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        var p = this.dialogService.confirm('Discard changes?');
        var o = Observable_1.Observable.fromPromise(p);
        return o;
    };
    __decorate([
        core_1.ViewChild('form'), 
        __metadata('design:type', forms_1.NgForm)
    ], ContactDetailsComponent.prototype, "form", void 0);
    ContactDetailsComponent = __decorate([
        core_1.Component({
            selector: 'contact-details',
            template: "\n        <div id=\"contactsDetailsContainer\" *ngIf=\"contact\">\n            <span *ngIf=\"!showEdit\">\n                <label>First Name: </label><b>{{contact.firstName}}</b><br/>\n                <label>Last Name: </label><b>{{contact.lastName}}</b><br/>\n                <label>email: </label><b>{{contact.email}}</b><br/>\n                <label></label><a class=\"text-danger\" (click)=\"showEdit=true\"><span class=\"glyphicon glyphicon-edit\"></span>Edit</a><br/>\n            </span>\n            <form name=\"editContactForm\" #form=\"ngForm\" (ngSubmit)=\"onSubmit(form)\" *ngIf=\"showEdit\" novalidate>\n                <label for=\"firstName\">First Name: </label>\n                <input id=\"firstName\" name=\"firstName\" [ngModel]=\"contact.firstName\" required><br/>\n                <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"form.controls.firstName && !form.controls.firstName.pristine && !form.controls.firstName.valid\">First name is required</div>\n                \n                <label for=\"lastName\">Last Name: </label>\n                <input id=\"lastName\" name=\"lastName\" [ngModel]=\"contact.lastName\" required><br/>\n                <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"form.controls.lastName && !form.controls.lastName.pristine && !form.controls.lastName.valid\">Last name is required</div>\n                \n                <label for=\"email\">email: </label>\n                <input id=\"email\" name=\"email\" [ngModel]=\"contact.email\" email><br/>\n                <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"form.controls.email && !form.controls.email.valid\">Email is invalid</div>\n                \n                \n                <label></label>\n                <input type=\"submit\" class=\"btn btn-danger\" value=\"{{ !contact.id ? 'Add' : 'Save' }}\" [disabled]=\"form.invalid || form.pristine\" />\n                <a class=\"text-danger\" (click)=\"onCancel()\">Cancel</a>\n            </form>\n        </div>\n    ",
            styles: ['.alert {margin-left: 104px;}']
        }), 
        __metadata('design:paramtypes', [contact_service_1.ContactsService, router_1.Router, router_1.ActivatedRoute, dialog_service_1.DialogService])
    ], ContactDetailsComponent);
    return ContactDetailsComponent;
}());
exports.ContactDetailsComponent = ContactDetailsComponent;
//# sourceMappingURL=contact-details.component.js.map