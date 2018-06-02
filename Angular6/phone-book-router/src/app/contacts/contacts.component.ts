import { Component, ViewChild } from '@angular/core'
import { CanComponentDeactivate } from '../can-deactivate-guard'
import { DialogService } from "../dialog.service"
import { from } from 'rxjs';
import { ContactDetailsComponent } from './contact-details.component';
import { Observable } from "rxjs/index";

@Component({
  selector: 'contacts',
  template: `
      <contacts-list></contacts-list>

      <a id="add" class="text-danger" [routerLink]="['/contacts', -1]"><span class="glyphicon glyphicon-plus"></span>Add</a>

      <contact-details></contact-details>
  `
})
export class ContactsComponent implements CanComponentDeactivate {
  @ViewChild(ContactDetailsComponent)
  private contactDetailsComponent: ContactDetailsComponent

  constructor(private dialogService: DialogService) {
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.contactDetailsComponent.showEdit)
      return true;

    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    const p: Promise<boolean> = this.dialogService.confirm('Discard changes?')
    const o                   = from(p);
    return o;
  }
}