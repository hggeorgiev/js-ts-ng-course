/* Copyright (C) 2017 Centroida & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: info@itce.com
 * or to prometheus@itce.com
 */

import { ContactsService } 	from './contacts.service'
import { Controller } 		from './contacts.controller'

export function bootstrap() {
	var contactsService = new ContactsService();
	var controller = new Controller(contactsService);
	
	window['ctrl'] = controller
	
	controller.drawContactsList()
}

bootstrap()