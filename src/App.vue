<script setup>
import weatherImg from '@/assets/weather.png';

import { ref } from 'vue';

import City from '@/components/City.vue';
import { useMainStore } from '@/stores/main-store';

const store = useMainStore();

const cityName = ref('');
const {onAdd} = store;

async function addCity() {
  await onAdd(cityName.value);
  cityName.value = '';
}
</script>

<template>
  <div>
    <header>
      <img class="header-image" :src="weatherImg" alt="">
      <p class="main-title">Weather App</p>
      <div class="add-city">
        <input type="text" v-model="cityName">
        <button type="button" class="btn btn-success" @click="addCity">Add City</button>
      </div>
    </header>
    <div class="cities">
      <City/>
    </div>
  </div>
</template>
