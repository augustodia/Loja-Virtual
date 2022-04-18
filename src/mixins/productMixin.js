export default {
  computed: {
    priceFormated() {
    if(this.product.price)
      return `$ ${this.product.price.toLocaleString('en-US', {currency: 'USD', minimumFractionDigits: 2})}`
    return undefined
    }
  }
}