const Banner = ({ banner }) => {
    return (
      <div>
        <img 
          src={'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/' + banner?.imageId} 
          alt='' 
          style={{ 
            width: '150px',   // Set width to make it smaller
            height: 'auto',   // Maintain aspect ratio
            
            backgroundColor:'#000000',
            color:'#000000'
          }} 
        />
      </div>
    );
  };
  
  export default Banner;
  