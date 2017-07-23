import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing'
import {GreeterComponent} from './greeter.component'

describe('GreeterComponent', () => {    
    let fixture: ComponentFixture<GreeterComponent>
    let comp: GreeterComponent

    beforeAll( () => { 
        TestBed.resetTestEnvironment()
        TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    })

    beforeEach(() => {
        // refine the test module by declaring the test component
        TestBed.configureTestingModule({
            declarations: [ GreeterComponent ],
        })

        // create component and test fixture
        fixture = TestBed.createComponent( GreeterComponent )

        // get test component from the fixture
        comp = fixture.componentInstance
    })

    it('must be "Phone Book App"', () => {
        let element = fixture.nativeElement

        fixture.detectChanges() // template is not build before that call

        expect(element.querySelectorAll('h1').length).toBe(1);
        expect(element.querySelector('h1').innerText).toBe('Phone Book App');
    })
})