import React, { useState, useEffect } from 'react';
import InstamartCart from './InstamartCart';
import { filterProductData } from '../utils/helper';
import Navbar from '../components/Navbar';

const Instamart = () => {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);


  useEffect(() => {
    getProduct(); 
  }, []);

  async function getProduct() {
    try {
      const data = await fetch("https://www.swiggy.com/api/instamart/home?pageNo=1&layoutId=3173&storeId=1387080&clientId=INSTAMART-APP");
      const json = await data.json();
      console.log(json);
      setProducts(json?.data?.widgets[0]?.data);
      setFilteredProducts(json?.data.widgets[0]?.data);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <input 
          type="text"
          style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '300px' }}
          placeholder="Search" 
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button 
          style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#6A1B9A', color: 'white', border: 'none', cursor: 'pointer' }}
          onClick={() => {
            const data = filterProductData(searchText, products);
            setFilteredProducts(data);
          }}
        >
          Search
        </button>
      </div>
      <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
        style={{ paddingLeft: '10px', paddingRight: '10px' }}>
        {filteredProducts.map((product) => (
          <InstamartCart key={product.nodeId} {...product} />
        ))}
</div>

    </div>
  );
};

export default Instamart;
