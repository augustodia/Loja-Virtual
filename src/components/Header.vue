<template>
  <header id="header">
    <div class="container" >
      <div class="header-content" v-if="categories.length">
        <ul class="navigation">
          <li><router-link :to="{path: `/`}" href="">HOME</router-link></li>
          <li v-for="(category, index) in categories" :key="index"><router-link :to="{path: `/categories/${category}`}" href="">{{category.toUpperCase()}}</router-link></li>
        </ul>

        <v-text-field class="busca" outlined :hide-details="true" height="10px" :dense="true" :full-width="false" placeholder="Search product..." width="50px" @keyup.enter.stop="search()" v-model="querySearch">
          <template v-slot:append>        
            <v-icon @click.stop="search()" color="green"> mdi-magnify </v-icon> 
          </template>
        </v-text-field>
        
        <div class="cart" >
          <v-icon @click="toggleCart" ref="iconCart">mdi-cart-outline</v-icon>
          <div class="qtd-products">{{qtdProductsToCart}}</div>
          <v-card
            class="cart-items"
            max-width="400"
            tile
            v-show="openCart"
            @click="() => {}"
            :ripple="false"
            ref="cart"
          >
            <v-list-item three-line v-for="(product, index) in productsToCart" :key="product.id+''+index">
              <v-list-item-content>
                <v-list-item-title>{{product.title}}</v-list-item-title>
                <v-list-item-subtitle>
                  Qtd: {{product.qtdCart}}   -- Total: {{priceProductTotalFormated(product)}}
                  <div class="section-qtd-product">
                    <button class="button-cart" @click="removeProductCart(product)"><v-icon>mdi-minus</v-icon></button>
                    <p class="qtd-product">{{product.qtdCart}}</p>
                    <button class="button-cart" @click="addToCart({product: product, qtd: 1})"><v-icon>mdi-plus</v-icon></button>
                  </div>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <h4 class="total-cart">Total {{totalPriceCart}}</h4>
          </v-card>
        </div>
      </div>

      <v-skeleton-loader
        v-else
        style="display: flex"
        max-width="100%"
        type="sentences, heading"
        :loading="true"
      />
    </div>
    
  </header>
  
  
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      categories: [],
      querySearch: '',
      openCart: false
    }
  },
  methods: {
    ...mapMutations(['addToCart', 'removeToCart']),
    search() {
      if(this.querySearch) {
        this.$router.push(`/search?query=${this.querySearch}`)
      }
    },
    priceProductTotalFormated(product) {
      return `$ ${(product.price * product.qtdCart).toLocaleString('en-US', {currency: 'USD', minimumFractionDigits: 2})}`
    },
    priceProductTotal(product) {
      return (product.price * product.qtdCart)
    },
    toggleCart(e) {
      if(e.target != this.$refs.cart.$el)
        this.openCart = !this.openCart
    },
    removeProductCart(product) {
      this.removeToCart(product)
    }
  },
  computed: {
    ...mapGetters(["qtdProductsToCart", "productsToCart", "handlerCart"]),
    totalPriceCart() {
      this.handlerCart;
      return `$ ${(this.productsToCart || []).reduce((acc, current) => {
        return acc += this.priceProductTotal(current)
      }, 0).toFixed(2).toLocaleString('en-US', {currency: 'USD', minimumFractionDigits: 2})}`
    }
  },
  async created(){
    try {
      let response = await fetch('https://fakestoreapi.com/products/categories');
      this.categories = await response.json();
    } catch (error) {
      console.log(error)
    }
      
  }
  
}
</script>

<style scoped>
  #header {
    /* display: flex; */
    background-color: #f1f1f1;
    padding: 32px 0;
    -webkit-box-shadow: 0px 0px 30px -9px rgba(130,130,130,1);
    -moz-box-shadow: 0px 0px 30px -9px rgba(130,130,130,1);
    box-shadow: 0px 0px 30px -9px rgba(130,130,130,1);
  }
  .header-content {
    display: flex;
    align-items:center;
    justify-content: space-between;
  }
  .navigation {
    font-weight: 500;
    display: flex;
  }
  .navigation li a {
    padding: 16px 16px;
    border-radius: 6px;
  }
  .navigation li a:hover {
    color: rgba(0,0,0,0.6);
    cursor: pointer;
  }

  .busca {
    /* margin: 0 64px !important; */
    max-width: 40%;
  }

  .cart {
    display: flex;
    cursor: pointer;
    position: relative;
  }
  .cart-items {
    position: absolute;
    right: 0px;
    top: 41px;
    width: 400px;
    max-height: 200px;
    overflow: auto;
  }

  .section-qtd-product {
    display: flex;
    align-items: center;
    margin: 12px 0!important;
  }
  .button-cart {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-size: 18px;
    background-color: green;
    border-radius: 4px;
    height:10px;
    color: #fff;
  }

  .button-cart .v-icon{
    width: 1px
  }
  .input-qtd-products {
    width: 10px;
    height: 5px;
    flex: none;
  }
  .input-qtd-products input{
    text-align: center;
  }

  .qtd-product {
    font-size: 16px;
    margin: 0 12px;
  }

  .total-cart {
    margin-left: 16px;
    margin-bottom: 8px;
  }
</style>