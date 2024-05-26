import React from 'react';

const InstamartCart = ({ displayName, imageId }) => {
    return (
        <div className="inline-flex flex-col items-center w-48 p-4 m-2 shadow-lg">
            <img 
                className="w-full h-auto object-cover" 
                src={`https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_200,w_200/${imageId}`} 
                alt={displayName} 
            />
            <h2 className="font-bold text-lg mt-2">{displayName}</h2>
        </div>
    );
};

export default InstamartCart;
