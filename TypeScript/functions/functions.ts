// -- Function Types --

// Writing the function type

{
    let myAdd: (x: number, y: number) => number =
        function(x: number, y: number): number { return x+y; };
}    

// Inferring the types

{
    // myAdd has the full function type
    let myAdd = function(x: number, y: number): number { return  x + y; };
}

// -- Optional and Default Parameters --

{
    function buildName(firstName: string, lastName: string) {
        return firstName + " " + lastName;
    }
    
    let result1 = buildName("Bob");                  // error, too few parameters
    let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
    let result3 = buildName("Bob", "Adams");         // ah, just right
}

{
    function buildName2(firstName: string, lastName?: string) {
        if (lastName)
            return firstName + " " + lastName;
        else
            return firstName;
    }

    let result1 = buildName2("Bob");                  // works correctly now
    let result2 = buildName2("Bob", "Adams", "Sr.");  // error, too many parameters
    let result3 = buildName2("Bob", "Adams");         // ah, just right
}

function buildName3(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}
{
    let result1 = buildName3("Bob");                  // works correctly now, returns "Bob Smith"
    let result2 = buildName3("Bob", undefined);       // still works, also returns "Bob Smith"
    let result3 = buildName3("Bob", "Adams", "Sr.");  // error, too many parameters
    let result4 = buildName3("Bob", "Adams");         // ah, just right
}

// -- Rest Parameters --

function buildName4(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName4("Joseph", "Samuel", "Lucas", "MacKinzie");

// -- Lambdas and using this --

// issue
{
    class MultiplierCreator {
        constructor(private multiplier:number) {}
        
        create() {
            let that = this; // referring to the class
            return function(value: number) {
                console.log(this)
                return that.multiplier * value;
            }
        }
    }

    let multiCreator = new MultiplierCreator(100)
    let multi = multiCreator.create();
    document.write( '' + multi(2) );
}

// solution
{
    class MultiplierCreator {
        constructor(private mulitiplier:number) {}
        
        create() {
            return (value: number) => {
                console.log(this)
                return this.mulitiplier * value; //referring to the class
            }
        }
        
    }

    let multiCreator = new MultiplierCreator(100)
    let multi = multiCreator.create();
    document.write( '' + multi(2) );
}

// -- Overloads --

interface Person {
	id: number;
	name: string;
}

function findPerson(name: string): number
function findPerson(id: number): Person


function findPerson(data): number | Person {
	if( typeof data === 'number' ) {
		return {id: 1, name: 'George'}
	} else {
		return 1
	}
}



// Return type inferences
function findPerson(data:number | any): number | Person {
	if( typeof data === 'number' ) {
		return {id: 1, name: 'George'} as Person;
	} else {
		return 1
	}
}

let b:Person = findPerson('f');

console.log(typeof b)
