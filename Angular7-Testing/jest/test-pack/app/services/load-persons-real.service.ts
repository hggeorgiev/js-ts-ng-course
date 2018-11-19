import { Injectable } from '@angular/core';
import { Person } from "../person";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class LoadPersonsRealService {
  readonly API_URL = 'http://www.mockapi.com/api/contacts'

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Person[]>(this.API_URL);
  }
}
