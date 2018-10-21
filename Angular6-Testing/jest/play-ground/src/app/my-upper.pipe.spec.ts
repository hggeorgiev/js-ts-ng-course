import { MyUpperPipe } from './my-upper.pipe'; 
 
describe('MyUpperPipe', () => { 
    let pipe: MyUpperPipe 
     
    beforeEach(() => { 
        pipe = new MyUpperPipe(); 
    }); 
     
    it('transforms "abc" to "ABC"', () => { 
        expect(pipe.transform('abc')).toEqual('ABC'); 
    }) 
     
    it('leaves "ABS" to "ABC"', () => { 
        expect(pipe.transform('ABC')).toEqual('ABC'); 
    })

    it('leaves "0123456789" to "0123456789"', () => { 
        expect(pipe.transform('0123456789')).toEqual('0123456789'); 
    })

    it('process NULL correctly', () => {
        expect(pipe.transform(null)).toEqual(null); 
    }) 
})