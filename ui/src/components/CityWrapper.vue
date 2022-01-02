<template>
  <v-container>
    <v-card-title >
    </v-card-title>
    <v-tabs v-model="tab" grow show-arrows>
      <v-tab
          v-for="item in items"
          :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item
          key="All Data"
      >
        <DataValues
            :items="weatherDataValues"
            :loading="weatherDataValuesLoading"
        />
      </v-tab-item>

      <v-tab-item
          key="Min Temp (5 days)"
      >
        <div class="text-center my-5">
          <span>Min Temp {{minTemp.value}} {{minTemp.unit}}</span>
        </div>
      </v-tab-item>

      <v-tab-item
          key="Max Temp (5 days)"
      >
        <div class="text-center my-5">
          <span>Max Temp {{maxTemp.value}} {{maxTemp.unit}}</span>
        </div>
      </v-tab-item>

      <v-tab-item
          key="Total precipitation (5 days)"
      >
        <div class="text-center my-5">
          {{ 'Total Precipitation ' + Math.round(totalPrecipitation) + ' mm' }}
        </div>
      </v-tab-item>

      <v-tab-item
          key="Average Wind (5 days)"
      >
        <div class="text-center my-5">
          {{ 'Average Wind ' + Math.round(averageWind) + ' m/s' }}
        </div>
      </v-tab-item>

      <v-tab-item
          key="Hourly predictions (24 hrs)"
          class="text-left"
      >
        <v-treeview :items="getPredictionsTree"></v-treeview>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import DataValues from "@/components/DataValues";
import {CLOUD_COVERAGE, PRECIPITATION, TEMPERATURE, WIND} from "@/util/Constants";

export default {
  name: "CityWrapper",
  components: {DataValues},
  data: () => ({
    treeView: null,
    tab: null,
    text: "asdasda",
    items: [
      'All Data',
      'Min Temp (5 days)',
      'Max Temp (5 days)',
      'Total precipitation (5 days)',
      'Average Wind (5 days)',
      'Hourly predictions (24 hrs)'
    ]
  }),
  computed: {
    minTemp: {
      get() {
        return this.weatherDataValues
            .filter(data => new Date(data.time) > this.getDaysAgo(5))
            .filter(data => data.type === TEMPERATURE)
            .reduce((min, current) => {
              if (current.value < min.value)
                min = {...current}
              return min;
            }, {value: 9999})
      }
    },
    maxTemp: function () {
      return this.weatherDataValues
          .filter(data => new Date(data.time) > this.getDaysAgo(5))
          .filter(data => data.type === TEMPERATURE)
          .reduce((max, current) => {
            if (current.value > max.value)
              max = {...current}
            return max;
          }, {value: -9999})
    },
    totalPrecipitation: function () {
      return this.weatherDataValues
          .filter(data => data.type === PRECIPITATION)
          .reduce((sum, current) => {
            return sum + current.value;
          }, 0)
    },
    averageWind: function () {
      const sum = this.weatherDataValues
          .filter(data => data.type === WIND)
          .reduce((sum, current) => {
            return sum + current.value;
          }, 0)
      return sum / this.weatherDataValues.filter(data => data.type === WIND).length
    },
    lowestValue: function () {
      return this.weatherDataValues.reduce((accumulator, current) => {
        accumulator.types.add(current.type)
        if (accumulator.size !== 1)
          accumulator.value = undefined
        else if (current.value < accumulator.value)
          accumulator.value = current.value
        return accumulator
      }, {types: new Set(), value: 9999}).value
    },
    getPredictions() {
      const upcomingForecast = this.forecastValues
          .filter(forecast =>
              new Date(forecast.time) > new Date()
              && new Date(forecast.time) < this.getDaysAgo(-1)
          )
      return upcomingForecast.reduce((acc, forecast) => {
        const hour = new Date(forecast.time).getHours();
        if (!acc[forecast.type])
          acc[forecast.type] = {}
        acc[forecast.type][hour] = forecast
        return acc;
      }, {})
    },
    getPredictionsTree() {
      const predictions = this.getPredictions;
      const tree = Object.entries(predictions).map(([type, predictions]) => {
        return {
          id: type,
          name: type,
          children: this.getPredictionsFromObject(predictions)
        }
      })
      return tree;
    }
  },
  props: {
    weatherDataValues: {
      required: true,
      type: Array
    },
    weatherDataValuesLoading: {
      required: true,
      type: Boolean
    },
    forecastValues: {
      required: true,
      type: Array
    },
    forecastValuesLoading: {
      required: true,
      type: Boolean
    },
  },
  methods: {
    getPredictionsFromObject(predictions) {
      return Object.entries(predictions).map(([time, prediction]) => {
        return {
          id: prediction.time,
          name: `${time}:00`,
          children: [{name: this.getPredictionString(prediction)}]
        }
      })
    },
    getPredictionString(prediction) {
      let defaultString = `Date: ${new Date(prediction.time)}\n`
      switch (prediction.type) {
        case TEMPERATURE:
          return `${defaultString}Value: ${prediction.from + ' ' + prediction.unit} - ${prediction.to + ' ' + prediction.unit}`
        case PRECIPITATION:
          return `${defaultString}Value: ${prediction.from + ' ' + prediction.unit} - ${prediction.to + ' ' + prediction.unit}\nPredicted Types: ${prediction.precipitation_types.join(', ')}`
        case WIND:
          return `${defaultString}Value: ${prediction.from + ' ' + prediction.unit} - ${prediction.to + ' ' + prediction.unit}\nPredicted Directions: ${prediction.directions.join(', ')}`
        case CLOUD_COVERAGE:
          return `${defaultString}Value: ${prediction.from + ' ' + prediction.unit} - ${prediction.to + ' ' + prediction.unit}\n`
      }
    },
    getDaysAgo(amount) {
      const now = new Date();
      now.setDate(now.getDate() - amount);
      return now;
    }
  }
}
</script>

<style scoped>

</style>

<style>
.v-treeview-node__label {
  white-space: pre-wrap !important;
}
</style>