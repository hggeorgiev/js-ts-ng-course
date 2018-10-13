// -- Simple --
{
  interface LabelledValue {
    label: string;
    size?: number;
  }


// { label: string }

  function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
  }

  let myObj = {size: 10, label: "Size 10 Object"};
  printLabel(myObj);
}
// Only the shape that matters - if the requirements are met, it wll pass.
// The type-checker does not require that these properties come in any sort of order,
// only that the properties the interface requires are present and have the required type.


// -- Optional Properties --
{
  interface SquareConfig {
    color?: string;
    width?: number;
  }

  function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
      newSquare.color = config.color;
    }
    if (config.width) {
      newSquare.area = config.width * config.width;
    }
    return newSquare;
  }

  let mySquare = createSquare({color: "black"});

}
// -- Readonly --
{
  interface Point {
    readonly x: number;
    readonly y: number;
  }

  let p1: Point = {x: 10, y: 20};
  p1.x          = 5; // error!
}
// Readonly array
// Readonly is the 'const' for properties
{
  let a: number[]               = [1, 2, 3, 4];
  let ro: ReadonlyArray<number> = a;
  ro[0]                         = 12; // error!
  ro.push(5); // error!
  ro.length = 100; // error!
  a         = ro; // error!
}

// -- Excess Property Checks --
{
  let mySquare2 = createSquare({colour: "red", width: 100});

  interface SquareConfig {
    color?: string;
    width?: number;

    [propName: string]: any; //an alternative way to define extra 'unknown' values
  }
}
// -- Function Type --
{
  interface SearchFunc {
    (source: string, subString: string): boolean;
  }

  let mySearch: SearchFunc;
  mySearch = function (src: string, sub: string) { // parameter names may not match
    let result = src.search(sub);
    if (result == -1) {
      return false;
    }
    else {
      return true;
    }
  }
}
// -- Indexable Types --
{
  interface StringArray {
    [index: number]: string; //index can be only string or number
  }

  let myArray: StringArray;
  myArray = ["Bob", "Fred"];

  let myStr: string = myArray[0];

  class Animal {
    name: string;
  }

  class Shark extends Animal {
    breed: string;
  }


// Error: indexing with a numeric string might get you a completely separate type of Animal!
  interface NotOkay {
    [x: number]: Animal;

    [x: string]: Shark;
  }
}
// The right way
{
  interface NumberDictionary {
    [index: string]: number;

    length: number;    // ok, length is a number
    name: string;      // error, the type of 'name' is not a subtype of the indexer
  }
}

// Readonly indexing
{
  interface ReadonlyStringArray {
    readonly [index: number]: string;
  }

  let myArrayIndx: ReadonlyStringArray = ["Alice", "Bob"];
  myArrayIndx[2]                       = "Mallory"; // error!
}
// -- Class Types --
{
  {
    interface ClockInterface {
      currentTime: Date;
    }

    class Clock implements ClockInterface {
      currentTime: Date;

      constructor(h: number, m: number) {
      }
    }
  }
}
// Method is the interface
{
  interface ClockInterface {
    currentTime: Date;

    setTime(d: Date);
  }

  class Clock implements ClockInterface {
    currentTime: Date;

    setTime(d: Date) {
      this.currentTime = d;
    }

    constructor(h: number, m: number) {
    }
  }
}


// -- Difference between the static and instance sides of classes --
{
  interface ClockConstructor {
    new (hour: number, minute: number);
  }

  class Clock implements ClockConstructor {
    currentTime: Date;

    constructor(h: number, m: number) {
    }
  }
}

// solution

{
  interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
  }

  interface ClockInterface {
    tick();
  }

  function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
  }

  class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) {
    }

    tick() {
      console.log("beep beep");
    }
  }

  class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) {
    }

    tick() {
      console.log("tick tock");
    }
  }

  let digital = createClock(DigitalClock, 12, 17);
  let analog  = createClock(AnalogClock, 7, 32);
}

// -- Extending Interfaces --
{
  interface Shape {
    color: string;
  }

  interface PenStroke {
    penWidth: number;
  }

  interface Square extends Shape, PenStroke {
    sideLength: number;
  }

  let square        = <Square>{};
  square.color      = "blue";
  square.sideLength = 10;
  square.penWidth   = 5.0;
}
// -- Hybrid Types --
{
  interface Counter {
    (start: number): string;

    interval: number;

    reset(): void;
  }

  function getCounter(): Counter {
    let counter      = <Counter>function (start: number) {
    };
    counter.interval = 123;
    counter.reset    = function () {
    };
    return counter;
  }

  let c = getCounter();
  c(10);
  c.reset();
  c.interval = 5.0;
}
// -- Interfaces Extending Classes --
// Interfaces it inherits the members of the class, not implementation.
// Interfaces inherit even the private and protected members of a base class, making it bound to the class and its subclasses.
{

  class Control {
    private state: any;
  }

  interface SelectableControl extends Control {
    select(): void;
  }

  class Button extends Control implements SelectableControl {
    select() {
    }
  }

  class TextBox extends Control {
    select() {
    }
  }

// Error: Property 'state' is missing in type 'Image'.
  class Image implements SelectableControl {
    select() {
    }
  }

}