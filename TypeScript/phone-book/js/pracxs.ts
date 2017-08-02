/* Copyright (C) 2017 Centroida & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to:
 * or to prometheus@itce.com
 */
/// <reference path="contacts.service.ts" />
/// <reference path="Contacts.controller.ts" />

function bootstrap(): void {
	var contactsService = new ContactsService();
	var controller = new ContactsController(contactsService);

	
	controller.drawContactsList()
}

bootstrap();