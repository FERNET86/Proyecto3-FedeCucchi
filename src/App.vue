<template>
  <div class="app">
    <HeaderBar />
    <router-view></router-view>
  </div>
</template>

<script>

import HeaderBar from './components/HeaderBar.vue';

export default {
  name: 'App',
  components: {
    HeaderBar,
  },
  
  data() {
    return {};
  },
};
</script>

<style scoped>

.app {
  background-image: url('https://www.futuremusic-es.com/wp-content/uploads/2016/03/HD_Vinyl_intro_750x400px.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  margin: 0 auto;
  padding: 20px;
}
</style>