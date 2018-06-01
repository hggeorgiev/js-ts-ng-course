import { async } from '@angular/core/testing'
import { Observable } from 'rxjs/Rx'

describe('Observable: basic observable', () => {
  //setup
  beforeEach(() => {
    this.basic$ = new Observable(observer => {
      //pushing values
      observer.next(10)
      observer.next(20)
      observer.next(30)
      //complete stream
      observer.complete() 
    })
  })
  
  //specs
  it('should create the expected sequence', async(() => {
    let expected = [10,20,30] 
    let index = 0
    
    this.basic$
      .subscribe(
        x => expect(x).toEqual(expected[index++])           // complete
    )
  }))
})