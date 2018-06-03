import { async, getTestBed, TestBed } from '@angular/core/testing'
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'

import { LoadPersonsRealService } from "../services/load-persons-real.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";


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

describe('MockBackend: LoadPersonsRealService', () => {
  let injector: TestBed;
  let service: LoadPersonsRealService
  let httpMock: HttpTestingController;

  beforeAll(() => {
    TestBed.resetTestEnvironment()
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  })


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoadPersonsRealService]
    });
    injector = getTestBed();
    service  = injector.get(LoadPersonsRealService);
    httpMock = injector.get(HttpTestingController);
  });


  afterEach(() => {
    // No outstanding requests
    httpMock.verify();
  });

  it('should return mocked response', async(() => {

    service.getAll().subscribe(data => {
      expect(data.length).toBe(2)
      expect(data[0].firstName).toBe(responseData[0].firstName)
    })

    const req = httpMock.expectOne(service.API_URL);
    expect(req.request.method).toBe('GET');
    req.flush(responseData);
  }))


})
