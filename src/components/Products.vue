<template>
<div class="container products-section">

  <div class="top-bar-products" data-app>
    <h2 class="title">{{titlePage}}</h2>
    <v-select filled :dense="true" label="Order by" height="10px" :hide-details="true" :items="itemsFilter" item-text="text" item-value="value" v-model="orderBy"></v-select>
  </div>
  <div class="products">
    <Product v-for="product in ordernedItems" :key="product.id" :product="product"/>
  </div>
</div>
</template>

<script>
import Product from './Product.vue'
import {functionsProductOrder} from '../utils/functionsOrder.js';
export default {
  props: {
    routeApi: {
      default: '',
      type: String,
    }
  },
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
      return this.orderItems(this.products, this.orderBy, functionsProductOrder);
    },
    titlePage() { 
      let category = this.$route.params.category;
      if(!this.routeApi)
        return 'All products'
      return category[0].toUpperCase() + category.substr(1);
    }
  },
  methods: {
    orderItems(items, orderBy, functionsOrder) {      
      return items.sort(functionsOrder[orderBy]);
    },
    async getProducts() {
      try {
        let response;
        if(!this.routeApi)
          response = await fetch(`https://fakestoreapi.com/products`);
        else
          response = await fetch(`https://fakestoreapi.com/products${this.routeApi}`);
        this.products = await response.json();
        if(!this.routeApi && this.$route.query.query) {
          this.products = this.products.filter(product => {
            return (product.title.toLowerCase().startsWith(this.$route.query.query.toLowerCase()) || product.category.toLowerCase().startsWith(this.$route.query.query.toLowerCase()))
            })
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  watch: {
    routeApi() {
      this.getProducts();
    },
    '$route.query'() {
      this.getProducts()
    }
  },
  async created() {
    await this.getProducts();
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* see notes below */
    grid-gap: 35px;
    justify-items: center;
  }

  .top-bar-products {
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