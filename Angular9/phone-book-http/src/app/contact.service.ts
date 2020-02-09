import { Injectable } from "@angular/core"
import { Contact } from "./contact"
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from "../environments/environment";
import { catchError, tap } from "rxjs/operators";


@Injectable()
export class ContactsService {
  private static _contactId = 1;
  private contactsUrl       = `${environment.apiUrl}contacts`;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl)
      .pipe(
        tap(data => {
          data.map((val) => {
            ContactsService._contactId = Math.max(val.id, ContactsService._contactId);
          });
          ContactsService._contactId++;
          return data;
        }),
        catchError(this.handleError)
      );
  }

  getById(id: number) {
    return this.findById(id);
  }

  remove(id: number) {
    throw new Error('Unimpemented functionality');
  }

  update(contact: Contact) {
    throw new Error('Unimpemented functionality');
  }

  add(contact: Contact) {
    throw new Error('Unimpemented functionality');
  }

  private findById(contactId: number): Contact {
    throw new Error('Unimpemented functionality');
  }

  private findIndexById(contactId: number) {
    throw new Error('Unimpemented functionality');
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
