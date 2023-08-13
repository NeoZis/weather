<script setup>
import refreshImg from '@/assets/refresh.png';
import cancelImg from '@/assets/cancel.png';

import { useMainStore } from '@/stores/main-store';
import { ref } from 'vue';

const props = defineProps(['city']);

const store = useMainStore();
const showExtraInfo = ref(false);
const loading = ref(false);

const { onRefresh, deleteCityById: onDelete } = store;

async function refreshInfo() {
  loading.value = true;
  await onRefresh(props.city.name);
  loading.value = false;
}

</script>

<template>
  <div class="weather-card" :class="['weather-card', { 'weather-card--loading': loading }]" @click="showExtraInfo = !showExtraInfo">
    <div class="weather-card__info">
      <h2>{{ city.name }}</h2>
      <template v-if="showExtraInfo">
        <div class="weather-card__extra-info">
          <span>Temperature: {{ city.dataWithUnits.temperature }}</span>
          <span>Pressure: {{ city.dataWithUnits.pressure }}</span>
          <span>Humidity: {{ city.dataWithUnits.humidity }}</span>
          <span>Weather now: {{ city.description }}</span>
          <span>Wind speed: {{ city.dataWithUnits.windSpeed }}</span>
          <span>Cloudiness: {{ city.dataWithUnits.clouds }}</span>
        </div>
      </template>
      <template v-else>
        <p class="weather-card__temperature">{{ city.dataWithUnits.temperature }}</p>
        <p class="weather-card__time">Updated at: {{ city.date }}</p>
      </template>
    </div>
    <div>
      <div class="weather-card__actions">
        <img :src="refreshImg" alt="refresh weather for city" @click.stop="refreshInfo">
        <img :src="cancelImg" alt="delete city" @click.stop="onDelete(city.id)">
      </div>
      <img class="weather-card__icon" :src=city.icon alt="weather icon">
    </div>
  </div>
</template>
