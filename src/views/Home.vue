<template>
  <div id="home">
    <Banner/>
    <Products/>
  </div>
</template>

<script>
  import Banner from '../components/Banner.vue'
  import Products from '../components/Products.vue'
  export default {
    components: { Banner, Products}
  };
</script>

<style>

</style>