// An object with a single `kind` property
// {kind: string}
type Kind<T extends string> = Record<'kind', T>

// {kind: '+', a: number, b: number}
type Sum = Kind<'+'> & Record<'a' | 'b', number>

// {kind: '*', multiplicand: number, multiplier: number}
type Multiplication = Kind<'*'> & Record<'multiplicand' | 'multiplier', number>

// {kind: 'sqrt', index: number}
type Sqrt = Kind<'sqrt'> & Record<'index', number>

// {kind: '/', dividend: number, divisor: number}
type Division = Kind<'/'> & Record<'dividend' | 'divisor', number>

// A union type of every supported math operation
type Operations = Sum | Multiplication | Sqrt | Division

// End result
// type Operations =   { kind: '+', a: number, b: number }                   |
//                     { kind: '*', multiplicand: number, multiplier: number } |
//                     { kind: 'sqrt', index: number }                         |
//                     { kind: '/', dividend: number, divisor: number }

// A function the computes a math operation
function compute(operation: Operations) {
    switch (operation.kind) {
        case '+':
            return operation.a + operation.b
        case '*':
            return operation.multiplicand * operation.multiplier
        case 'sqrt':
            return Math.sqrt(operation.index)
        case '/':
            return operation.dividend / operation.divisor
    }
}
