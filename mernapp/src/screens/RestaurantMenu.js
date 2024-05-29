import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Shimmer from "../components/Shimmer";
import UseRestaurant from "../utils/useRestaurant";
import { useDispatchCart } from "../components/ContextReducer"; 
import Navbar from "../components/Navbar";
import { IoMdBicycle } from "react-icons/io";
import pic1 from "../assests/pic1.png";
import pic2 from "../assests/pic2.png";
import pic3 from "../assests/pic3.png";
import { IoReturnUpBack } from "react-icons/io5";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const res = UseRestaurant(resId);
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1); 
  const dispatch = useDispatchCart(); 

  useEffect(() => {
    getMenuInfo();
  }, []);

  async function getMenuInfo() {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7022686&lng=77.4192428&restaurantId=" +
          resId +
          "&catalog_qa=undefined&submitAction=ENTER"
      );
      const json = await data.json();
      console.log(json);
      setMenu(
        json.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards
      );
    } catch (error) {
      console.log("error fetching", error);
    }
  }

  // const handleQuantityChange = (e) => {
  //   setQuantity(parseInt(e.target.value));
  // };

  const handleAddToCart = (menuItem) => {
    dispatch({
      type: "ADD",
      id: menuItem.id,
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"+menuItem.imageId,
      qty: quantity,
      size: "yourSize", 
    });
  };

  if (!menu) return <Shimmer />;
  return (
    <div>
      <Navbar />
      <h1 className="text-2xl px-96 font-bold">{res?.name}</h1>
      <div className="flex justify-center w-full mt-4 px-4 shadow-lg shadow-gray-500">
        <div className="border rounded-lg p-4 w-full max-w-3xl">
          <div className="flex space-x-2 mb-2 text-white text-sm">
            <h3 className="text-sm">⭐{res?.avgRating}</h3>
            <h3 className="text-sm">({res?.totalRatingsString})</h3>
            <h3 className="text-sm">{res?.costForTwoMessage}</h3>
          </div>
          {res && res.cuisines && (
          <div className="text-white text-sm">
            <h3 className="text-sm">{res.cuisines.join(", ")}</h3>
          </div>
        )}
          <div className="flex">
          <h3 className="text-base">{res?.sla?.minDeliveryTime}-</h3>
          <h3 className="text-base">{res?.sla?.maxDeliveryTime} mins</h3>
          </div>
          <div className="flex space-x-2">
            <h3 className="text-base">{res?.areaName}</h3>
            <h3 className="text-base">({res?.city})</h3>
          </div>
          <div>
          {/* <h1 className="text-lg">{res?.sla?.lastMileTravelString}</h1> */}
          <h1 className="text-lg flex items-center space-x-2">
            <IoMdBicycle className="mr-2" /> 
            {res?.feeDetails?.message?.replace(/<[^>]+>/g, '')}
          </h1>
        </div>
        </div>
      </div>
      <h1 className="text-2xl px-96 pt-2 font-bold">Deals for u!!!</h1>
      <div className="text-xl px-96  flex space-x-4">
      <div className="border rounded-lg p-2 space-x-2 flex">
        <img className="w-10 h-10" src={pic1} alt="pic1" />
        <button>50% off upto Rs.90</button>
      </div>
      <div className="border rounded-lg p-2 space-x-2 flex">
      <img className="w-10 h-10" src={pic2} alt="pic1" />
        <button>60% off upto Rs.120</button>
      </div>
      <div className="border rounded-lg p-2 space-x-2 flex">
        <img className="w-10 h-10" src={pic3} alt="pic1" />
          <button>Flat ₹125 Off</button>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="w-full p-4">
          <div className="absolute top-24 right-0">
            <button
              className=" text-white py-2 px-4 rounded"
              onClick={() => navigate('/Body')}
            >
             <IoReturnUpBack style={{ fontSize: '24px' }}/>
            </button>
          </div>
          <div className="mx-auto w-full max-w-3xl">
            <div className="accordion">
              {menu && menu.map((item) => (
                <div key={item.card?.info?.id}
                className="accordion-item flex items-center mb-4 bg-gray-200 p-4 rounded shadow relative" 
                >
                  <div className="flex-grow">
                    <h2 className="text-lg font-bold mb-2">{item.card?.info?.name}</h2>
                    <div className="flex space-x-2">
                      <h2 className="text-xs">⭐{item.card?.info?.ratings?.aggregatedRating?.rating}</h2>
                      <h2 className="text-xs">({item.card?.info?.ratings?.aggregatedRating?.ratingCountV2})</h2>
                    </div>
                    <p className="text-sm mb-2" style={{ maxWidth: '500px', wordWrap: 'break-word' }}>
                      {item.card?.info?.description}
                    </p>
                    <p className="text-sm font-bold">Rupees: {item.card?.info?.defaultPrice / 100}</p>
                  </div>
                  <div className="relative">
                    <img
                      src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + item.card?.info?.imageId}
                      className="w-32 h-32 rounded mr-4"
                      alt={item.card?.info?.name}
                    />
                    <button
                      className="absolute bottom-0 right-0 bg-green-500 text-black py-2 px-4 rounded-md" // Position the button at the bottom right corner of the image
                      onClick={() => handleAddToCart(item.card?.info)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
