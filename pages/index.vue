<template>
  <div class="cities">
    <City />
  </div>
</template>

<script>
import City from "~/components/City"

export default {
  components: {
    City
  }
}
</script>

<style>
.cities {
  display: flex;
  justify-content: center;
}
</style>
