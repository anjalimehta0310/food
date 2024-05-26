import { StarIcon } from '@heroicons/react/24/solid';

const TopRatedCard = ({ name, cuisines, cloudinaryImageId, avgRating }) => {
    return (
        <div className="inline-flex">
            <div className="w-64 h-64 p-2 ml-2 mb-2 mr-2 shadow-lg bg-black border border-black rounded-lg flex flex-col justify-start items-start overflow-hidden transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-105">
                <img 
                    src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + cloudinaryImageId}
                    className="w-full h-32 object-cover mb-1 rounded-t-lg"
                    alt={name}
                />
                <h2 className="font-bold text-lg overflow-hidden text-ellipsis whitespace-nowrap mb-1">{name}</h2>
                <div className="mb-1 flex items-center">
                    <StarIcon className="h-6 w-6 text-yellow-400 mr-1" />
                    <span className="font-bold text-base text-gray-600">{avgRating} star⭐</span>
                </div>
                <p className="text-base overflow-hidden text-ellipsis whitespace-normal mb-1">{cuisines.join(", ")}</p>
            </div>
        </div>
    );
};

export default TopRatedCard;
