<template>
  <Header></Header>
</template>

<script>
import Header from './components/Header.vue'

export default {
  components: {Header}
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
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
