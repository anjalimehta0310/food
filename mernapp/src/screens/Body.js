import React, { useEffect, useState } from "react";
import RestaurantCard from "../screens/RestaurantCard";
import Shimmer from "../components/Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import Navbar from "../components/Navbar";

const Body = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filterRestaurants, setFilterRestaurants] = useState([]);

    useEffect(() => {
        getRestaurants();
    }, []);

    async function getRestaurants() {
        try {
            const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7022686&lng=77.4192428&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
            const json = await data.json();
            setAllRestaurants(json.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            setFilterRestaurants(json.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        } catch (err) {
            console.log(err);
        }
    }

    if (!allRestaurants) return <Shimmer />;

    return (
        <>
            <div><Navbar/></div>
            <div className="flex justify-center">
                <div style={{ 
                    padding: '20px', 
                    // backgroundColor: '#F59E0B', 
                    margin: '10px 0', 
                    // border: '4px solid #000',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <input
                        type="text"
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            marginRight: '10px',
                            width: '50%' // Adjust width as needed
                        }}
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                    <button
                        style={{
                            backgroundColor: '#FF7518', // Light orange background color
                            color: '#000000', // Black text color
                            padding: '10px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            border: 'none'
                        }}
                        onClick={() => {
                            const data = filterData(searchText, allRestaurants);
                            setFilterRestaurants(data);
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>
            <h2 className="" style={{ paddingLeft: '35px' }}>Restaurants near you!!</h2>
            <div className="flex flex-wrap">
                {filterRestaurants.map((restaurant) => (
                    <Link to={"/restaurant/" + restaurant.info.id} key={restaurant.info.id}>
                        <RestaurantCard {...restaurant.info} />
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Body;
