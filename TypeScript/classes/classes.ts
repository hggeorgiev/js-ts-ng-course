// -- Greeter Class --
{
    class Greeter {
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }
        
        greet() {
            return "Hello, " + this.greeting;
        }
    }

    let greeter = new Greeter("world");
}

// -- Inheritance --

{
    class Animal {
        name: string;
        constructor(theName: string) { this.name = theName; }
        move(distanceInMeters: number = 0) {
            console.log(`${this.name} moved ${distanceInMeters}m.`);
        }
    }

    class Snake extends Animal {
        constructor(name: string) { super(name); }
        move(distanceInMeters = 5) {
            console.log("Slithering...");
            super.move(distanceInMeters);
        }
    }

    class Horse extends Animal {
        constructor(name: string) { super(name); }
        move(distanceInMeters = 45) {
            console.log("Galloping...");
            super.move(distanceInMeters);
        }
    }

    let sam = new Snake("Sammy the Python");
    let tom: Animal = new Horse("Tommy the Palomino");

    sam.move();
    tom.move(34);
}

// -- Public, private, and protected modifiers --

// by default are public
{ 
    class Animal {
        public name: string;
        public constructor(theName: string) { this.name = theName; }
        public move(distanceInMeters: number) {
            console.log(`${this.name} moved ${distanceInMeters}m.`);
        }
    }
}

// private

{
    class Animal {
        private name: string;
        constructor(theName: string) { this.name = theName; }
    }

    new Animal("Cat").name; // Error: 'name' is private;
}

// Understanding private
// Private and protected members are an exception from structural typing.
// For two types to be considered compatible, if one of them has a private member, then the other must have a private member that originated in the same declaration.
// The same applies to protected members.

{
    class Animal {
        private name: string;
        constructor(theName: string) { this.name = theName; }
    }

    class Rhino extends Animal {
        constructor() { super("Rhino"); }
    }

    class Employee {
        private name: string;
        constructor(theName: string) { this.name = theName; }
    }

    let animal = new Animal("Goat");
    let rhino = new Rhino();
    let employee = new Employee("Bob");

    animal = rhino;
    animal = employee; // Error: Animal and Employee are not compatible
}

//  -- Parameter properties --

{
    class Animal {
        constructor(private name: string) { }
        move(distanceInMeters: number) {
            console.log(`${this.name} moved ${distanceInMeters}m.`);
        }
    }
}

// -- Accessors --
{
  let passcode = "secret passcode";

  class Employee {
    private _fullName: string;

    get fullName(): string {
      return this._fullName;
    }

    set fullName(newName: string) {
      if (passcode && passcode == "secret passcode") {
        this._fullName = newName;
      }
      else {
        console.log("Error: Unauthorized update of employee!");
      }
    }
  }

  let employee      = new Employee();
  employee.fullName = "Bob Smith";
  if (employee.fullName) {
    console.log(employee.fullName);
  }

}
// -- Static Properties --
{
  class Grid {
    static origin = {x: 0, y: 0};

    calculateDistanceFromOrigin(point: { x: number; y: number; }) {
      let xDist = (point.x - Grid.origin.x);
      let yDist = (point.y - Grid.origin.y);
      return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }

    constructor(public scale: number) {
    }
  }

  let grid1 = new Grid(1.0);  // 1x scale
  let grid2 = new Grid(5.0);  // 5x scale

  console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
  console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
}
// -- Readonly Properties
// Can be initialized only in the constructor or in their declaration
{
  class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;

    constructor(theName: string) {
      this.name = theName;
    }
  }

  let dad  = new Octopus("Man with the 8 strong legs");
  dad.name = "Man with the 3-piece suit"; // error! name is readonly.
}
// Shorthand way to use readonly in classes
{
  class Octopus {
    readonly numberOfLegs: number = 8;

    constructor(readonly name: string) {
    }
  }
}
// -- Abstract Classes --
// Unlike an interface, an abstract class may contain implementation details for its members.
{
  abstract class Animal {
    abstract makeSound(): void;

    move(): void {
      console.log('roaming the earth...');
    }
  }

  abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
      console.log("Department name: " + this.name);
    }

    abstract printMeeting(): void; // must be implemented in derived classes
  }

  class AccountingDepartment extends Department {

    constructor() {
      super("Accounting and Auditing"); // constructors in derived classes must call super()
    }

    printMeeting(): void {
      console.log("The Accounting Department meets each Monday at 10am.");
    }

    generateReports(): void {
      console.log("Generating accounting reports...");
    }
  }

  let department: Department; // ok to create a reference to an abstract type
  department = new Department(); // error: cannot create an instance of an abstract class
  department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
  department.printName();
  department.printMeeting();
  department.generateReports(); // error: method doesn't exist on declared abstract type
}
// -- Constructor functions --

{
  class Greeter {
    static standardGreeting = "Hello, there";
           greeting: string;
    greet() {
      if (this.greeting) {
        return "Hello, " + this.greeting;
      }
      else {
        return Greeter.standardGreeting;
      }
    }
  }

  let greeter1: Greeter;
  greeter1 = new Greeter();
  console.log(greeter1.greet());

  let greeterMaker: typeof Greeter = Greeter;
  greeterMaker.standardGreeting = "Hey there!";

  let greeter2: Greeter = new greeterMaker();
  console.log(greeter2.greet());
}

// -- Using a class as an interface --

{
  class Point {
    x: number;
    y: number;
  }

  interface Point3d extends Point {
    z: number;
  }

  let point3d: Point3d = {x: 1, y: 2, z: 3};
}
