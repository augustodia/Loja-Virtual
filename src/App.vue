<template>
  <div class="div">
    <Header/>
    <Banner/>
    <Products/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Banners from './components/Banner.vue'
import Products from './components/Products.vue'

export default {
  components: {Header, Banners, Products}
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
  box-sizing: border-box;
}

img {
  max-width: 100%;
  width: 100%;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
  color: #0f0f0f;
}

.container {
  margin: 0 auto;
  max-width: 1440px;
}
</style>
