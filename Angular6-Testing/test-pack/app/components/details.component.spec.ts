import {async, TestBed, ComponentFixture} from '@angular/core/testing'
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing'

import {PersonsDetailsComponent} from './details.component'
import { HttpClient } from "@angular/common/http";

describe('PersonsDetailsComponent', () => {
    
    let fixture: ComponentFixture<PersonsDetailsComponent>
    
    beforeAll( () => { 
        TestBed.resetTestEnvironment()
        TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    })

    beforeEach( () => {
        TestBed.configureTestingModule({
            declarations: [ PersonsDetailsComponent ],
        })
        .overrideComponent( PersonsDetailsComponent, {
            add: {
                providers: [
                    {provide: HttpClient, useValue: {}}
                ]
            }
        })

        fixture = TestBed.createComponent( PersonsDetailsComponent )
    })
    
    it('must be a list of persons list', () => {
        let component = fixture.componentInstance
        let element = fixture.nativeElement
        
        fixture.detectChanges()
        
        expect(element.querySelectorAll('li').length).toBe(5)
        expect(element.querySelector('li').textContent).toBe('Gordon Freeman')
    })
})