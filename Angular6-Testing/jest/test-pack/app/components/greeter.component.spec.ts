import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { GreeterComponent } from './greeter.component'

describe('GreeterComponent', () => {
  let fixture: ComponentFixture<GreeterComponent>
  let component: GreeterComponent

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [ GreeterComponent ],
    });

    // create component and test fixture
    fixture = TestBed.createComponent( GreeterComponent )

    // get test component from the fixture
    component = fixture.componentInstance
  });


  it('title should be "Phone Book App"', () => {
    const compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();

    expect(compiled.querySelector('h1').textContent).toContain('Phone Book App');
  })
});