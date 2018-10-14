// -- Structural typing --
//  x is compatible with y if y has at least the same members as x.
{
  interface Named {
    name: string;
  }

  class Person {
    name: string;
  }

  let p: Named;
  //  OK, because of structural typing - We have the same number of properties, of the same name andof the same type.
  p = new Person();

  //In nominally-typed languages like C# or Java, the equivalent code would be an error
  //because the Person class does not explicitly describe itself as being an implementer of the Named interface.

}
// -- Comparing two functions --
// Parameter types
{
  let x = (a: number) => 0;
  let y = (b: number, s: string) => 0;

  y = x; // OK
  x = y; // Error
}
// Return types
{
  let x = () => ({name: "Alice"});
  let y = () => ({name: "Alice", location: "Seattle"});

  x = y; // OK
  y = x; // Error, because x() lacks a location property
}

// Optional parameters and rest parameters
{
  function invokeLater(args: any[], callback: (...args: any[]) => void) {
    /* ... Invoke callback with 'args' ... */
  }

// Unsound - invokeLater "might" provide any number of arguments
  invokeLater([1, 2], (x, y) => console.log(x + ", " + y));

// Confusing (x and y are actually required) and undiscoverable
  invokeLater([1, 2], (x?, y?) => console.log(x + ", " + y));

}
// -- Enums --

{
  enum Status { Ready, Waiting };

  enum Color { Red, Blue, Green };

  let status = Status.Ready;
  status     = Color.Green;  //error

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