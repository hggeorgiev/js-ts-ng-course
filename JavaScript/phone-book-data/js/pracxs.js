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
	
	function ContactsLoadService() {
		this.load = function(successCallback) {
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4) { // 4 means DONE
					if (xhttp.status == 200) { // 200 is OK status of HTML
						successCallback( JSON.parse(xhttp.responseText) );
					} else {
						alert('Communication error!');
					}
				}
			};
			xhttp.open("GET", "contacts.json", true);
			xhttp.send();
		}
	}
	
	function ContactsService() {
		var CONTACTS = [];
			
		this.init = function(afterInitCallback) {
			var contactsLoadService = new ContactsLoadService();		
			
			contactsLoadService.load(function(data) {
				CONTACTS = data;
				
				// find last used id
				ContactsService._contactId = 0; // if no contacts in the data
				for(var i=0; i < data.length; i++)
					ContactsService._contactId = Math.max(ContactsService._contactId, data[i].id);
				
				afterInitCallback();
			});
		}
			
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
	
	function Controller(contactsService) {
		this.contactsService = contactsService;
		
		this.drawContactsList = function() {
			var contacts = this.contactsService.getAll();
			
			var html = '<ul>';
			for( var ind in contacts ) {
				var contact = contacts[ind];
				html += 
					"<li class='item" + ( this.selectedId==contact.id ? ' active' : '' ) + "'>" + 
						"<a href='#' onclick='ctrl.select(event, " + contact.id + ")'>" + contact.firstName + ' ' + contact.lastName.toUpperCase() + "</a>" +
						"<a href='#' onclick='ctrl.remove(event, " + contact.id + ")' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>" +
					"</li>";
			}
			html += '</ul>'
			
			var contactsListContainer = document.getElementById('contactsListContainer');
			contactsListContainer.innerHTML = html;
		}
		
		this.drawViewDetails = function(contactId) {
			var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
			var contact = this.contactsService.getById(contactId);
			contactsDetailsContainer.innerHTML = 
				'<label>First Name: </label><b>' + contact.firstName + '</b><br/>' +
				'<label>Last Name: </label><b>' + contact.lastName + '</b><br/>' +
				'<label>email: </label><b>' + contact.email + '</b><br/>' +
				'<label></label><a href="#" class="text-danger" onclick="ctrl.edit(event,' + contact.id + ')"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>';
		}
		
		this.drawEditDetails = function(contactId) {
			
			var contact = !contactId ? {id:'', firstName:'', lastName:'', email:''} : this.contactsService.getById(contactId);
			
			var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
			contactsDetailsContainer.innerHTML = 
				'<form name="editContactForm" onsubmit="ctrl.submit(event)">' +
					'<input name="id" type="hidden" value="' + contact.id + '">' +
					'<label>First Name: </label><input name="firstName" value="' + contact.firstName + '"><br/>' +
					'<label>Last Name: </label><input name="lastName" value="' + contact.lastName + '"><br/>' +
					'<label>email: </label><input name="email" value="' + contact.email + '"><br/>' +
					'<label></label><input type="submit" class="btn btn-danger" value="' + ( !contactId ? 'Add' : 'Save' ) + '"/>' +
					'<a href="#" class="text-danger" onclick="ctrl.cancelEdit(event)">Cancel</a>' +
				'</form>';
			
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
		
		contactsService.init(function() {
			controller.drawContactsList();
			document.getElementById('add').style = 'display: block;';
		});
	}
	
	bootstrap();
})( window );