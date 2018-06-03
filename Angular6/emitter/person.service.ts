import { Injectable } from '@angular/core';
import { Person } from './person';

let PERSONS: Person[] = [
  {
    "id": "1",
    "firstName": "Gordon",
    "lastName": "Freeman",
    "email": "freeman@blackmesa.com"
  },
  {
    "id": "2",
    "firstName": "Alyx",
    "lastName": "Vance",
    "email": "alyx@resitance.com"
  },
  {
    "id": "3",
    "firstName": "Wallace",
    "lastName": "Breen",
    "email": "breen@blackmesa.com"
  },
  {
    "id": "4",
    "firstName": "Barney",
    "lastName": "Calhoun",
    "email": "calhoun@blackmesa.com"
  },
  {
    "id": "5",
    "firstName": "Eli",
    "lastName": "Vance",
    "email": "vance@blackmesa.com"
  }
]


@Injectable()
export class PersonService {
  private persons = PERSONS

  getAll() {
    return this.persons
  }

  delete(person: Person) {
    let ind = this.persons.findIndex((val) => person.id == val.id)
    if (ind >= 0)
      this.persons.splice(ind, 1)
  }
}