import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ContactsRoutingModule } from './contacts-routing.module'
import { MyUpperPipe } from '../my-upper.pipe'
import { ContactsComponent } from './contacts.component'
import { ContactsService } from './contacts.service'
import { ContactDetailsComponent } from './contact-details.component'
import { ContactsListComponent } from "./contacts-list.component"
import { DialogService } from "../dialog.service"
import { HighlightDirective } from "../highlight.directive";

@NgModule({
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContactsRoutingModule],
  declarations: [ContactsComponent,
    ContactsListComponent,
    ContactDetailsComponent,
    MyUpperPipe,
    HighlightDirective,
  ],
  providers: [ContactsService,
    DialogService]
})
export class ContactsModule {
}