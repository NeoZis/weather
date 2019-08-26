export default {
    GET_WEATHER (state, weather){
        weather.idCity = state.id;
        weather.show = false;
        weather.weather[0].icon = "http://www.openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png";
        weather.date = new Date().toLocaleString();
        state.cities.push(weather);
        ++state.id;
    },
    DELETE_CITY (state, id){
        const index = state.cities.findIndex(item => item.idCity === id);
        state.cities.splice(index, 1);
    },
    SHOW_CONTROL (state, id){
        const index = state.cities.findIndex(item => item.idCity === id);
        if(state.cities[index].show == false){
            state.cities[index].show = true;
        } else state.cities[index].show = false;
    },
    REFRESH_CITY (state, weather) {
        const index = state.cities.findIndex(item => item.idCity == weather.idCity);
        weather.weather[0].icon = "http://www.openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png";
        weather.date = new Date().toLocaleString();
        state.cities.splice(index, 1, weather);
    },
}