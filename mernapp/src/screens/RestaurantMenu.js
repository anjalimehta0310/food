import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Shimmer from "../components/Shimmer";
import UseRestaurant from "../utils/useRestaurant";
import { useDispatchCart } from "../components/ContextReducer"; 
import Navbar from "../components/Navbar";
const RestaurantMenu = () => {
  const { resId } = useParams();
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

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = (menuItem) => {
    // Dispatch action to add item to cart
    dispatch({
      type: "ADD",
      id: menuItem.id,
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      image: menuItem.image,
      qty: quantity,
      size: "yourSize", 
    });
  };

  if(!setMenu) return <Shimmer/>
  return (
    <div>
        <div><Navbar/></div>
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div style={{ width: "100%", padding: "16px" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", textAlign: "center", marginBottom: "16px" }}>MENU</h1>
        <div style={{ position: "absolute", top: "90px", right: 0 }}>
          <button onClick={() => { navigate('/Body') }}>goBack</button>
        </div>
        <div style={{ marginLeft: "20%", marginRight: "20%" }}>
          <div className="accordion">
            {menu && menu.map((item) => (
              <div key={item.card?.info?.id} className="accordion-item" style={{ marginBottom: "16px", display: "flex", alignItems: "center" }}>
                <img
                  src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + item.card?.info?.imageId}
                  style={{ width: "80px", height: "80px", borderRadius: "8px", marginRight: "16px" }}
                  alt={item.card?.info?.name}
                />
                <div>
                  <h2 style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "8px" }}>{item.card?.info?.name}</h2>
                  <p style={{ fontSize: "0.875rem", marginBottom: "8px" }}>{item.card?.info?.description}</p>
                  <p style={{ fontSize: "0.875rem", fontWeight: "bold" }}>Rupees: {item.card?.info?.price / 100}</p>
                </div>
                {/* Quantity input */}
                <select
                  value={quantity}
                  onChange={handleQuantityChange}
                  style={{
                    width: '50px', 
                    marginLeft: 'auto',
                     backgroundColor: '#50C878',
                     color:'#000000' 
                  }}
                >
                  {[...Array(6).keys()].map(i => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                {/* Add to cart button */}
                <button onClick={() => handleAddToCart(item.card?.info)} style={{ marginLeft: '16px', backgroundColor: '#50C878', color: '#000000' }}>Add</button>
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
