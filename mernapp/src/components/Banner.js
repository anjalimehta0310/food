import { CDN_URL } from '../utils/constant';

const Banner = ({ banner }) => {
  return (
    <div className='keen-slider__slide flex justify-center items-center'>
      <img className='block w-full h-full object-contain mix-blend-screen' src={CDN_URL + banner?.imageId} alt={banner?.title || 'Banner Image'} />
    </div>
  );
};

export default Banner;
