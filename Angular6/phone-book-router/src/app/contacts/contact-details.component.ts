import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Contact } from "./contact"
import { ContactsService } from "./contact.service"
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'contact-details',
  template: `
      <div id="contactsDetailsContainer" *ngIf="contact">
            <span *ngIf="!showEdit">
                <label>First Name: </label><b>{{contact.firstName}}</b><br/>
                <label>Last Name: </label><b>{{contact.lastName}}</b><br/>
                <label>Email: </label><b>{{contact.email}}</b><br/>
                <label></label><a class="text-danger" (click)="showEdit=true"><span
                    class="glyphicon glyphicon-edit"></span>Edit</a><br/>
            </span>
          <form [formGroup]="contactForm" *ngIf="showEdit" novalidate>
              <label for="firstName">First Name: </label>
              <input id="firstName" name="firstName" formControlName="firstName" required><br/>
              <div class="alert alert-danger" role="alert"
                   *ngIf="contactForm.controls.firstName && !contactForm.controls.firstName.pristine && !contactForm.controls.firstName.valid">
                  First name is required
              </div>

              <label for="lastName">Last Name: </label>
              <input id="lastName" name="lastName" formControlName="lastName"
                     required><br/>
              <div class="alert alert-danger" role="alert"
                   *ngIf="contactForm.controls.lastName && !contactForm.controls.lastName.pristine && !contactForm.controls.lastName.valid">
                  Last name is required
              </div>

              <label for="email">Email: </label>
              <input id="email" name="email" formControlName="email"><br/>
              <div class="alert alert-danger" role="alert"
                   *ngIf="contactForm.controls.email && !contactForm.controls.email.valid">Email is invalid
              </div>


              <label></label>
              <input type="submit" class="btn btn-danger" (click)="onSubmit()"
                     value="{{ !contact.id ? 'Add' : 'Save' }}"
                     [disabled]="contactForm.invalid || contactForm.pristine"/>
              <a href="#" class="text-danger" (click)="onCancel()">Cancel</a>
          </form>
      </div>
  `,
  styles: ['.alert {margin-left: 104px;}']
})
export class ContactDetailsComponent implements OnChanges, OnInit {
  contact: Contact;
  showEdit: boolean;

  contactForm: FormGroup;


  constructor(private _personService: ContactsService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email]

    })

  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.contact = this._personService.getById(params["id"]);
        if (this.contact == null) {
          this.contact = { firstName: '' , lastName: '' , email: ''} as Contact;
          this.showEdit = true;
        }
        this.contactForm.reset({
          firstName: this.contact.firstName,
          lastName: this.contact.lastName,
          email: this.contact.email
        });
      }
    });
  }

  ngOnChanges(changes) {
    if (changes && changes.contact && changes.contact.currentValue !== changes.contact.previousValue)
      this.showEdit = ( this.contact && this.contact.id === null )
  }

  onSubmit() {
    if (!this.contactForm.valid) return;

    let dirtyContact: Contact = this.contactForm.value;
    dirtyContact.id           = this.contact.id;

    if (this.contact.id === null)
      this._personService.add(dirtyContact);
    else
      this._personService.update(dirtyContact);

    this.contact = dirtyContact;


    this.showEdit = false
  }

  onCancel() {
    this.showEdit = false;

    if (this.contact.id === null) {
      this.contact = null;
    }
  }

  remove(person: Contact) {
    this._personService.remove(person.id);
  }

}
