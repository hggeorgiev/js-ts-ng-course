import {async, TestBed, ComponentFixture} from '@angular/core/testing'
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing'
import {PersonsDetailsComponent} from './details.component'
import { PersonService } from "../services/person.service";
import { LoadPersonsService } from "../services/load-persons.service";


describe('PersonsDetailsComponent (SPY)', () => {

    let fixture: ComponentFixture<PersonsDetailsComponent>
    let personServiceSpy: PersonService

    let mock_contacts = [
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
      }

    ]

    beforeAll( () => {
        TestBed.resetTestEnvironment()
        TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    })

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ PersonsDetailsComponent ],
        })
        .overrideComponent( PersonsDetailsComponent, {
            set: {
                providers: [
                    PersonService,
                    {provide: LoadPersonsService, useValue: { load: ()=> null }}
                ]
            }
        })

        fixture = TestBed.createComponent( PersonsDetailsComponent )

        personServiceSpy = fixture.debugElement.injector.get(PersonService)
        spyOn(personServiceSpy, 'getAll').and.returnValue( mock_contacts )
    })

    it('must be a list of persons list', () => {
        let component = fixture.componentInstance
        let element = fixture.nativeElement

        fixture.detectChanges()

        expect((<any>personServiceSpy.getAll).calls.count()).toBe(1)

        expect(element.querySelectorAll('li').length).toBe(2)
        expect(element.querySelector('li').textContent).toBe('Gordon Freeman')
    })
})
