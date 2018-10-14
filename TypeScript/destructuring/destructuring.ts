// --- Destructuring --- 

// -- Array Destructing --

{
  let input           = [1, 2];
  let [first, second] = input;
  console.log(first); // outputs 1
  console.log(second); // outputs 2


  // swap variables
  [first, second] = [second, first];
}
// parameters to a function
{
  let input = [1, 2];

  function f([first, second]: [number, number]) {
    console.log(first);
    console.log(second);
  }

  f(input);
}

// remaining items 

{
  let [first, ...rest] = [1, 2, 3, 4];
  console.log(first); // outputs 1
  console.log(rest); // outputs [ 2, 3, 4 ]
}

{
  // ignore trailing elements

  let [first] = [1, 2, 3, 4];
  console.log(first); // outputs 1

  // ignore other elements`

  let [, second, , fourth] = [1, 2, 3, 4];
}

// -- Object destructuring --
{
  let o      = {
    a: "foo",
    b: 12,
    c: "bar"
  }
  let {a, b} = o;
}

let defaults = {food: "spicy", price: "$$", ambiance: "noisy"};
let search   = {food: "rich", ...defaults};
// Object spread also has a couple of other surprising limits.
// It only includes an objects’ own, enumerable properties.
// That means you lose methods when you spread instances of an object:

class CS {
  p = 12;

  m() {
  }
}

let c     = new CS();
let clone = {...c};
clone.p; // ok
clone.m(); // error!

// Property renaming
{
  let {a: newName1, b: newName2} = o;
}
// Typescript compiler doesn’t allow spreads of type parameters from generic functions.


// Default values
{
  function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let {a, b = 1001} = wholeObject;
  }
}

// -- Function declarations --

{
  type C = { a: string, b?: number }

  function f2({a, b}: C): void {
    // ...
  }

  function f3({a, b} = {a: "", b: 0}): void {
    // ...
  }

  f3(); // ok, default to {a: "", b: 0}

  function f4({a, b = 0} = {a: ""}): void {
    // ...
  }

  f4({a: "yes"}) // ok, default b = 0
  f4() // ok, default to {a: ""}, which then defaults b = 0
  f4({}) // error, 'a' is required if you supply an argument
}