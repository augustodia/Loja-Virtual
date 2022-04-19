<template>
  <div class="container page-product">
    <v-alert type="success" v-show="alertVisible" class="alert-added-cart" transition="scale-transition">
      Product added to cart
    </v-alert>
    <div class="product-info">
      <h1 class="product-title">{{product.title}}</h1>
      <div class="product-img">
        <img :src="product.image" alt="">
      </div>
      <div class="product-description">
        <h3>Description: </h3>
        <p>{{product.description}}</p>
      </div>
    </div>

    <div class="product-details">
      <div class="rating-product">
        <v-rating
          color="#f9a825"
          background-color="#757575"
          class="rating"
          empty-icon="mdi-star-outline"
          full-icon="mdi-star"
          half-icon="mdi-star-half-full"
          half-increments
          length="5"
          readonly
          size="18"
          :value="rateProduct"
        ></v-rating>
        <span class="count-rate">({{countRateProduct}})</span>
      </div>

      <h2 class="product-price">{{priceFormated}}</h2>

      <div class="section-add-cart">
        <button class="button-cart" @click="qtdProduct <= 1 ? undefined: qtdProduct--"><v-icon>mdi-minus</v-icon></button>
        <v-text-field class="input-qtd-products" :dense="true" type="number" :hide-details="true" :hide-spin-buttons="true" outlined :full-width="true" v-model="qtdProduct"></v-text-field>
        <button class="button-cart" @click="qtdProduct++"><v-icon>mdi-plus</v-icon></button>
        <button class="button-cart add-cart" @click="addProductToCart()">ADD TO CART</button>
      </div>
    </div>
  </div>
</template>

<script>
import productMixin from '@/mixins/productMixin.js'
import { mapMutations } from 'vuex';
export default {
  mixins: [productMixin],
  data(){
    return {
      product: {},
      qtdProduct: 1,
      alertVisible: false
    }
  },
  methods: {
    ...mapMutations(['addToCart']),
    async getProduct(id) {
      try {
        let response  = await fetch(`https://fakestoreapi.com/products/${id}`);
        this.product = await response.json();
      } catch (error) {
        console.log(error)
      }
    },
    addProductToCart() {
      this.alertVisible = true;
      setTimeout(() => this.alertVisible = false, 2000)
      this.addToCart({product: this.product, qtd: this.qtdProduct})
    }
  },
  computed: {
    rateProduct(){
      if(this.product.rating)
        return this.product.rating.rate
      return 0
    },
    countRateProduct() {
      if(this.product.rating)
        return this.product.rating.count
      return 0
    }
  },
  created() {
    if(this.$route.query.id)
      this.getProduct(this.$route.query.id)
  }
}
</script>

<style scoped>
  .page-product {
    margin-top: 64px;
    display: flex;
  }
  .product-info {
    max-width: 700px;
  }
  .product-img {
    margin-top: 64px;
    max-width: 100%;

  }
  .product-description {
    margin-top: 64px;
    max-width: 100%;
    font-size: 16px;
    line-height: 1.75;
  }
  .product-details {
    margin-left: 128px;
  }
  .product-price {
    margin-top: 64px;
    font-size: 50px;
    color: #0033C6;
  }
  .rating-product {
    display: flex;
    align-items: center;
  }
  .count-rate {
    font-size: 14px;
  }
  .section-add-cart {
    display: flex;
    margin-top: 64px;
    align-items: flex-end;
  }
  .button-cart {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-size: 18px;
    background-color: green;
    border-radius: 4px;
    height:40px;
    color: #fff;
  }
  .input-qtd-products {
    width: 60px;
    flex: none;
    margin: 0 8px !important;
  }
  .input-qtd-products input{
    text-align: center;
  }

  .button-cart.add-cart {
    margin-left: 12px;
    padding: 32px 64px;
    background-color: #0033C6;
    transition: all 0.5s;
  }
  .button-cart.add-cart:hover {
    background-color: #0053C6;
  }

  .alert-added-cart {
    position: absolute !important;
    right: 30px !important;
    background-color: #4CAF50 !important;
  }
  .alert-added-cart .v-icon {
    margin-right: 12px;
  }
</style>