
import {ContactsService} from "./contacts.service"
import {ContactsController} from "./contacts.controller"

function bootstrap(): void {
	var contactsService = new ContactsService();
	var controller = new ContactsController(contactsService);
	
	(<any> window).ctrl = controller
	
	controller.drawContactsList()

}

bootstrap();