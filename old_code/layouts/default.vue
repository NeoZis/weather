<template>
  <div>
    <header>
      <img class="header-image" src="/weather.png" alt="">
      <p class="main-title">Weather App</p>
      <div class="add-city">
        <input type="text" v-model="city">
        <button type="button" class="btn btn-success" @click="onAdd(city)">Add City</button>
      </div>
    </header>
    <nuxt />
  </div>
</template>

<script>
export default {
  data () {
    return{
      city: ''
    }
  },
  methods:{
    onAdd (city) {
      this.$store.dispatch('onAdd', city);
      this.city = '';
    }
  }
}
</script>

<style>
.header-image{
  width: 60px;
}
.main-title{
  font-size: 30px;
  font-family: 'Courier New', Courier, monospace;
}
header{
  height: 70px;
  width: 100vw;
  background-color: rgba(127, 182, 255, 0.979);
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.add-city{
  display: flex;
  align-items: center;
}
input{
  height: 50px;
  width: 400px;
  border-radius: 2%;
  font-size: 20px;
}
.btn{
  height: 50px;
}
</style>