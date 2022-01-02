const state = {
    forecastValues: [],
    forecastValuesLoading: true,
}

const getters = {
    forecastForCity: state => city => state.forecastValues.filter(entry => entry.place === city) || [],
}

const actions = {
    async xmlForecastValues({commit}) {
        const request = new XMLHttpRequest()
        request.open('GET', 'http://localhost:8080/forecast')
        request.setRequestHeader('Content-Type', 'application/json')
        request.setRequestHeader('Accept', 'application/json')
        request.send()
        request.onload = () => {
            commit("setForecastValues", JSON.parse(request.responseText))
        }
    },
    async fetchForecastValues({commit}) {
        fetch('http://localhost:8080/forecast')
            .then(r => r.json())
            .then((forecast) => commit("setForecastValues", forecast))
    },
}

const mutations = {
    setForecastValues(state, forecastValues) {
        state.forecastValues = forecastValues
        state.forecastValuesLoading = false
    },
}

export const forecast = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}

