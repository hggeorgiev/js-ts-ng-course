
function test() {
    // Boolean
    let isDone: boolean = false

    // Number
    let decimal: number = 6;
    let hex: number = 0xf00d;
    let binary: number = 0b1010;
    let octal: number = 0o744;

    // String
    let color: string = "blue";
    color = 'red';

    // Template strings
    let fullName: string = `Bob Bobbington` ;
    let age: number = 37;
    let sentence: string = `Hello, my name is ${ name }.`;
    
    // Array
    let listArraySyntax: number[] = [1, 2, 3];
    let listTypeSyntax: Array<number> = [1, 2, 3];
    
    // Tuple
    let x: [string, number];
    x = ['hello', 10]; // OK
    x = [10, 'hello']; // Error
    
    console.log(x[0].substr(1)); // OK
    console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
    
    // When accessing an element outside the set of known indices, a union type is used instead
    x[3] = 'world'; // OK, string can be assigned to (string | number)
    console.log(x[5].toString()); // OK, 'string' and 'number' both have toString
    x[6] = true; // Error, boolean isn't (string | number)
    
    // Enum
    enum Color {Red, Green, Blue}
    let c: Color = Color.Green;
    
    enum Color2 {Red = 1, Green, Blue}
    let c2: Color2 = Color2.Green;
    
    enum Color3 {Red = 1, Green = 2, Blue = 4}
    let c3: Color3 = Color3.Green;


    enum Color4 {Red = 1, Green, Blue}
    let colorName: string = Color4[2]
    alert(colorName)
    
    // Any
    let notSure: any = 4;
    notSure = "maybe a string instead";
    notSure = false; // okay, definitely a boolean
    
    let un = undefined;
    let nn = null;
    
    // Void
    function warnUser(): void {
        alert("This is my warning message");
    }

    // Undefined and null types.

    // They're subtypes of all simple types
    let u: undefined = undefined;
    let n: null = null;
    // --strictNullChecks lets you assign undefined only to void type of variables
    let unusable: void = undefined;

    // Never
    // Can be a subtype of all types, but no type is subtype of 'Never'

    // Function returning never must have unreachable end point
    function error(message: string): never {
    throw new Error(message);
    }

    // Inferred return type is never
    function fail() {
    return error("Something failed");
    }

    // Function returning never must have unreachable end point
    function infiniteLoop(): never {
        while (true) {}
    }

    // Object
    //Object is type that represents the non-primitive type,
    // i.e. any thing that is not number, string, boolean, symbol, null, or undefined.


    function create(o: object | null): void {}

    create({ prop: 0 }); // OK
    create(null); // OK
    create(42); // Error
    create("string"); // Error
    create(false); // Error
    create(undefined); // Error
  {
    // Type assertions
    {
      let someValue: any    = "this is a string";
      let strLength: number = (<string>someValue).length;
    }

    {
      let someValue: any    = "this is a string";
      let strLength: number = (someValue as string).length;
    }

    // Assertion is not casting
    let num: number = 1;
    let str: any    = '1';
    alert(<number>str + num); // result is not 2
  }
    
}

/*
You may’ve noticed that so far, we’ve been using the let keyword instead of JavaScript’s var keyword which you might be more familiar with.
 The let keyword is actually a newer JavaScript construct that TypeScript makes available. We’ll discuss the details later, but many common problems in JavaScript are alleviated by using let,
so you should use it instead of var whenever possible.
 */