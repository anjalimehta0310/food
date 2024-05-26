export function filterProductData(searchText, products) {
    const filteredProductdata = products.filter((product) => {
      return product?.displayName?.toLowerCase()?.includes(searchText.toLowerCase());
    });
    return filteredProductdata;
  }

  export function filterData(searchText, allRestaurants) {
    const filteredData = allRestaurants.filter((restaurant) => {
      return restaurant?.info?.name?.toLowerCase()?.includes(searchText.toLowerCase());
    });
  
    return filteredData;
}

// export default filterfooditem(searchText,foodItems){
//   const filterfooditem=foodItems.filter((foodItem)=>{
//     return foodItem?.displayName?.
//   })
// }