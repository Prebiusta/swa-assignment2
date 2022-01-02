<template>
  <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
  >
    <template v-slot:item.time="{ value }">
      {{new Date(value)}}
    </template>

    <template v-slot:item.value="{ item }">
      {{item.value + ' ' + item.unit}}
    </template>
  </v-data-table>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'DataValues',
  props: {
    items: {
      required: true,
      type: Array
    },
    loading: {
      required: true,
      type: Boolean
    }
  },
  computed: {
    headers: function () {
      return [
        {
          text: 'Type',
          value: 'type',
        },
        {
          text: 'Value',
          value: 'value',
        },
        {
          text: 'Time',
          value: 'time',
        },
      ]
    }
  },
  created() {
    this.fetchWeatherDataValues();
  },
  methods: {
    ...mapActions('data', [
      'fetchWeatherDataValues'
    ])
  }
}
</script>
