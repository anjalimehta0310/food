import { StarIcon } from '@heroicons/react/24/solid';

const RestaurantCard = ({ name, cuisines, cloudinaryImageId, avgRating }) => {
    return (
        <div className="pl-5 inline-flex">
            <div className="w-80 h-80 p-4 ml-4 mb-4 shadow-lg bg-black border border-black rounded-lg flex flex-col justify-start items-start overflow-hidden transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-105">
                <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + cloudinaryImageId}
                    className="w-full h-1/2 object-cover mb-2 rounded-t-lg"
                    alt={name}
                    style={{ filter: 'brightness(70%)' }} // Adjust brightness here
                />
                <h2 className="font-bold text-xl overflow-hidden text-ellipsis whitespace-nowrap mb-1"> {name}</h2>
                <div className="mb-2"><span className="font-bold text-lg text-gray-600">{avgRating} star⭐</span>
                </div>
                <p className="text-lg overflow-hidden text-ellipsis whitespace-normal mb-1">{cuisines.join(", ")}</p>
                <p className="text-xs font-bold overflow-hidden text-ellipsis whitespace-nowrap mb-1"></p>
            </div>
        </div>
    );
};

export default RestaurantCard;
