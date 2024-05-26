import React, { useEffect, useState } from 'react';
import CuisinsCard from './CuisinsCard';

const Cuisins = () => {
    const [cuisins, setCuisins] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(9); // Start by showing 9 items

    useEffect(() => {
        getTopRated();
    }, []);

    async function getTopRated() {
        try {
            const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7022686&lng=77.4192428&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
            const json = await data.json();
            setCuisins(json?.data?.cards[7]?.card?.card?.brands);
            console.log(json);
        } catch (err) {
            console.log(err);
        }
    }

    const handleShowMore = () => {
        setItemsToShow(cuisins.length); // Show all remaining items
    };

    const handleShowLess = () => {
        setItemsToShow(9); // Reset to initial 9 items
    };

    return (
        <div className='p-12'>
            <h1 className='mt-4 mb-4 text-2xl font-bold'>Cuisine Restaurants Near Me</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {cuisins.length > 0 ? (
                    cuisins.slice(0, itemsToShow).map((res, index) => (
                        <CuisinsCard key={index} text={res.text} />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
                {itemsToShow < cuisins.length && (
                    <button
                        className="  col-span-5 md:col-span-1 lg:col-span-1 px-2 text-white rounded-md"
                        onClick={handleShowMore}
                    >
                        Show More
                    </button>
                )}
                {itemsToShow > 9 && (
                    <button
                        className="col-span-5  md:col-span-1 lg:col-span-1 px-3 text-white rounded-md"
                        onClick={handleShowLess}
                    >
                        Show Less
                    </button>
                )}
            </div>
        </div>
    );
};

export default Cuisins;
