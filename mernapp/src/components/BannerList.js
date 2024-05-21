import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import ShimmerBanner from "../components/ShimmerBanner";

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slides: { perView: 11 },
      loop: true,
      mode: "free-snap",
      slideChanged() {
        console.log("slide changed");
      },
    },
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7007579&lng=77.4176951&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await response.json();

        const bannersData =
          json?.data?.cards[0]?.card?.card?.imageGridCards?.info || [];

        console.log("Fetched banners:", bannersData); // Debug: Log fetched banners

        setBanners(bannersData);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-max">
      {isLoading ? (
        <div className="flex gap-4 md:gap-8 mb-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <ShimmerBanner key={i} />
          ))}
        </div>
      ) : (
        <>
          <div ref={sliderRef} className="keen-slider">
            {banners.map((banner) => (
              <div className="keen-slider__slide" key={banner.id} style={{ minWidth: "12.5%" }}>
                <Banner banner={banner} />
              </div>
            ))}
          </div>
          <div className="navigation-wrapper">
            <button onClick={() => instanceRef.current?.prev()} className="arrow left">Previous</button>
            <button onClick={() => instanceRef.current?.next()} className="arrow right">Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default BannerList;
