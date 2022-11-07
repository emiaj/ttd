// Primitive types
let name: string = 'John'
let age: number = 44
let happy: boolean = true
let id: Symbol = Symbol('1234567')


// Class instances
let dob: Date = new Date(2000, 5, 20)

// Return types
function hello(name: string): string {
    return `Hello ${name}`
}
const msg: string = hello('Sarah')

// Contextual inference
const element = window.document.createElement('button')
element.onclick = function onclick(e: MouseEvent) {
    console.log(`button down: ${e.button}`)
    console.log(e.thing)
}


// Helper types
function getComplexThing() {
    return {
        a: 1, b: 'foo', c: true, nested: {
            e: 'zoeueu',
            f: 'ffff',
            h: [1, 2, 3, 4]
        }
    }
}

const complexThing = getComplexThing()

function doSomethingWithComplexThing(thing: {
    a: number, b: string, c: boolean, nested: {
        e: string,
        f: string,
        h: number[]
    }
}) {
    // TBD
}
doSomethingWithComplexThing(complexThing)

// Indexed access types

function doSomethingWithNestedThing(nested: {
    e: string,
    f: string,
    h: number[]
}) {
    // TBD
}
doSomethingWithNestedThing(complexThing.nested)