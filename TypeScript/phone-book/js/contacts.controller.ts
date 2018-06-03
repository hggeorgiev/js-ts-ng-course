

/// <reference path="contact.interface.ts" />
/// <reference path="contact-edit.form.ts" />
/// <reference path="edit-mode.enum.ts" />
/// <reference path="contacts.service.ts" />

class ContactsController {
	private selectedId: number
	private editMode: EditMode

	constructor( private contactsService: ContactsService ) {}
	
	drawContactsList(): void {
		let contacts = this.contactsService.getAll();
		
		let html = '<ul>'
		for( let ind in contacts ) {
			let contact = contacts[ind]
			html += 
				"<li class='item" + ( this.selectedId==contact.id ? ' active' : '' ) + "'>" + 
					"<a href='#' onclick='ctrl.select(event, " + contact.id + ")'>" + contact.firstName + ' ' + contact.lastName.toUpperCase() + "</a>" +
					"<a href='#' onclick='ctrl.remove(event, " + contact.id + ")' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>" +
				"</li>"
		}
		html += '</ul>'
		
		let contactsListContainer = document.getElementById('contactsListContainer');
		contactsListContainer.innerHTML = html;
	}
	
	select(event: Event, contactId: number): boolean {
		this.selectedId = contactId;
			
		this.drawContactsList();
		this.drawViewDetails(contactId);
		
		event.preventDefault();
		return false;
	}
	
	drawViewDetails(contactId: number): void {
		let contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
		let contact = this.contactsService.getById(contactId);
		contactsDetailsContainer.innerHTML = 
			'<label>First Name: </label><b>' + contact.firstName + '</b><br/>' +
			'<label>Last Name: </label><b>' + contact.lastName + '</b><br/>' +
			'<label>email: </label><b>' + contact.email + '</b><br/>' +
			'<label></label><a href="#" class="text-danger" onclick="ctrl.edit(event,' + contact.id + ')"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>';
	}
	
	clearDetails(): void {
		let contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
		contactsDetailsContainer.innerHTML = '';
	}
	
	remove(event: Event, clientId: number): boolean {
		if( this.selectedId==clientId )
			this.clearDetails();
			
		this.contactsService.remove(clientId);
		this.drawContactsList();
		
		event.preventDefault();
		return false;
	}
	
	add(event: Event): boolean {
		this.editMode = EditMode.add;
		
		this.selectedId = null;
		
		this.drawContactsList();
		this.drawEditDetails(null); // add new contact
		
		event.preventDefault();
		return false;
	}
	
	edit(event: Event, clientId: number): boolean {
		this.editMode = EditMode.edit;
		
		this.drawEditDetails(clientId);
		
		event.preventDefault();
		return false;
	}
	
	drawEditDetails(contactId: number): void {
		
		let contact = !contactId ? {id:'', firstName:'', lastName:'', email:''} : this.contactsService.getById(contactId);
		
		let contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
		contactsDetailsContainer.innerHTML = 
			'<form name="editContactForm" onsubmit="ctrl.submit(event)">' +
				'<input name="contactId" type="hidden" value="' + contact.id + '">' +
				'<label>First Name: </label><input name="firstName" value="' + contact.firstName + '"><br/>' +
				'<label>Last Name: </label><input name="lastName" value="' + contact.lastName + '"><br/>' +
				'<label>Email: </label><input name="email" value="' + contact.email + '"><br/>' +
				'<label></label><input type="submit" class="btn btn-danger" value="' + ( !contactId ? 'Add' : 'Save' ) + '"/>' +
				'<a href="#" class="text-danger" onclick="ctrl.cancelEdit(event)">Cancel</a>' +
			'</form>';
		
		let firstNameInput = document.editContactForm.firstName;	
		firstNameInput.focus();
		firstNameInput.select();
	}
	
	cancelEdit(event: Event): boolean {
		if( this.editMode == EditMode.edit) 
			this.drawViewDetails( this.selectedId );
		else
			this.clearDetails();
		
		event.preventDefault();
		return false;
	}
	
	submit(event: Event): boolean {
		event.preventDefault();
		
		let fomValid = this.validate();
		if( !fomValid ) return;
		
		this.save();
		
		return false;
	}
	
	validate(): boolean {
		let res = false;
		let form = document.editContactForm;
		
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
	
	save(): void {
		let form = document.editContactForm;
		
		let client: Contact = {
				id: +form.contactId.value,
				firstName: form.firstName.value,
				lastName: form.lastName.value,
				email: form.email.value
			}
		
		let contactId;
		if( this.editMode == EditMode.add )
			contactId = this.contactsService.add(client);
		else
			contactId = this.contactsService.update(client);
			
		this.selectedId = contactId;
		this.drawContactsList();
		this.drawViewDetails( this.selectedId );
	}
}