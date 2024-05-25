import { StarIcon } from '@heroicons/react/24/solid';

const TopRatedCard = ({ name, cuisines, cloudinaryImageId, avgRating }) => {
    return (
        <div className="inline-flex">
            <div className="w-80 h-80 p-4 ml-4 mb-4 mr-4 shadow-lg bg-gray-400 border border-black rounded-lg flex flex-col justify-start items-start overflow-hidden transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-105">
                <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + cloudinaryImageId}
                    className="w-full h-1/2 object-cover mb-2 rounded-t-lg"
                    alt={name}/>
                <h2 className="font-bold text-xl overflow-hidden text-ellipsis whitespace-nowrap mb-1"> {name}</h2>
                <div className="mb-2"><span className="font-bold text-lg text-gray-600">{avgRating} star⭐</span>
                </div>
                <p className="text-lg overflow-hidden text-ellipsis whitespace-normal mb-1">{cuisines.join(", ")}</p>
            </div>
        </div>
    );
};

export default TopRatedCard;
