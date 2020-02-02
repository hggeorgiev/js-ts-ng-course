import { Component, OnDestroy, OnInit } from '@angular/core'
import { Contact } from "./contact"
import { ContactsService } from "./contact.service"
import { Subscription } from "rxjs/index";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { map } from "rxjs/operators";


@Component({
  selector: 'contacts-list',
  template: `
      <ul>
          <li *ngFor="let person of persons" class="item" [class.active]="selected==person.id">
              <a (click)="onSelect(person)">{{person.firstName}} {{person.lastName | uppercase}}</a>
              <a (click)="remove(person)" class="remove" title="Remove"><span
                      class="glyphicon glyphicon-remove-sign"></span></a>
          </li>
      </ul>
  `
})
export class ContactsListComponent implements OnInit, OnDestroy {
  selected: number
  persons: Contact[]
  private sub: Subscription

  constructor(private personService: ContactsService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  remove(person: Contact) {
    if (person.id == this.selected)
      this.router.navigate(['/contacts'])
        .then((success) => success && this.personService.remove(person.id))
    else
      this.personService.remove(person.id)
  }

  onSelect(person: Contact) {
    this.router.navigate(['/contacts', person.id])
  }

  ngOnInit() {
    this.persons = this.personService.getAll();

    this.sub = this.route
      .params.pipe(
        map((params: Params) => +params['id'])
      )

      .subscribe(contactId => this.selected = contactId)
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
