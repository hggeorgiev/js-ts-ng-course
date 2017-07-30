declare interface Array<T> {
	find(f: (T) => boolean ): T
}

interface ContactEditFormElement extends HTMLFormElement {
	// Type restriction - id is a reserved word
	id: HTMLInputElement
	firstName: HTMLInputElement
	lastName: HTMLInputElement
	email: HTMLInputElement
}

interface Document { editContactForm?: ContactEditFormElement }