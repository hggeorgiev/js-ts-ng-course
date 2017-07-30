/* Copyright (C) 2017 Centroida & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: info@itce.com
 * or to prometheus@itce.com
 */

import {ContactsService} from "./contacts.service"
import {ContactsController} from "./contacts.controller"

function bootstrap(): void {
	var contactsService = new ContactsService();
	var controller = new ContactsController(contactsService);
	
	(<any> window).ctrl = controller
	
	controller.drawContactsList()
}

bootstrap();