import React, { useState, useEffect } from 'react';
import InstamartCart from './InstamartCart';
import { filterProductData } from '../utils/helper';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

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
      setFilteredProducts(json?.data?.widgets[0]?.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center p-5">
        <input
          type="text"
          className="p-2 mr-2 rounded border border-gray-300 w-72"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="p-2 rounded bg-purple-700 text-white border-none cursor-pointer"
          onClick={() => {
            const data = filterProductData(searchText, products);
            setFilteredProducts(data);
          }}
        >
          Search
        </button>
      </div>
      <h1 className='pl-24 text-2xl'>Shop by Category!!!</h1>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 px-2">
        {filteredProducts.map((product) => (
          <Link to={"/product/" + product.nodeId} key={product.nodeId}>
            <InstamartCart {...product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Instamart;
