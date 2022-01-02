import {PRECIPITATION, TEMPERATURE, WIND} from "@/util/Constants.js";

export class WeatherHistory {
    constructor(weatherDataList) {
        this.data = weatherDataList || []
    }

    forPLace = (place) => new WeatherHistory(this.data.filter(entry => entry.getPlace() === place))

    forType = (type) => new WeatherHistory(this.data.filter(entry => entry.getType() === type))

    forPeriod = (timePeriod) => new WeatherHistory(this.data.filter(entry => timePeriod.contains(entry.getTime())))

    including = (newData) => new WeatherHistory([...this.data, ...newData])

    lowestValue = () => this.data.reduce((accumulator, current) => {
        accumulator.types.add(current.getType())
        if (accumulator.size !== 1)
            accumulator.value = undefined
        else if (current.getValue() < accumulator.value)
            accumulator.value = current.getValue()
        return accumulator
    }, {types: new Set(), value: 9999}).value

    convertToUSUnits = () => {
        this.data
            .filter(entry => entry.getType() === TEMPERATURE)
            .forEach(entry => entry.convertToF())

        this.data
            .filter(entry => entry.getType() === WIND)
            .forEach(entry => entry.convertToMPH())

        this.data
            .filter(entry => entry.getType() === PRECIPITATION)
            .forEach(entry => entry.convertToInches())
    }

    convertToInternationalUnits = () => {
        this.data
            .filter(entry => entry.getType() === TEMPERATURE)
            .forEach(entry => entry.convertToC())

        this.data
            .filter(entry => entry.getType() === WIND)
            .forEach(entry => entry.convertToMS())

        this.data
            .filter(entry => entry.getType() === PRECIPITATION)
            .forEach(entry => entry.convertToMM())
    }
}