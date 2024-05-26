import React from 'react';

const CuisinsCard = ({ text }) => {
    return (
        <div className="p-2 border rounded-lg m-2 w-full">
            <div className="w-full h-full p-2 shadow-lg flex flex-col justify-start items-start overflow-hidden duration-300 ease-in-out cursor-pointer">
                <h2 className="font-bold text-lg overflow-hidden text-ellipsis whitespace-nowrap mb-1">{text}</h2>
            </div>
        </div>
    );
};

export default CuisinsCard;
