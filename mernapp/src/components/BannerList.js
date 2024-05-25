import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import ShimmerBanner from '../components/ShimmerBanner';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/24/outline';

const BannerList = ({ isLoading, banners }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    mode: 'snap',
    slides: { perView: 8, spacing: 0 },  
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    breakpoints: {
      '(max-width: 480px)': {
        slides: { perView: 2, spacing: 0 }, 
      },
      '(min-width: 480px)': {
        slides: { perView: 4, spacing: 0 },
      },
      '(min-width: 768px)': {
        slides: { perView: 6, spacing: 0 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 8, spacing: 0 },
      },
    },
  });

  if (!banners) {
    return null;
  }

  return (
    <div className='container-max px-20'> 
      <div className='flex justify-between items-center mb-4 pt-7'>
        <h1 className='font-bold text-3xl text-white'>
          Anjali, what's on your mind??
        </h1>

        {instanceRef.current && (
          <div className='flex gap-2 items-center'>
            <button
              disabled={currentSlide === 0}
              onClick={() => instanceRef.current?.prev()}
              className='bg-black p-2 rounded-full disabled:text-gray-300'
            >
              <ArrowLongLeftIcon className='w-4 h-4' />
            </button>
            <button
              disabled={
                currentSlide ===
                instanceRef?.current?.track?.details?.slides?.length - 1
              }
              onClick={() => instanceRef.current?.next()}
              className='bg-black p-2 rounded-full disabled:text-gray-300'
            >
              <ArrowLongRightIcon className='w-4 h-4' />
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className='flex gap-4 md:gap-8 mb-8'>
          {Array.from({ length: 8 }).map((_, i) => ( 
            <ShimmerBanner key={i} />
          ))}
        </div>
      ) : (
        <div ref={sliderRef} className='keen-slider '>
          {banners.map((banner) => (
            <Banner banner={banner} key={banner.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerList;
