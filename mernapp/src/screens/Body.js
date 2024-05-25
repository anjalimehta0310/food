import React, { useEffect, useState } from "react";
import RestaurantCard from "../screens/RestaurantCard";
import Shimmer from "../components/Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import Navbar from "../components/Navbar";
import TopRated from "../screens/TopRated";

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
            console.log(json);
            setAllRestaurants(json.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            setFilterRestaurants(json.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        } catch (err) {
            console.log(err);
        }
    }

    if (!allRestaurants) return <Shimmer />;

    return (
        <>
            <Navbar />
           
            <div className="flex justify-center">
                <div className="p-5 flex items-center">
                <input
                type="text"
                className="p-2 border border-gray-300 rounded-l-lg focus:outline-none w-96" // Set width to 24rem (384px)
                placeholder="Search"
                value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value);
                }}
            />
            <button
                className="bg-orange-400 text-black p-2 rounded-md cursor-pointer ml-2"
                onClick={() => {
                    const data = filterData(searchText, allRestaurants);
                    setFilterRestaurants(data);
                }}
            >
                Search
            </button>
            </div>
            </div>
            
            <h2 className="pl-5">Restaurants near you!!</h2>
            <div className="flex flex-wrap">
                {filterRestaurants.map((restaurant) => (
                    <Link to={"/restaurant/" + restaurant.info.id} key={restaurant.info.id}>
                        <RestaurantCard {...restaurant.info} />
                    </Link>
                ))}
            </div>
            <TopRated/>
        </>
    );
};

export default Body;
