// Variable capturing
function f() {
  var a = 10;
  return function g() {
    var b = a + 1;
    return b;
  }
}

var g = f();
g(); // returns '11'

// In this above example, g captured the variable a declared in f.
// At any point that g gets called, the value of a will be tied to the value of a in f.
// Even if g is called once f is done running, it will be able to access and modify a
function f() {
  var a = 1;

  a = 2;
  var b = g();
  a = 3;

  return b;

  function g() {
    return a;
  }
}

f(); // returns '2'

// Variable scoping rules and quirks

function f(shouldInitialize: boolean) {
    if (shouldInitialize) {
        var x = 10;
    }

    return x;
}

document.write( '' + f(true) + '<br/>' );  // returns '10'
document.write( '' + f(false) ); // returns 'undefined'
// 'var' can be accessed outside of a block.

// In nested loops

function printMatrix() {
    for (var i = 0; i < 5; i++) {
        for (var i = 0; i < 5; i++) {
            document.write( i + ' ' )
        }
        document.write( '<br/>' )
    }
}
printMatrix()


// Variable capturing quirks

for (var i = 0; i < 10; i++) {
    setTimeout(function() {console.log(i); }, 100 * i);
}


// Block/Lexical scoping
// Unlike variables declared with var whose scopes leak out to their containing function,
// block-scoped variables are not visible outside of their nearest containing block or for-loop.

function f(input: boolean) {
  let a = 100;

  if (input) {
    // Still okay to reference 'a'
    let b = a + 1;
    return b;
  }

  // Error: 'b' doesn't exist here
  return b;
}
// 'let' cannot be accessed outside of the block

function foo() {
    // okay to capture 'a'
    return a;
}

// Illegal call 'foo' before 'a' is declared
foo();

let a;


// Re-declarations and shadowing
function f(x) {
  var x;
  var x;

  if (true) {
    var x;
  }
}
// You can re-declare a 'var' as many times as you wish.

let x = 10;
let x = 20; // error: can't re-declare 'x' in the same scope
// You cannot re-declare a 'let' in the same scope

// Shadowing
//The act of introducing a new name in a more nested scope is called shadowing.
// It is a bit of a double-edged sword in that it can introduce certain bugs on its own in the event of accidental shadowing,
// while also preventing certain bugs. For instance, imagine we had written our earlier sumMatrix function using let variables.

function sumMatrix(matrix: number[][]) {
  let sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    var currentRow = matrix[i];
    for (let i = 0; i < currentRow.length; i++) {
      sum += currentRow[i];
    }
  }

  return sum;
}
// Block-scoped 'let' works as expected.

// Variable capturing (capturing 'let')
function theCityThatAlwaysSleeps() {
  let getCity;

  if (true) {
    let city = "Seattle";
    getCity = function() {
      return city;
    }
  }

  return getCity();
}

// Works without IIFE because let is executed only in the block
// The TypeScript compiler automatically adds an IIFE when transpiling to JS
for (let i = 0; i < 10 ; i++) {
  setTimeout(function() { console.log(i); }, 100 * i);
}


// Const
const numLivesForCat = 9;
const kitty = {
  name: "Aurora",
  numLives: numLivesForCat,
}

// Error
kitty = {
  name: "Danielle",
  numLives: numLivesForCat
};

// all "okay"
kitty.name = "Rory";
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives--;
