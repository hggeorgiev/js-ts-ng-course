interface Named {
    name: string;
}

class Person {
    name: string;
}

let p: Named;
/**
 * OK, because of structural typing - We have the same number of properties, of the same name and
 of the same type
 */
p = new Person();


// -- Comparing two functions --

let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error

// -- Enums --

{
    enum Status { Ready, Waiting };
    enum Color { Red, Blue, Green };

    let status = Status.Ready;
    status = Color.Green;  //error
    
    let x1: number = Status.Ready;
    let x2: number = Color.Green;
}

// -- Generics --

{
    interface Empty<T> {
    }
    let x1: Empty<number>;
    let y1: Empty<string>;

    x1 = y1;  // okay, y matches structure of x1
    
    // with specified Generic arguments
    
    interface NotEmpty<T> {
        data: T;
    }
    let x2: NotEmpty<number>;
    let y2: NotEmpty<string>;

    x2 = y2;  // error, x and y are not compatible
}