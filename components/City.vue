'<template>
  <div class="cities">
    <ul>
      <li v-for="city in cities"
         :key="city.idCity">
        <div class="city" :class="{ show_more: city.show }" @click="onActive(city.idCity)">
          <div class="info">
            <h2>{{city.name}}</h2>
            <p v-if="!city.show" class="temp"> {{city.main.temp}} &deg;C</p>
            <p v-if="!city.show" class="time"> Обновлено: {{city.date}}</p>
            <p v-if="city.show">Temperature:  {{city.main.temp}} &deg;C<br>
              Pressure: {{city.main.pressure}} hPa<br>
              Humidity: {{city.main.humidity}} %<br>
              Weather now: {{city.weather[0].description}}
              </p>
          </div>
          <div class="hidden-info" v-if="city.show">
            <p>Wind speed: {{city.wind.speed}} meter/sec<br>
               Cloudiness: {{city.clouds.all}} %</p>
          </div>
          <div class="icon">
            <div class="delete">
              <img src="/refresh.png" alt="" @click.stop="onRefresh(city)">
              <img src="/cancel.png" alt="" @click.stop="onDelete(city.idCity)">
            </div>
            <img class="weather-icon" :src=city.weather[0].icon>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from "vuex"

export default {
    data () {
        return{
            show: false
        }
    },
    computed: mapState([
        "cities"]),
    methods:{
      onDelete(id){
        this.$store.dispatch('onDelete', id)
      },
      onActive(id){
        this.$store.dispatch('onActive', id)
      },
      onRefresh(obj){
        this.$store.dispatch('onRefresh', obj)
      }
    }
    
}
</script>

<style>
ul{
    list-style-type: none;
      display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  padding-left: 0px;
}
.city{
    width: 300px;
    height: 170px;
    background-color: rgba(127, 182, 255, 0.384);
    margin: 10px;
    display: flex;
    border: 1px solid black;
}
.info{
    width: 60%;
    margin: 5px;
}
.temp{
    font-size: 35px;
    font-weight: 600;
    padding: 10px;
}
.time{
  font-size: 10px;
  font-weight: 600;
}
.hidden-info{
    width: 40%;
    padding-top: 50px;
}
.show_more{
    width: 620px;
}
.weather-icon{
    margin-top: 25px;
}
.delete{
    width: 100px;
    height: 30px;
    margin-right: 10px;
    text-align: right;
}
.delete > img {
    width: 30%;
    opacity: 0.5;
}
.delete > img:hover {
    opacity: 1;
}
</style>