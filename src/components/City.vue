<template>
  <div class="cities">
    <ul>
      <li v-for="city in cities" :key="city.id">
        <div class="city" :class="{ show_more: city.show }" @click="onActive(city.id)">
          <div class="info">
            <h2>{{ city.name }}</h2>
            <p v-if="!city.show" class="temp"> {{ city.main.temp }} &deg;C</p>
            <p v-if="!city.show" class="time"> Updated: {{ city.date }}</p>
            <p v-if="city.show">Temperature: {{ city.main.temp }} &deg;C<br>
              Pressure: {{ city.main.pressure }} hPa<br>
              Humidity: {{ city.main.humidity }} %<br>
              Weather now: {{ city.weather[0].description }}
            </p>
          </div>
          <div class="hidden-info" v-if="city.show">
            <p>Wind speed: {{ city.wind.speed }} meter/sec<br>
              Cloudiness: {{ city.clouds.all }} %</p>
          </div>
          <div class="icon">
            <div class="delete">
              <img :src="refreshImg" alt="refresh weather for city" @click.stop="onRefresh(city)">
              <img :src="cancelImg" alt="delete city" @click.stop="onDelete(city.id)">
            </div>
            <img class="weather-icon" :src=city.weather[0].icon alt="weather icon">
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import refreshImg from '@/assets/refresh.png';
import cancelImg from '@/assets/cancel.png';

import { storeToRefs } from 'pinia'

import { useMainStore } from '@/stores/main-store';

const store = useMainStore();

const { cities } = storeToRefs(store);
const { onActive, onRefresh, deleteCityById: onDelete } = store;
</script>