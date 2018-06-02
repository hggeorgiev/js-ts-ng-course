import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Contact } from "./contact"
import { ContactsService } from "./contact.service"
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
export class ContactsListComponent implements OnInit {
  selected: number
  persons: Contact[]

  constructor(private personService: ContactsService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  remove(person: Contact) {
    this.personService.remove(person.id)
    if (person.id == this.selected)
      this.router.navigate(['/contacts']);
  }

  onSelect(person: Contact) {
    this.router.navigate(['/contacts', person.id]);
  }

  ngOnInit() {
    this.persons = this.personService.getAll();

    this.route.params.pipe(
      map((params: Params) => +params['id'])
    ).subscribe(contactId => this.selected = contactId);
  }
}
