function bootstrap(): void {
	var contactsService = new ContactsService();
	var controller = new ContactsController(contactsService);

	
	controller.drawContactsList()
}

bootstrap();
