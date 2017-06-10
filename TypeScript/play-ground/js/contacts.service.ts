let _CONTACTS: Contact[] = [
            { id: 1, firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
            { id: 2, firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
            { id: 3, firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
            { id: 4, firstName: "John", lastName: "Doe", email: "john@gmail.com" },
            { id: 5, firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
        ];

export class ContactsService {
    private CONTACTS = _CONTACTS
    private static _contactId = 5
        
    getAll(): Contact[] {
        return this.CONTACTS;
    }
    
    getById(id) {
        return this.findById(id);
    }
    
    remove(id) {
        var ind = this.findIndexById(id);
        if( ind>=0 )
            this.CONTACTS.splice(ind,1);
    }
    
    private findById(contactId) {
        return this.CONTACTS.find(function(row){
            return row.id == contactId;
        })
    }
    
    private findIndexById(contactId) {
        var contact = this.findById(contactId);
        if( !contact ) return -1;
        
        return this.CONTACTS.indexOf(contact);
    }
    
    update(contact) {
        var ind = this.findIndexById(contact.id);
        if( ind<0 ) return null;
        
        this.CONTACTS.splice( ind, 1, contact );
        
        return contact.id;
    }
    
    add(contact) {
        contact.id = ++ContactsService._contactId;
        
        this.CONTACTS.push( contact );
        
        return contact.id;
    }
}