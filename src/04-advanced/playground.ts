// *************** TupleLength *************** //
type TupleLength<T> = T extends { length: infer Length } ? Length : never

type L1 = TupleLength<[any]>
type L2 = TupleLength<[any, any]>
type L3 = TupleLength<[any, any, any]>

// *************** TupleMaker *************** //
type TupleMaker<Size extends number, Tuple extends any[] = []> = TupleLength<Tuple> extends Size ? Tuple : TupleMaker<Size, [any, ...Tuple]>


type T1 = TupleMaker<1>
// T1 = TupleMaker<1, []> = Length<[]> extends 1 ? [] : TupleMaker<1, [any, ...[]]>
// T1 = TupleMaker<1, [any]> = Length<[any]> extends 1 ? [any] : TupleMaker<1, [any, ...[any]]>
// T1 = 1

type T2 = TupleMaker<2>
// T2 = TupleMaker<2, []> = Length<[]> extends 2 ? [] : TupleMaker<2, [any, ...[]]>
// T2 = TupleMaker<2, [any]> = Length<[any]> extends 2 ? [any] : TupleMaker<2, [any, ...[any]]>
// T2 = TupleMaker<2, [any, any]> = Length<[any, any]> extends 2 ? [any, any] : TupleMaker<2, [any, ...[any, any]]>
// T2 = 2

type T3 = TupleMaker<3>
// T3 = TupleMaker<3, []> = Length<[]> extends 3 ? [] : TupleMaker<3, [any, ...[]]>
// T3 = TupleMaker<3, [any]> = Length<[any]> extends 3 ? [any] : TupleMaker<3, [any, ...[any]]>
// T3 = TupleMaker<3, [any, any]> = Length<[any, any]> extends 3 ? [any, any] : TupleMaker<3, [any, ...[any, any]]>
// T3 = TupleMaker<3, [any, any]> = Length<[any, any]> extends 3 ? [any, any] : TupleMaker<3, [any, ...[any, any]]>
// T3 = TupleMaker<3, [any, any, any]> = Length<[any, any, any]> extends 3 ? [any, any] : TupleMaker<3, [any, ...[any, any, any]]>
// T3 = 3


// *************** Add *************** //
type Add<A extends number, B extends number> = TupleLength<[...TupleMaker<A>, ...TupleMaker<B>]>

type A2 = Add<1,1>
// A2 = TupleLength<[...[any], ...[any]]>
// A2 = TupleLength<[any, any]>
// A2 = 2

type A5 = Add<2,3>
// A5 = TupleLength<[...[any, any], ...[any, any, any]]>
// A5 = TupleLength<[any, any, any, any, any]>
// A5 = 5


// *************** Subtract *************** //
type Subtract<A extends number, B extends number> = TupleMaker<A> extends [...TupleMaker<B>, ...infer U] ? TupleLength<U> : never

type S1 = Subtract<3,2>
// S1 = TupleMaker<3> extends [...TupleMaker<2>, ...infer U] ? TupleLength<U> : never
// S1 = [any, any, any] extends [...[any, any], ...infer U] ? TupleLength<U> : never
// S1 = [any, any, any] extends [...[any, any], ...[any]] ? TupleLength<[any]> : never
// S1 = 1

type S2 = Subtract<4,2>
// S2 = TupleMaker<4> extends [...TupleMaker<2>, ...infer U] ? TupleLength<U> : never
// S2 = [any, any, any, any] extends [...[any, any], ...infer U] ? TupleLength<U> : never
// S2 = [any, any, any, any] extends [...[any, any], ...[any, any]] ? TupleLength<[any, any]> : never
// S2 = 2

// RangeCount
type RangeCount<Start extends number, End extends number> = Add<1, Subtract<End, Start>>

type RC1 = RangeCount<1, 1>
// RC1 = Add<1, Subtract<1,1>>
// RC1 = Add<1, 0>
// RC1 = 1

type RC2 = RangeCount<10, 11>
// RC2 = Add<1, Subtract<11, 10>>
// RC2 = Add<1, 1>
// RC2 = 2

type RC10 = RangeCount<10, 19>
// RC10 = Add<1, Subtract<19, 10>>
// RC10 = Add<1, 9>
// RC10 = 10

// ArrayValues
type TupleValues<T> = T extends { [P: number]: any } ? T[number] : never

type TV1 = TupleValues<[1]>
type TV2 = TupleValues<[1, 2]>
type TV3 = TupleValues<[18, 19, 20]>

// NumericRange
export type NumericRange<Start extends number, End extends number, Acc extends number[] = []> =
    TupleLength<Acc> extends RangeCount<Start, End> ?
    TupleValues<Acc> :
    NumericRange<Start, End, [Add<TupleLength<Acc>, Start>, ...Acc]>

type NR1 = NumericRange<2,4>
// RangeCount<2, 4> = 3
// Start = 2
// End = 4

// NR1 = TupleLength<[]> extends 3 ? TupleValues<[]> : NumericRange<2, 4, [Add<TupleLength<[]>, 2>, ...[]]>
// NR1 = TupleLength<[]> extends 3 ? TupleValues<[]> : NumericRange<2, 4, [Add<0, 2>, ...[]]>
// NR1 = TupleLength<[]> extends 3 ? never : NumericRange<2, 4, [2, ...[]]>
// NR1 = TupleLength<[]> extends 3 ? never : NumericRange<2, 4, [2]>
// NR1 = 0 extends 3 ? never : NumericRange<2, 4, [2]>

// NR1 = TupleLength<[2]> extends 3 ? TupleValues<[2]> : NumericRange<2, 4, [Add<TupleLength<[2]>, 2>, ...[2]]>
// NR1 = TupleLength<[2]> extends 3 ? TupleValues<[2]> : NumericRange<2, 4, [Add<1, 2>, ...[2]]>
// NR1 = TupleLength<[2]> extends 3 ? 2 : NumericRange<2, 4, [3, ...[2]]>
// NR1 = TupleLength<[2]> extends 3 ? 2 : NumericRange<2, 4, [3, 2]>
// NR1 = 1 extends 3 ? 2 : NumericRange<2, 4, [3, 2]>


// NR1 = TupleLength<[3, 2]> extends 3 ? TupleValues<[3, 2]> : NumericRange<2, 4, [Add<TupleLength<[3, 2]>, 2>, ...[3, 2]]>
// NR1 = TupleLength<[3, 2]> extends 3 ? TupleValues<[3, 2]> : NumericRange<2, 4, [Add<2, 2>, ...[3, 2]]>
// NR1 = TupleLength<[3, 2]> extends 3 ? 3 | 2 : NumericRange<2, 4, [4, ...[3, 2]]>
// NR1 = TupleLength<[3, 2]> extends 3 ? 3 | 2 : NumericRange<2, 4, [4, 3, 2]]>
// NR1 = 2 extends 3 ? 3 | 2 : NumericRange<2, 4, [4, 3, 2]]>

// NR1 = TupleLength<[4, 3, 2]> extends 3 ? TupleValues<[4, 3, 2]> : NumericRange<2, 4, [Add<TupleLength<[4, 3, 2]>, 2>, ...[4, 3, 2]]>
// NR1 = TupleLength<[4, 3, 2]> extends 3 ? TupleValues<[4, 3, 2]> : NumericRange<2, 4, [Add<3, 2>, ...[4, 3, 2]]>
// NR1 = TupleLength<[4, 3, 2]> extends 3 ? 4 | 3 | 2 : NumericRange<2, 4, [5, ...[4, 3, 2]]>
// NR1 = TupleLength<[4, 3, 2]> extends 3 ? 4 | 3 | 2 : NumericRange<2, 4, [5, 4, 3, 2]>
// NR1 = 3 extends 3 ? 4 | 3 | 2 : NumericRange<2, 4, [5, 4, 3, 2]>

// NR1 = 4 | 3 | 2