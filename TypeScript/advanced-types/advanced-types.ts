// -- Union Types --
{
  function padLeft(value: string, padding: string | number) {
    // ...
  }

  let indentedString = padLeft("Hello world", true); // errors during compilation
}


interface Bird {
  fly();

  layEggs();
}

interface Fish {
  swim();

  layEggs();
}


function getSmallPet(): Fish | Bird {
  return null;
}

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim();    // errors

// -- Type Guards and Differentiating Types --
// User defined type gard
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}

// typeof type guards

function padLeft2(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${value}'.`);
}

// instanceof type guards

class Horse {
  run() {
    return 'Horse runs'
  }
}

class Rabbit {
  jump() {
    return 'Rabbit jumps'
  }
}

function makeAct(animal: Horse | Rabbit) {
  if (animal instanceof Horse) {
    console.log(animal.run);
  } else {
    console.log(animal.jump());
  }
}

// -- Intersection Types --

type A = { name: string, age: number }
type B = { birthDate: Date }

let person: A & B = {name: 'Hristo', age: 24, birthDate: new Date('1993-03-04')};
document.write('Name: ' + person.name + '<br/>');
document.write('Age: ' + person.age + '<br/>');
document.write('Birth Date: ' + person.birthDate + '<br/>');


// -- Type Aliases --

type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
type C = A & B;

// Generic Type Alias
type Container<T> = { value: T };

// interesing example
{
  type LinkedList<T> = T & { next: LinkedList<T> };

  interface Person {
    name: string;
  }

  var people: LinkedList<Person>;
  var s = people.name;
  var s = people.next.name;
  var s = people.next.next.name;
  var s = people.next.next.next.name;
}


// Unlike interfaces, tpe aliases cannot be extended or implemented from (nor can they extend/implement other types).
// Always prefer interfaces over type aliases

// -- String Literal Types --

type Easing = "ease-in" | "ease-out" | "ease-in-out";

class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    // ...
  }
}

// -- Numeric Literal Types --
function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
  return 1;
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here

// -- Polymorphic this types --

// setup

class BasicCalculator {
  public constructor(protected value: number = 0) {
  }

  public currentValue(): number {
    return this.value;
  }

  public add(operand: number): this {
    this.value += operand;
    return this;
  }

  public multiply(operand: number): this {
    this.value *= operand;
    return this;
  }

  // ... other operations go here ...
}

let bc = new BasicCalculator(2)
  .multiply(5)
  .add(1)
  .currentValue();

// extend

class ScientificCalculator extends BasicCalculator {
  public constructor(value = 0) {
    super(value);
  }

  public sin() {
    this.value = Math.sin(this.value);
    return this;
  }

  // ... other operations go here ...
}

let sc = new ScientificCalculator(2)
  .multiply(5)
  .sin()
  .add(1)
  .currentValue();

// -- Indexable types --
{
  //keyof - Index type query operator
  // Getting array keys
  function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n]);
  }

  interface Person {
    name: string;
    age: number;
  }

  let person: Person = {
    name: 'Jarid',
    age: 35
  };

  let strings: string[] = pluck(person, ['name'],); // ok, string[], and name is a keyof Person

  // Getting a property
  function GetProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]; // o[name] is of type T[K]
  }

  // In getProperty, o: T and name: K, so that means o[name]: T[K]. Once you return the T[K] result, the compiler will instantiate the actual type of the key, so the return type of getProperty will vary according to which property you request.

  let name: string = GetProperty(person, 'name');
  let age: number  = GetProperty(person, 'age');
  let unknown      = GetProperty(person, 'unknown'); // error, 'unknown' is not in 'name' | 'age'


  //The compiler checks that name is actually a property on Person.
  // For any type T, keyof T is the union of known, public property names of T;

  let personProps: keyof Person; // 'name' | 'age'
}

// -- Mapped Types --

// Transformning types
{
  // Basic implementation
  interface Person {
    name: string;
    age: number;
  }

  // Optional
  interface PersonPartial {
    name?: string;
    age?: number;
  }

  // Readonly
  interface PersonReadonly {
    readonly name: string;
    readonly age: number;
  }

// TypeScript provides a way to create new types based on old types — mapped types.
// In a mapped type, the new type transforms each property in the old type in the same way.
// For example, you can make all properties of a type readonly or optional. H

  type Readonly<T> = {
    readonly [P in keyof T]: T[P];
    }
  type Partial<T> = {
    [P in keyof T]?: T[P];
    }


  type PartialPerson = Partial<Person>;
  type ReadonlyPerson = Readonly<Person>;
}

// Pick and Record
{
  type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
    }
  type Record<K extends string, T> = {
    [P in K]: T;
    }
}

// -- Conditional Types --
{
  declare function ft<T extends boolean>(x: T): T extends true ? string : number;

// Type is 'string | number
  let x = f(Math.random() < 0.5)

}

// TypeName type
type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "function" :
  "object";

type T0 = TypeName<string>;  // "string"
type T1 = TypeName<"a">;  // "string"
type T2 = TypeName<true>;  // "boolean"
type T3 = TypeName<() => void>;  // "function"
type T4 = TypeName<string[]>;  // "object"

// Type not resolving tocondition
interface Foo {
  propA: boolean;
  propB: boolean;
}

declare function f<T>(x: T): T extends Foo ? string : number;

function foo<U>(x: U) {
  // Has type 'U extends Foo ? string : number'
  let a = f(x);

  // This assignment is allowed though!
  let b: string | number = a;
}

// Built-in conditional types

// Exclude<T, U> – Exclude from T those types that are assignable to U.
// Extract<T, U> – Extract from T those types that are assignable to U.
// NonNullable<T> – Exclude null and undefined from T.
// ReturnType<T> – Obtain the return type of a function type.
// InstanceType<T> – Obtain the instance type of a constructor function type.

type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"

type T02 = Exclude<string | number | (() => void), Function>;  // string | number
type T03 = Extract<string | number | (() => void), Function>;  // () => void

type T04 = NonNullable<string | number | undefined>;  // string | number
type T05 = NonNullable<(() => string) | string[] | null | undefined>;  // (() => string) | string[]

function f1(s: string) {
  return { a: 1, b: s };
}

class C {
  x = 0;
  y = 0;
}

type T10 = ReturnType<() => string>;  // string
type T11 = ReturnType<(s: string) => void>;  // void
type T12 = ReturnType<(<T>() => T)>;  // {}
type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
type T15 = ReturnType<any>;  // any
type T16 = ReturnType<never>;  // any
type T17 = ReturnType<string>;  // Error
type T18 = ReturnType<Function>;  // Error

type T20 = InstanceType<typeof C>;  // C
type T21 = InstanceType<any>;  // any
type T22 = InstanceType<never>;  // any
type T23 = InstanceType<string>;  // Error
type T24 = InstanceType<Function>;  // Error