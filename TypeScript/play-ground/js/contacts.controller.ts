import { ContactsService } from './contacts.service'
import {EditMode} from "./edit-mode.enum"

export class Controller {
    private selectedId: number
    private editMode: EditMode

    constructor(private contactsService: ContactsService) {}

    drawContactsList() {
        var contacts = this.contactsService.getAll();
        
        var html = '<ul>'
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
    
    select(event, contactId) {
        this.selectedId = contactId;
            
        this.drawContactsList();
        this.drawViewDetails(contactId);
        
        event.preventDefault();
        return false;
    }
    
    private drawViewDetails(contactId) {
        var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
        var contact = this.contactsService.getById(contactId);
        contactsDetailsContainer.innerHTML = 
            '<label>First Name: </label><b>' + contact.firstName + '</b><br/>' +
            '<label>Last Name: </label><b>' + contact.lastName + '</b><br/>' +
            '<label>email: </label><b>' + contact.email + '</b><br/>' +
            '<label></label><a href="#" class="text-danger" onclick="ctrl.edit(event,' + contact.id + ')"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>';
    }
    
    private clearDetails() {
        var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
        contactsDetailsContainer.innerHTML = '';
    }
    
    remove(event: UIEvent, clientId: number): boolean {
        if( this.selectedId==clientId )
            this.clearDetails();

        this.contactsService.remove(clientId);
        this.drawContactsList();
        
        event.preventDefault();
        return false;
    }
    
    add(event) {
        this.editMode = EditMode.ADD;
        
        this.selectedId = null;
        
        this.drawContactsList();
        this.drawEditDetails(null); // add new contact
        
        event.preventDefault();
        return false;
    }
    
    edit(event, clientId) {
        this.editMode = EditMode.EDIT;
        
        this.drawEditDetails(clientId);
        
        event.preventDefault();
        return false;
    }
    
    private drawEditDetails(contactId) {
        
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
    
    cancelEdit(event) {
        if( this.editMode == EditMode.EDIT) 
            this.drawViewDetails( this.selectedId );
        else
            this.clearDetails();
        
        event.preventDefault();
        return false;
    }
    
    submit(event) {
        event.preventDefault();
        
        var fomValid = this.validate();
        if( !fomValid ) return;
        
        this.save();
        
        return false;
    }
    
    private validate() {
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
    
    save() {
        var form = document.editContactForm;
        
        var client = {
                id: form.id.value,
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                email: form.email.value
            }
        
        var contactId;
        if( this.editMode == EditMode.ADD )
            contactId = this.contactsService.add(client);
        else
            contactId = this.contactsService.update(client);
            
        this.selectedId = contactId;
        this.drawContactsList();
        this.drawViewDetails( this.selectedId );
    }
}