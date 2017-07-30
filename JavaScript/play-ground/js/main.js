/* Copyright (C) 2017 Centroida & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: info@itce.com
 * or to prometheus@itce.com
 */

'use strict';

(function(exports) {
	'use strict';
	
	function ContactsService() {
		var CONTACTS = [
				{ id: "1", firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
				{ id: "2", firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
				{ id: "3", firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
				{ id: "4", firstName: "John", lastName: "Doe", email: "john@gmail.com" },
				{ id: "5", firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
			];
			
		this.getAll = function () {
			return CONTACTS;
		}
		
		this.getById = function(id) {
			return findById(id);
		}
		
		this.remove = function(id) {
			var ind = findIndexById(id);
			if( ind>=0 )
				CONTACTS.splice(ind,1);
		}
		
		this.update = function(contact) {
			var ind = findIndexById(contact.id);
			if( ind<0 ) return null;
			
			CONTACTS.splice( ind, 1, contact );
			
			return contact.id;
		}
		
		this.add = function(contact) {
			contact.id = ++ContactsService._contactId;
			
			CONTACTS.push( contact );
			
			return contact.id;
		}
		
		function findById(contactId) {
			return CONTACTS.find(function(row){
				return row.id == contactId;
			});
		}
		
		function findIndexById(contactId) {
			var contact = findById(contactId);
			if( !contact ) return -1;
			
			return CONTACTS.indexOf(contact);
		}
	}
	ContactsService._contactId = 5;
	
	function Controller(contactsService) {
		this.contactsService = contactsService;
		
		this.drawContactsList = function() {
			var contacts = this.contactsService.getAll();
			
			// Code is missing
		}
		
		this.drawViewDetails = function(contactId) {
			var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
			var contact = this.contactsService.getById(contactId);
			
			// Code is missing
		}
		
		this.drawEditDetails = function(contactId) {
			
			var contact = !contactId ? {id:'', firstName:'', lastName:'', email:''} : this.contactsService.getById(contactId);
			
			var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
			
			// Code is missing
			
			var firstNameInput = document.editContactForm.firstName;	
			firstNameInput.focus();
			firstNameInput.select();
		}
		
		this.select = function(event, contactId) {
			this.selectedId = contactId;
			 
			this.drawContactsList();
			this.drawViewDetails(contactId);
			
			event.preventDefault();
			return false;
		}
		
		this.clearDetails = function() {
			var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
			contactsDetailsContainer.innerHTML = '';
		}
		
		this.remove = function(event, clientId) {
			if( this.selectedId==clientId )
				this.clearDetails();
				
			this.contactsService.remove(clientId);
			this.drawContactsList();
			
			event.preventDefault();
			return false;
		}
		
		this.add = function(event) {
			this.editMode = 'add';
			
			this.selectedId = null;
			
			this.drawContactsList();
			this.drawEditDetails(null); // add new contact
			
			event.preventDefault();
			return false;
		}
		
		this.edit = function(event, clientId) {
			this.editMode = 'edit';
			
			this.drawEditDetails(clientId);
			
			event.preventDefault();
			return false;
		}
		
		this.cancelEdit = function(event) {
			if( this.editMode == 'edit') 
				this.drawViewDetails( this.selectedId );
			else
				this.clearDetails();
			
			event.preventDefault();
			return false;
		}
		
		this.validate = function() {
			var res = false;
			var form = document.editContactForm;
			
			if( !form.firstName.value )
				alert('First name is mandatory');
			else if( !form.lastName.value )
				alert('Last name is mandatory');
			else if( form.email.value && !(/[0-9a-z_\-.]+@[0-9a-z_\-.]{2,}\.[0-9a-z_\-.]{2,}/img).test(form.email.value) )
				alert('Invalid email');
			else
				res = true;
			
			return res;
		}
		
		this.save = function() {
			var form = document.editContactForm;
			
			var client = {
					id: form.id.value,
					firstName: form.firstName.value,
					lastName: form.lastName.value,
					email: form.email.value
				}
			
			var contactId;
			if( this.editMode == 'add' )
				contactId = this.contactsService.add(client);
			else
				contactId = this.contactsService.update(client);
				
			this.selectedId = contactId;
			this.drawContactsList();
			this.drawViewDetails( this.selectedId );
		}
		
		this.submit = function(event) {
			event.preventDefault();
			
			var fomValid = this.validate();
			if( !fomValid ) return;
			
			this.save();
			
			return false;
		}
	}
	
	function bootstrap() {
		var contactsService = new ContactsService();
		var controller = new Controller(contactsService);
		
		exports.ctrl = controller;
		
		controller.drawContactsList();
	}
	
	bootstrap();
})( window );