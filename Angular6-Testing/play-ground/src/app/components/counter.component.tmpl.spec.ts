import {ComponentFixture, TestBed} from '@angular/core/testing'
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing'
import { Counter } from "./counter.component"
import { By } from "@angular/platform-browser"

describe('EventEmitter: Counter', () => {
  let fixture: ComponentFixture<Counter>

  beforeAll( () => { 
      TestBed.resetTestEnvironment()
      TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
  })

  //setup
  beforeEach(() => {
      TestBed.configureTestingModule({
          declarations: [ Counter ],
      })

      fixture = TestBed.createComponent( Counter )
  })
  
  it('initial count to be 0', ()=>{
    fixture.detectChanges()

    let elem = fixture.debugElement.query(By.css('h1'))
    expect(elem.nativeElement.textContent).toBe('0')
  })

  //specs
  it('should increment +1', () => {
    fixture.detectChanges()

    let btn = fixture.nativeElement.querySelectorAll("button")[0]
    btn.click()
    fixture.detectChanges()

    let elem = fixture.debugElement.query(By.css('h1'))
    expect(elem.nativeElement.textContent).toBe('1')
  })

  it('should decrement -1', () => {
    fixture.detectChanges()

    let btn = fixture.nativeElement.querySelectorAll("button")[1]
    btn.click()
    fixture.detectChanges()

    let elem = fixture.debugElement.query(By.css('h1'))
    expect(elem.nativeElement.textContent).toBe('-1')
  })  
}) 