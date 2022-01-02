<template>
  <CityWrapper
      :weather-data-values="valuesForCity($route.name)"
      :weather-data-values-loading="weatherDataValuesLoading"
      :forecast-values="forecastForCity($route.name)"
      :forecast-values-loading="forecastValuesLoading"
  />
</template>

<script>

import CityWrapper from "@/components/CityWrapper";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: "Copenhagen",
  components: {CityWrapper},
  computed: {
    ...mapGetters('data', [
      'valuesForCity',
    ]),
    ...mapGetters('forecast', [
      'forecastForCity'
    ]),
    ...mapState('data', [
      'weatherDataValuesLoading'
    ]),
    ...mapState('forecast', [
      'forecastValuesLoading'
    ])
  },
  methods: {
    ...mapActions('data', [
      'fetchWeatherDataValues'
    ]),
    ...mapActions('forecast', [
      'fetchForecastValues'
    ])
  },
  created() {
    this.fetchWeatherDataValues()
    this.fetchForecastValues()
  }
}
</script>

<style scoped>

</style>