import {async, inject, TestBed, ComponentFixture} from '@angular/core/testing'
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing'
import {Router} from "@angular/router"
import {Location} from '@angular/common'
import {SpyLocation} from "@angular/common/testing"
import { AppComponent } from "../app.component";
import { AppModule } from "../app.module";


const responseData = [
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

describe('Router & App tests', () => {

  let router: Router
  let spylocation: SpyLocation
  let fixture: ComponentFixture<AppComponent>

  beforeAll( () => {
      TestBed.resetTestEnvironment()
      TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
  })

  //setup
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
      providers: [ { provide: Location, useClass: SpyLocation } ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent)
    })
  }))

  beforeEach( inject([Router, Location], (r, l) => {
    router = r
    spylocation = l
  }))

  //specs

  it('Selecting About link should load it', async(() => {

    fixture.detectChanges()

    fixture.whenStable().then(() => {
      let element: HTMLElement = fixture.nativeElement

      let links = <NodeListOf<HTMLAnchorElement>> element.querySelectorAll('a')
      links.item(1).click()

      fixture.detectChanges()

      fixture.whenStable().then(() => {
        // console.log(element.innerHTML)
        // console.log(element.textContent)
        expect(spylocation.path()).toBe('/about')
      })
    })
  }))
})
