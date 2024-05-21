const Banner = ({ banner }) => {
    return (
      <div className='inline-flex'>
        <img 
          className='' 
          src={'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/' + banner?.imageId} 
          alt='' 
          style={{ 
            display: 'block', // Display as block element
            width: '150px',   // Set width to make it smaller
            height: 'auto',   // Maintain aspect ratio
            marginRight: '10px', // Add some space between images
            backgroundColor:'#000000',
            color:'#000000'
          }} 
        />
      </div>
    );
  };
  
  export default Banner;
  