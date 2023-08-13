<script setup>
import { storeToRefs } from 'pinia';

import { useMainStore } from '@/stores/main-store';

import WeatherCard from '@/components/WeatherCard.vue';
import AppHeader from '@/components/AppHeader.vue';

const store = useMainStore();

const { cities } = storeToRefs(store);
</script>

<template>
  <div>
    <app-header :store="store"/>
    <div class="cards">
      <weather-card v-for="city in cities" :key="city.id" :city="city"/>
    </div>
  </div>
</template>
