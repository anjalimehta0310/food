import React, { useEffect, useState } from 'react';
import TopRatedCard from './TopRatedCard';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

const TopRated = () => {
    const [TopRated, setTopRated] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 5; 

    useEffect(() => {
        getTopRated();
    }, []);

    async function getTopRated() {
        try {
            const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7022686&lng=77.4192428&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
            const json = await data.json();
            setTopRated(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            console.log(json);
        } catch (err) {
            console.log(err);
        }
    }

    const handleNext = () => {
        if (currentIndex + itemsPerPage <= TopRated.length) {
            setCurrentIndex(currentIndex + itemsPerPage);
        }  
    };

    const handlePrev = () => {
        if (currentIndex - itemsPerPage >= 0) {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

    return (
        <div>
            <div className='pl-10 pr-10'>
            <div className="relative">
                <h1 className="pl-6">Top Restaurant chains in Noida!!</h1>
                <div className="absolute top-0 right-0 flex items-center">
                    <button
                        className="p-2 bg-black rounded-full"
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                    >
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <button
                        className="p-2 bg-black rounded-full"
                        onClick={handleNext}
                        disabled={currentIndex + itemsPerPage >= TopRated.length}
                    >
                        <ArrowRightIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="overflow-hidden flex-1">
                <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${(currentIndex / itemsPerPage) * 100}%)` }}>
                    {TopRated.length > 0 ? (
                        TopRated.map((restaurant, index) => (
                            <>
                                <Link to={"/restaurant/" + restaurant.info.id} key={restaurant.info.id} className="w-1/5 p-2">
                                    <TopRatedCard {...restaurant.info} />
                                </Link>
                                {index !== TopRated.length - 1 && <div className="w-2" />} {/* Add space after each card except the last one */}
                            </>
                        ))
                    ) : (
                        <p>Loading...</p> 
                    )}
                </div>
            </div>
            </div>
        </div>
    );
};

export default TopRated;
