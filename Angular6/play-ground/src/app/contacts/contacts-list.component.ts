import { Component, OnDestroy, OnInit } from '@angular/core'
import { ContactsService } from './contacts.service'
import { ActivatedRoute, NavigationEnd, Params, Router } from "@angular/router"
import { Subscription } from "rxjs/index";
import { filter, map, switchMap } from "rxjs/operators";


@Component({
  selector: 'contacts-list',
  template: `
      <ul>
          <li highlight="" *ngFor="let contact of contacts" class="item" [class.active]="selectedId == contact.id">
              <a href='#' (click)='onSelect(contact)'>{{contact.firstName}} {{contact.lastName | myUpper}}</a>
              <a href='#' (click)='onRemove(contact)' class='remove' title='Remove'><span
                      class='glyphicon glyphicon-remove-sign'></span></a>
          </li>
      </ul>
  `
})
export class ContactsListComponent implements OnInit, OnDestroy {
  contacts: Contact[]
  selectedId: number
  sub: Subscription

  constructor(private contactsService: ContactsService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  onSelect(contact: Contact) {
    this.router.navigate(['contacts', contact.id])
    return false;
  }

  ngOnInit() {
    this.contacts = this.contactsService.getAll()

    this.sub = this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      switchMap(() => this.route.params),
      map((params: Params) => +params['id'])
    ).subscribe(contactId => this.selectedId = contactId)
  }

  onRemove(contact: Contact) {
    this.contactsService.remove(contact.id)
    if (contact.id === this.selectedId) {
      this.router.navigate(['contacts'])
    }

    return false
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}