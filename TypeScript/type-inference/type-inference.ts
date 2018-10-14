// -- Basics --

let x1 = 3;

// -- Best common type --
// The best common type algorithm considers each candidate type, and picks the type that is compatible with all the other candidates.


  let x2 = [0, 1, null];

{
    class Animal {}
    class Rhino extends Animal {}
    class Elephant extends Animal {}
    class Snake extends Animal {}

    // no best common type
    let zoo1 = [new Rhino(), new Elephant(), new Snake()];
    
    // solution
    let zoo2: Animal[] = [new Rhino(), new Elephant(), new Snake()];
}

// -- Contextual Type --
// Type inference also works in “the other direction” in some cases in TypeScript.
// The contextual type algorithm works in:
// - Arguments to function calls,
// - Right hand sides of assignments
// - Type assertions
// - Members of object and array literals
// - Return statements.


window.onmousedown = function(mouseEvent) {
    console.log(mouseEvent.buton);  //<- Error
};
