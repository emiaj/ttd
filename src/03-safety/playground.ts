// strict null checking
let hello: string;

hello = 'hello world';
hello = null;
hello = undefined;



// null references
console.log(
    [hello].find(w => w === 'hello friends').toUpperCase()
)


// strict property initialisation
class Person {
    name: string
}

const person = new Person();
console.log(
    person.name.toUpperCase()
);


// strictFunctionTypes
// strict bind, call and apply

function sum(a: number, b: number): number {
    return a + b;
}

// too few args
let a = sum.call(undefined, 1);
a = sum.bind(undefined)(1);
a = sum.apply(undefined, [1]);

// invalid arg type
let b = sum.call(undefined, 1, 'foo');
b = sum.bind(undefined)(1, 'foo');
b = sum.apply(undefined, [1, 'foo']);

// too many args
let c = sum.call(undefined, 1, 2, 3);
c = sum.bind(undefined)(1, 2, 3);
c = sum.apply(undefined, [1, 2, 3]);

// ok
let d = sum.call(undefined, 1, 2);
d = sum.bind(undefined)(1, 2);
d = sum.apply(undefined, [1, 2]);