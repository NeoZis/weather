<script setup>
import weatherImg from '@/assets/weather.png';

import AddCity from '@/components/AddCity.vue';
</script>

<template>
  <header class="app-header">
    <img class="app-header__image" :src="weatherImg" alt="header icon">
    <p class="app-header__title">Weather App</p>
    <add-city />
  </header>
</template>