import {async, inject, TestBed, ComponentFixture} from '@angular/core/testing'
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing'
import {Router} from "@angular/router"
import {Location} from '@angular/common'
import {SpyLocation} from "@angular/common/testing"
import { AppComponent } from "../app.component";
import { AppModule } from "../app.module";

describe('Router tests', () => {

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

  beforeEach(inject([Router, Location], (r, l) => {
    router = r
    spylocation = l
  }))

  //specs
  it('Should be able to navigate to Home', done => {
    router.navigate(['']).then(() => {
      expect(spylocation.path()).toBe('/')
      done()
    }).catch(e => done.fail(e))
  })

  it('should redirect not registered urls to Home', done => {
    router.navigateByUrl('/unknown').then(() => {
      expect(spylocation.path()).toBe('/')
      done()
    }).catch(e => done.fail(e))
  })

  it('Should be able to navigate to About', done => {
    router.navigate(['about']).then(() => {
      expect(spylocation.path()).toBe('/about')
      done()
    }).catch(e => done.fail(e))
  })
})
