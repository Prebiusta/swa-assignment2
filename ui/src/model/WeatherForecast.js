import {WeatherHistory} from "./WeatherHistory.js";
import {PRECIPITATION, TEMPERATURE, WIND} from "@/util/Constants.js";

export class WeatherForecast {
    constructor(weatherPredictions) {
        this.data = weatherPredictions || []
    }

    forPLace = (place) => new WeatherHistory(this.data.filter(entry => entry.getPlace() === place))

    forType = (type) => new WeatherHistory(this.data.filter(entry => entry.getType() === type))

    forPeriod = (timePeriod) => new WeatherHistory(this.data.filter(entry => timePeriod.contains(entry.getTime())))

    including = (newData) => new WeatherHistory([...this.data, ...newData])

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

    getAverageMinValue = () => {
        const sum = this.data.reduce((sum, prediction) => {
            return sum + prediction.getMin();
        }, 0);
        return sum / this.data.length
    }
    getAverageMaxValue = () => {
        const sum = this.data.reduce((sum, prediction) => {
            return sum + prediction.getMax();
        }, 0);
        return sum / this.data.length
    }

    getPredictions = () => this.data
}