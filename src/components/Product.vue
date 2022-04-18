<template>
  <div class="product">
    <img class="image" :src="product.image" alt="">
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
      :value="product.rating.rate"
    ></v-rating>
    <div class="info">
      <h3 class="title">{{titleFormated}}</h3>
      <span class="price">{{priceFormated}}</span>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },
  computed:{
    priceFormated() {
      return `$ ${this.product.price.toLocaleString('en-US', {currency: 'USD', minimumFractionDigits: 2})}`
    },
    titleFormated() {
      if(this.product.title.length >=20)
        return `${this.product.title.slice(0, 20)}...`;

      return this.product.title
    }

  }
}
</script>

<style scoped>
.product {
  max-width: 230px;
  padding:  32px;
  box-shadow: 0px 0px 30px -9px rgba(130,130,130,0.5);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  margin-right: 12px;
  margin-left: 12px;
  transition: all .4s
}

.product:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 30px -9px rgba(130,130,130,1);
  cursor: pointer;
}

.product .title {
  margin-top: 24px;
}
.product .image {
  max-height: 200px;
  max-width: 300px;
  width: auto;
  height: auto;
}

.product .info {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product .price {
  font-size: 24px;
  color: #0033C6;
  font-weight: 600;
}

.product .rating {
  margin-top: 8px;
  text-align: center;
}
</style>