import { NumericRange } from './playground'
// 18 to 32
type ThermostatMinMax = number
// type ThermostatMinMax =  18 | 19 | 20 | 21 | 22 |
//                          23 | 24 | 25 | 26 | 27 |
//                          28 | 29 | 30 | 31 | 32
// type ThermostatMinMax = NumericRange<18, 32>


export function setThermostatValue(value: ThermostatMinMax) {
    // TBD
}


// error
setThermostatValue(180)


// ok
setThermostatValue(25)
