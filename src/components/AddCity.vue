<script setup>
import { ref } from 'vue';
import { useMainStore } from '@/stores/main-store';

const store = useMainStore();

const cityName = ref('');
const { onAdd } = store;

async function addCity() {
  if (cityName.value) {
    await onAdd(cityName.value);
    cityName.value = '';
  } else {
    alert('Please type city');
  }
}
</script>

<template>
  <div class="add-city">
    <input class="add-city__input" type="text" v-model="cityName">
    <button class="add-city__btn" type="button" @click="addCity">Add City</button>
  </div>
</template>