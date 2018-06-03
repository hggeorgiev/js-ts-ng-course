
import { ContactsService } 	from './contacts.service'
import { Controller } 		from './contacts.controller'

export function bootstrap() {
	var contactsService = new ContactsService();
	var controller = new Controller(contactsService);
	
	window['ctrl'] = controller
	
	controller.drawContactsList()
}

bootstrap()