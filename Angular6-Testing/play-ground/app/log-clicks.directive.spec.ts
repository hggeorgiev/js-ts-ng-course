import {async, TestBed, ComponentFixture} from '@angular/core/testing'
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing'
import {Component, Output, EventEmitter} from "@angular/core"
import {LogClicksDirective} from "./log-clicks.directive"

@Component({ 
  template: `<div log-clicks (changes)="changed($event)"></div>`
})
export class TestContainer {  
  @Output() changes = new EventEmitter()
  
  changed(value){
    this.changes.emit(value)
  }
}

describe('LogClicksDirective', () => {

    let fixture: ComponentFixture<TestContainer>
  
    beforeAll( () => { 
        TestBed.resetTestEnvironment()
        TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    })

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ TestContainer, LogClicksDirective ]
        })

        fixture = TestBed.createComponent( TestContainer )
    })
  
    it('should increment counter', done => {
        let container = fixture.componentInstance
        let element = fixture.nativeElement
        let div = element.querySelector('div')

        const expected = [1,2,3,4,5]
        let invocations = 0

        fixture.detectChanges()

        // subscribe
        container.changes.subscribe(x => { 
            expect(x).toBe(expected[invocations])
            
            invocations++
            if(invocations==expected.length)
                done()
        })
        
        // trigger click on container
        for(let ind of expected) {
            div.click()
        }
    })
}) 