<template>
<div class="container products-section">

  <div class="top-bar-products" data-app>
    <h2 class="title">All Products</h2>
    <v-select filled :dense="true" label="Order by" height="10px" :hide-details="true" :items="itemsFilter" item-text="text"
  item-value="value"
  v-model="orderBy"></v-select>
  </div>
  <div class="products">
    <Product v-for="product in ordernedItems" :key="product.id" :product="product"/>
  </div>
</div>
</template>

<script>
import Product from './Product.vue'
export default {
  components: {Product},
  data() {
    return {
      products: [],
      orderBy: 'AZ',
      itemsFilter: [
        {
          text: 'A-Z',
          value: 'AZ',
        },
        {
          text: 'Z-A',
          value: 'ZA',
        },
        {
          text: 'Min. price',
          value: 'minPrice',
        },
        {
          text: 'Max. price',
          value: 'maxPrice',
        },
        {
          text: 'Best rated',
          value: 'bestRated',
        },
        {
          text: 'Worst rated',
          value: 'worstRated',
        },
      ],
    }
  },
  computed: {
    ordernedItems() {
      let functionsOrder = {
        AZ: (a, b) => {
          if(a.title > b.title)
            return 1;
          if(a.title < b.title)
            return -1;

          return 0;
        },
        ZA: (a, b) => {
          if(a.title < b.title)
            return 1;
          if(a.title > b.title)
            return -1;

          return 0;
        },
        minPrice: (a, b) => {
          if(a.price > b.price)
            return 1;
          if(a.price < b.price)
            return -1;

          return 0;
        },
        maxPrice: (a, b) => {
          if(a.price < b.price)
            return 1;
          if(a.price > b.price)
            return -1;

          return 0;
        },
        bestRated: (a, b) => {
          if(a.rating.rate < b.rating.rate)
            return 1;
          if(a.rating.rate > b.rating.rate)
            return -1;

          return 0;
        },
        worstRated: (a, b) => {
          if(a.rating.rate > b.rating.rate)
            return 1;
          if(a.rating.rate < b.rating.rate)
            return -1;

          return 0;
        },
      }
      
      return this.orderItems(this.products, this.orderBy, functionsOrder);
    }
  },
  methods: {
    orderItems(items, orderBy, functionsOrder) {
      // if(orderBy == 'maxPrice')
      //   return items.sort(functionsOrder[orderBy]).reverse();
      
      return items.sort(functionsOrder[orderBy]);
    },
  },
  watch: {
    orderBy(newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  },
  async created() {
    try {
      let response = await fetch('https://fakestoreapi.com/products');
      this.products = await response.json();
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped>
  .products-section {
    margin-top: 128px;
  }

  .products-section .title {
    margin-right: 32px;
    font-size: 32px;
  }
  .products {
    padding: 0 12px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* see notes below */
    grid-gap: 32px;
    justify-items: center;
  }

  .top-bar-products {
    padding:0 20px;
    margin-bottom: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .v-select {
    width: 200px;
    flex: none;
  }
</style>