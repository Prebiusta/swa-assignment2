import Vue from 'vue'
import Vuex from 'vuex'
import {data} from "@/store/modules/data.module";
import {forecast} from "@/store/modules/forecast.module";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    data,
    forecast
  }
})
