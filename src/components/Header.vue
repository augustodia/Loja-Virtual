<template>
  <header id="header">
    <div class="container" >
      <div class="header-content" v-if="categories.length">
        <ul class="navigation">
          <li v-for="(category, index) in categories" :key="index"><a href="">{{category.toUpperCase()}}</a></li>
        </ul>

        <v-text-field class="busca" outlined :hide-details="true" height="10px" :dense="true" :full-width="false" placeholder="Buscar produto..." width="50px">
          <template v-slot:append>        
            <v-icon @click="{}" color="green"> mdi-magnify </v-icon> 
          </template>
        </v-text-field>
        
        <div class="cart">
          <v-icon>mdi-cart-outline</v-icon>
          <div class="qtd-products">0</div>
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
export default {
  data() {
    return {
      categories: []
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
  }

  .busca {
    /* margin: 0 64px !important; */
    max-width: 40%;
  }

  .cart {
    display: flex;
  }
</style>