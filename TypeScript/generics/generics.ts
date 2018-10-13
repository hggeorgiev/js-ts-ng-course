// The way to avoid 'any'
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");  // type of output will be 'string'

// -- Working with Generic Type Variables --
{
  function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);  // Error: T doesn't have .length
    return arg;
  }

  function loggingIdentity2<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
  }
}
// -- Generic Types --
{
  let myIdentity: <T>(arg: T) => T    = identity;
  let myIdentity2: <U>(arg: U) => U   = identity;
  let myIdentity3: { <T>(arg: T): T } = identity; //  call signature of an object

  interface GenericIdentityFn<T> {
    (arg: T): T;
  }

  function identity4<T>(arg: T): T {
    return arg;
  }

  let myIdentity4: GenericIdentityFn<number> = identity;
}
// -- Generic Classes --
{
  class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
  }

  let myGenericNumber       = new GenericNumber<number>();
  myGenericNumber.zeroValue = 0;
  myGenericNumber.add       = function (x, y) {
    return x + y;
  };

}
// -- Generic Constraints --
{
  interface Lengthwise {
    length: number;
  }

  function loggingIdentity5<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
  }

  loggingIdentity5(3);  // Error, number doesn't have a .length property

// Using type parameters in generic constrains
  function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }

  let xg = {a: 1, b: 2, c: 3, d: 4};

  getProperty(xg, "a"); // okay
  getProperty(xg, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
}

{

  class BeeKeeper {
    hasMask: boolean;
  }

  class ZooKeeper {
    nametag: string;
  }

  class Animal {
    numLegs: number;
  }

  class Bee1 extends Animal {
    keeper: BeeKeeper;
  }

  class Lion1 extends Animal {
    keeper: ZooKeeper;
  }

  function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
  }

  createInstance(Lion1); // ok
  createInstance(Bee1);   // ok
  createInstance(ZooKeeper); // error: Type not compatible with the generic function signature
}