import {fakeAsync, tick, TestBed, ComponentFixture} from '@angular/core/testing'
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

describe('LogClicksDirective (SYNC)', () => {
    
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

    it('should increment counter',
        fakeAsync (() => {
            fixture.detectChanges();
        
            // tick initializes fixture variable
            tick();
        
            let container = fixture.componentInstance
            let element = fixture.nativeElement
            let div = element.querySelector('div')

            let invocations = 1

            // subscribe
            container.changes.subscribe(x => { 
                expect(x).toBe(invocations)
            })
            
            //trigger click on container
            for(; invocations<=5; invocations++) {
                div.click()
                // let subscriber to execute
                tick()
            }
        })
    )
}) 