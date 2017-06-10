'use strict';

/**
 * Immediate invocation pattern - this function will be invoked right after the file is loaded within the browser
 */
(function (exports) {

    function ContactsService() {
        var CONTACTS = [
            {id: "1", firstName: "Max", lastName: "Smith", email: "max@gmail.com"},
            {id: "2", firstName: "Chris", lastName: "Raches", email: "chris@gmail.com"},
            {id: "3", firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com"},
            {id: "4", firstName: "John", lastName: "Doe", email: "john@gmail.com"},
            {id: "5", firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com"}
        ];

        this.getAll = function () {
            return CONTACTS;
        };

        // Get an array item that matches an id
        this.getById = function (id) {
            return this.findById(id);
        };


        this.add = function (contact) {
            // Add an id to the new contact
            contact.id = ++ContactsService._contactId;

            // Push it to the array
            CONTACTS.push(contact);

            // Return it to the controller.
            return contact.id;

        };

        this.remove = function (id) {
            var ind = this.findIndexById(id);
            // if index is not -1 (which means that there is no such item), use array.splice(index, numb of ind forward) to remove it.
            if (ind >= 0)
                CONTACTS.splice(ind, 1);
        };


        this.update = function (contact) {
            var ind = this.findIndexById(contact.id);
            // If there is no contact found, return null
            if (ind < 0) return null;

            // Remove the current item at at the index and replace it with the new one
            CONTACTS.splice(ind, 1, contact);

            // Return the item to the controller
            return contact.id;
        };


        // Use array.find() to return the array element that matches the condition
        this.findById = function (contactId) {
            return CONTACTS.find(function (row) {
                return row.id == contactId;
            })
        };

        this.findIndexById = function (id) {
            // Use findById to get the contact object
            var contact = this.findById(id);
            // Return -1 if there is no object returned by findById
            if (!contact) return -1;

            // Use array.indexOf() to get the index of the object and return it
            return CONTACTS.indexOf(contact);

        }

    }

    // Start incrementing Ids of added items from 5
    ContactsService._contactId = 5;

    // Accepts a service as an argument
    function ContactsController(contactsService) {
        this.contactService = contactsService;
        // Store the selected id
        this.selectedId = null;
        // Store the form mode - Either deleting or adding
        this.contactFormMode = null;


        /**
         * Select an item from the list;
         * Redraw the list and draw the details view
         *
         * @param event
         * @param contactId
         * @returns {boolean}
         */
        this.select = function (event, contactId) {
            this.selectedId = contactId;

            // Redraw contacts list to show the selected id
            this.drawContactsList();

            // Draw the HTML for the selected contact
            this.drawContactDetailsView(contactId);

            // Prevent propagation
            event.preventDefault();
            return false;
        };


        /**
         *  Start adding an item to a list
         *  uses drawContactForm without a contactId to
         *  change the form mode to 'add' and draw an empty form.
         */
        this.add = function () {
            // Set the contact form mode to 'add'
            this.contactFormMode = 'add';
            // Unselect the selected item
            this.selectedId = null;

            // Redraw contacts list
            this.drawContactsList();
            // Draw the form
            this.drawContactForm(null);

            // Prevent propagation
            event.preventDefault();
            return false;
        };

        /**
         *  Remove an item from the list;
         *  Remove the selected item if the item to be removed matches the selected item
         *  Redraw the contacts list
         * @param event
         * @param contactId
         * @returns {boolean}
         */
        this.remove = function (event, contactId) {

            // Remove the item
            this.contactService.remove(contactId);
            //Redraw the contacts list
            this.drawContactsList();

            // If the item to be deleted matches the selectedItem, clear the details view
            if (this.selectedId == contactId) this.clearDetailsView();


            // Prevent propagation
            event.preventDefault();
            return false;
        };


        /**
         *  Changes the form mode to 'edit'
         *  and draws the form
         * @param event
         * @param contactId
         * @returns {boolean}
         */
        this.edit = function (event, contactId) {
            // Change the form mode
            this.contactFormMode = 'edit';
            // Draw the form
            this.drawContactForm(contactId);
            this.selectedId = contactId;
            // Prevent propagation
            event.preventDefault();
            return false;
        };


        /**
         * DRAWABLES
         */


        /**
         * Creates a list from all the contacts
         */
        this.drawContactsList = function () {
            var contacts = this.contactService.getAll();


            var contactsListHtml = "<ul>";
            for (var arrInd in contacts) {
                var currentContact = contacts[arrInd];
                // Append a list item for each of the contacts to the HTML string
                contactsListHtml +=
                    "<li class='item" + ( this.selectedId == currentContact.id ? ' active' : '' ) + "'>" +
                    "<a href='#' onclick='ctrl.select(event, " + currentContact.id + ")'>" + currentContact.firstName + ' ' + currentContact.lastName.toUpperCase() + "</a>" +
                    "<a href='#' onclick='ctrl.remove(event, " + currentContact.id + ")' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>" +
                    "</li>";
            }
            //Don't forget the closing tag in the list!
            contactsListHtml += "</ul>"

            // Get the element from the document
            var contactsListContainer = document.getElementById('contactsListContainer');
            // Attach the generated HTML to the document
            contactsListContainer.innerHTML = contactsListHtml

        };

        this.drawContactDetailsView = function (contactId) {
            // Get the contact by ID
            var selectedContact = this.contactService.getById(contactId);

            // Get the element from the document
            var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
            contactsDetailsContainer.innerHTML =
                '<label>First Name: </label><b>' + selectedContact.firstName + '</b><br/>' +
                '<label>Last Name: </label><b>' + selectedContact.lastName + '</b><br/>' +
                '<label>E-Mail: </label><b>' + selectedContact.email + '</b><br/>' +
                // Edit - handle editing
                '<label></label><a href="#" class="text-danger" onclick="ctrl.edit(event,' + selectedContact.id + ')"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>';
        };


        // Removes the HTML in the details view
        this.clearDetailsView = function () {
            // Get the element from the document
            var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
            // Remove its HTML
            contactsDetailsContainer.innerHTML = '';
        };

        /**
         *  Draws the contact form.
         *  If there is an id specified, it puts the selected contact's attributes in the form
         *  if there is no id specified, it initializes an object with empty attributes
         * @param contactId
         */
        this.drawContactForm = function (contactId) {

            // If contactId is undefined, make an object with empty attributes. Otherwise get the item
            var contact = !contactId ? {
                    id: '',
                    firstName: '',
                    lastName: '',
                    email: ''
                } : this.contactService.getById(contactId);

            /*
             Get the element from the document. Note that both the contact details view and the form are
             using the same element to render html.
             */
            var contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
            contactsDetailsContainer.innerHTML =
                // Accessible through document.editContactForm in the DOM
                // Note onsubmit - Handle form submission
                '<form name="editContactForm" onsubmit="ctrl.submit(event)">' +
                    // Note - hidden inputs
                '<input name="id" type="hidden" value="' + contact.id + '">' +
                '<label>First Name: </label><input name="firstName" value="' + contact.firstName + '"><br/>' +
                '<label>Last Name: </label><input name="lastName" value="' + contact.lastName + '"><br/>' +
                '<label>E-Mail: </label><input name="email" value="' + contact.email + '"><br/>' +
                '<label></label><input type="submit" class="btn btn-danger" value="' + ( !contactId ? 'Add' : 'Save' ) + '"/>' +
                // Handle edit mode cancellation
                '<a href="#" class="text-danger" onclick="ctrl.cancelEdit(event)">Cancel</a>' +
                '</form>';
        };

        /**
         *  Handle form logic
         */

        this.cancelEdit = function (event) {
            //If the item is edit, switch back to its details view
            if (this.contactFormMode == 'edit') {
                this.drawContactDetailsView(this.selectedId);
                /**
                 * if the item is new, clear the details view (works both for details and form -
                 * both of them are drawn in 'contactsDetailsContainer'
                 */

            } else {
                this.clearDetailsView();
            }


            // Prevent propagation
            event.preventDefault();
            return false;
        };

        this.submit = function (event) {

            // Get the validation result.
            var isformValid = this.validate();
            // If the form is incorrect, return;
            if (!isformValid) return;

            // If the form is correct, save the result.
            this.save();

            event.preventDefault();
        };


        /**
         *  Creates an object with the form values.
         *  If the contactForm mode is 'add', adds the object
         *  If the contactForm mode is 'edit', updates the object
         *
         *  selects the object, redraws the contact list and the details view
         */
        this.save = function () {
            var form = document.editContactForm;

            var contactInfo = {
                id: form.id.value,
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                email: form.email.value
            };


            // The contact id of the updated/new item
            var contactId;
            if(this.contactFormMode == 'add') {
                contactId = this.contactService.add(contactInfo)
            } else {
                contactId = this.contactService.update(contactInfo)
            }

            this.selectedId = contactId;
            this.drawContactsList();
            this.drawContactDetailsView(contactId);


        };


        /**
         *  Validates the submitted contact form
         *  and returns the result.
         * @returns {boolean}
         */
        this.validate = function () {
            // Assume the validation is false;
            var validationResult = false;

            // Get the form
            var form = document.editContactForm;

            // Run checks for names and e-mail.
            if (!form.firstName.value)
                alert('First name is mandatory');
            else if (!form.lastName.value)
                alert('Last name is mandatory');
            //form.<input name>.value - the value in hte input
            else if (form.email.value && !(/[0-9a-z_\-.]+@[0-9a-z_\-.]{2,}\.[0-9a-z_\-.]{2,}/img).test(form.email.value))
                alert('Invalid email');
            else
                validationResult = true;


            return validationResult;
        }


    }


    function bootstrap() {
        var service = new ContactsService();
        // Pass the service to the controller
        var controller = new ContactsController(service);

        // Add the controller to the window object of the browser
        exports.ctrl = controller;
        controller.drawContactsList();

    }

    // Initialize the Controller and the Service
    bootstrap();

    /**
     *  Pass over the window object (also known as the global scope of the browser) to the function
     */

})(window);