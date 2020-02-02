

interface ContactEditFormElement extends HTMLFormElement {
	contactId: HTMLInputElement
	firstName: HTMLInputElement
	lastName: HTMLInputElement
	email: HTMLInputElement
}

interface Document { editContactForm?: ContactEditFormElement }