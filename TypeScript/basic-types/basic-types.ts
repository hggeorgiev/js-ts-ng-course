
function test() {
    // -- Boolean --
    let isDone: boolean = false

    // Number
    let decimal: number = 6
    let hex: number = 0xf00d
    let binary: number = 0b1010
    let octal: number = 0o744

    // -- String --
    let color: string = "blue"

    // template strings
    let fullName: string = `Bob Bobbington`
    let age: number = 37
    let sentence: string = `Hello, my name is ${ name }.`
    
    // -- Array --
    let listArraySyntax: number[] = [1, 2, 3];
    let listTypeSyntax: Array<number> = [1, 2, 3];
    
    // -- Tuple --
    let x: [string, number];
    x = ['hello', 10]; // OK
    x = [10, 'hello']; // Error
    
    console.log(x[0].substr(1)); // OK
    console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
    
    // When accessing an element outside the set of known indices, a union type is used instead
    x[3] = 'world'; // OK, string can be assigned to (string | number)
    console.log(x[5].toString()); // OK, 'string' and 'number' both have toString
    x[6] = true; // Error, boolean isn't (string | number)
    
    // -- Enum -- 
    enum Color {Red, Green, Blue}
    let c: Color = Color.Green;
    
    enum Color2 {Red = 1, Green, Blue}
    let c2: Color2 = Color2.Green;
    
    enum Color3 {Red = 1, Green = 2, Blue = 4}
    let c3: Color3 = Color3.Green;
    
    enum Color4 {Red = 1, Green, Blue}
    let colorName: string = Color4[2]
    alert(colorName)
    
    // -- Any --
    let notSure: any = 4;
    notSure = "maybe a string instead";
    notSure = false; // okay, definitely a boolean
    
    var u = undefined;
    var n = null;
    
    // -- Void --
    function warnUser(): void {
        alert("This is my warning message");
    }
    
    // -- Type assertions --
    let someValue: any = "this is a string";
    let strLength: number = (<string>someValue).length;
    
    let someValue: any = "this is a string";
    let strLength: number = (someValue as string).length;
    
    // assertion is not casting
    let num:number = 1;
    let str:any = '1';
    alert(<number>str + num); // result is not 2
}