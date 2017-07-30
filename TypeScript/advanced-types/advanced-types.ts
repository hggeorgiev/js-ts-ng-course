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
    run() { return 'Horse runs' }
}

class Rabbit {
    jump() { return 'Rabbit jumps' }
}

function makeAct( animal: Horse | Rabbit) {
    if( animal instanceof Horse ) {
        console.log( animal.run );
    } else {
        console.log( animal.jump() );   
    }
}

// -- Intersection Types --

type A = {name: string, age: number}
type B = {birthDate: Date}

let person: A & B = {name: 'Todor', age:42, birthDate: new Date('1973-01-28')};
document.write( 'Name: ' + person.name + '<br/>' );
document.write( 'Age: ' + person.age + '<br/>' );
document.write( 'Birth Date: ' + person.birthDate + '<br/>' );


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

// -- String Literal Types --

type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
        // ...
    }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here

// -- Polymorphic this types --

// setup

class BasicCalculator {
    public constructor(protected value: number = 0) { }
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