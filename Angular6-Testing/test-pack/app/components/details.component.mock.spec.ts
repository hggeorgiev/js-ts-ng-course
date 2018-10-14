import {async, TestBed, ComponentFixture} from '@angular/core/testing'
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing'
import {PersonsDetailsComponent} from './details.component'
import { PersonService } from "../services/person.service";
import { LoadPersonsService } from "../services/load-persons.service";


describe('PersonsDetailsComponent (MOCK)', () => {

    let fixture: ComponentFixture<PersonsDetailsComponent>

    class PersonServiceMock {
        getAll() {
            return [
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
        }
    }

    let personServiceSpy = new PersonServiceMock()

    beforeEach(() => {
        spyOn(personServiceSpy, 'getAll').and.callThrough()

        TestBed.configureTestingModule({
            declarations: [ PersonsDetailsComponent ],
        })
        .overrideComponent( PersonsDetailsComponent, {
            set: {
                providers: [
                    {provide: PersonService, useValue: personServiceSpy},
                    {provide: LoadPersonsService, useValue: {}}
                ]
            }
        })

        fixture = TestBed.createComponent( PersonsDetailsComponent )
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
