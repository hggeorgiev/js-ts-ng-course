import { inject, TestBed } from '@angular/core/testing'
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'
import { PersonService } from './person.service'
import { LoadPersonsService } from './load-persons.service'

describe('PersonService', () => {
  let mock_contacts = [
    {"id": 1, "firstName": "Max", "lastName": "Smith", "email": "max@gmail.com"},
    {"id": 4, "firstName": "John", "lastName": "Doe", "email": "john@gmail.com"}
  ]

  let loadService: LoadPersonsService

  beforeAll(() => {
    TestBed.resetTestEnvironment()
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PersonService,
        LoadPersonsService
      ]
    })

    loadService = TestBed.inject(LoadPersonsService)
    spyOn(loadService, 'load').and.returnValue(mock_contacts)
  })

  it('must have 2 persons', inject([PersonService, LoadPersonsService], (personService, loadService) => {
    let persons = personService.getAll()
    expect(persons.length).toBe(2)
  }))

  it('1st person id should 1', inject([PersonService], (personService) => {
    let persons = personService.getAll();
    expect(persons[1].id).toBe(4)
  }))
})
