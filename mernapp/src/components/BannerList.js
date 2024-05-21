import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import ShimmerBanner from '../components/ShimmerBanner';

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7007579&lng=77.4176951&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
        const json = await response.json();
        
        // Check if the necessary properties exist in the response
        const bannersData = json?.data?.cards[0]?.card?.card?.imageGridCards?.info;
  
        if (bannersData) {
          setBanners(bannersData);
          setIsLoading(false);
        } else {
          console.error('Data structure does not match expectations:', json);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="container-max">
      {isLoading ? (
        <div className="flex gap-4 md:gap-8 mb-8">
          {/* Display loading state */}
          <ShimmerBanner />
          <ShimmerBanner />
          <ShimmerBanner />
        </div>
      ) : (
        <div className="keen-slider flex">
          {banners.map((banner) => (
            <Banner key={banner.id} banner={banner} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerList;
