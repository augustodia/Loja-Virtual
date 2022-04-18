<template>
  <div id="home">
    <Products v-if="category" :routeApi="category"/>
  </div>
</template>

<script>
  import Products from '../components/Products.vue'
  export default {
    components: {Products},
    data() {
      return {
        category: ''
      }
    },
    watch: {
      '$route'(route) {
        if(route.params.category) {
          this.category = `/category/${route.params.category}`
        }
      }
    },
    created() {
      if(this.$route.params.category) {
        this.category = `/category/${this.$route.params.category}`
      }
    }
  };
</script>

<style>

</style>