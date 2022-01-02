const state = {
    weatherDataValues: [],
    weatherDataValuesLoading: true,
}

const getters = {
    valuesForCity: state => city => state.weatherDataValues.filter(entry => entry.place === city) || [],
}

const actions = {
    async xmlWeatherDataValues({commit}) {
        const request = new XMLHttpRequest()
        request.open('GET', 'http://localhost:8080/data')
        request.setRequestHeader('Content-Type', 'application/json')
        request.setRequestHeader('Accept', 'application/json')
        request.send()
        request.onload = () => {
            commit("setWeatherDataValues", JSON.parse(request.responseText))
        }
    },
    async fetchWeatherDataValues({commit}) {
        fetch('http://localhost:8080/data')
            .then(r => r.json())
            .then((data) => commit("setWeatherDataValues", data))
    },
}

const mutations = {
    setWeatherDataValues(state, weatherDataValues) {
        state.weatherDataValues = weatherDataValues
        state.weatherDataValuesLoading = false
    },
}

export const data = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}

