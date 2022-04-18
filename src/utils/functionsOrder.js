const functionsProductOrder = {
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


export {functionsProductOrder}
