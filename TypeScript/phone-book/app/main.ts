
/// <reference path="contacts.service.ts" />
/// <reference path="Contacts.controller.ts" />

function bootstrap(): void {
	var contactsService = new ContactsService();
	var controller = new ContactsController(contactsService);

	
	controller.drawContactsList()
}

bootstrap();