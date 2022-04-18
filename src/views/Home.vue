<template>
  <div id="home">
    <Header/>
    <Banner/>
    <Products/>
  </div>
</template>

<script>
  import Header from '../components/Header.vue'
  import Banner from '../components/Banner.vue'
  import Products from '../components/Products.vue'
  export default {
    components: {Header, Banner, Products}
  };
</script>

<style>

</style>