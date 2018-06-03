import {async, TestBed, ComponentFixture} from '@angular/core/testing'
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing'
import {PersonsDetailsComponent} from './details.component'
import {PersonService} from './person.service'
import {LoadPersonsService} from './load-persons.service'

describe('PersonsDetailsComponent (MOCK)', () => {
    
    let fixture: ComponentFixture<PersonsDetailsComponent>

    class PersonServiceMock {
        getAll() {
            return [
                  { "id": 1, "firstName": "Max",     "lastName": "Smith",  "email": "max@gmail.com" },
                  { "id": 2, "firstName": "Chris",   "lastName": "Raches", "email": "chris@gmail.com" }]
        }
    }
    
    let personServiceSpy = new PersonServiceMock()
    
    beforeAll( () => { 
        TestBed.resetTestEnvironment()
        TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    })

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
        expect(element.querySelector('li').innerText).toBe('Max Smith')
    })
})