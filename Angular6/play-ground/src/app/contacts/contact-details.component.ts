import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms"
import { ContactsService } from "./contacts.service"
import { CanComponentDeactivate } from "../can-deactivate-guard"
import { DialogService } from "../dialog.service"
import { from, Observable } from "rxjs/index";
import { map } from "rxjs/internal/operators";

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
  `
})
export class ContactDetailsComponent implements OnInit, CanComponentDeactivate {
  contact: Contact
  contactForm: FormGroup
  showEdit = false

  @ViewChild('form') form: NgForm

  constructor(private contactsService: ContactsService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private dialogService: DialogService) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email]

    })

  }

  onCancel() {
    this.showEdit = false

    if (this.contact && this.contact.id === -1) {
      this.router.navigate(['/contacts'])
    }

    return false
  }

  onSubmit() {


    if (!this.contactForm.valid) return

    let dirtyContact: Contact = this.contactForm.value
    dirtyContact.id           = this.contact.id

    if (this.contact.id === -1) {
      this.contactsService.add(dirtyContact)
      this.router.navigate(['contacts', dirtyContact.id])
    } else {
      this.contactsService.update(dirtyContact);
    }

    this.contact = dirtyContact

    this.showEdit = false
  }

  ngOnInit() {
    this.route.params.pipe(map((params: Params) => +params['id']))

      .subscribe(
        id => {
          if (id > 0) {
            this.contact = this.contactsService.getById(+id)
            this.contactForm.reset({
              firstName: this.contact.firstName,
              lastName: this.contact.lastName,
              email: this.contact.email
            });
            this.showEdit = false
          } else if (id === -1) {
            this.contact  = {id: -1, firstName: '', lastName: '', email: ''}
            this.showEdit = true
          } else {
            this.contact  = null
            this.showEdit = false
          }
        }
      )
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.showEdit || !this.contactForm.dirty)
      return true

    let p: Promise<boolean> = this.dialogService.confirm('Discard changes?')
    let o                   = from(p)
    return o
  }
}