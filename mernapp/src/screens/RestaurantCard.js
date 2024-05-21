import { StarIcon } from '@heroicons/react/24/solid';

const RestaurantCard = ({ name, cuisines, cloudinaryImageId, avgRating }) => {
    return (
        <div style={{
            paddingLeft: '22px',
            display: 'inline-flex'
        }}>
        <div 
        style={{ 
            width: '300px', 
            height: '300px',
            padding: '16px',
            paddingLeft: '20px', // Adjust the padding from left here
            margin: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#000000',
            border: '1px solid #000000',
            borderRadius: '8px',
            display: 'inline-flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            cursor: 'pointer', // Add cursor pointer when hovering over the card
            transform: 'scale(1)', // Add scale transition effect
        }}
        
        >
            <img 
                src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + cloudinaryImageId}
                style={{ 
                    width: '100%', 
                    height: '50%',
                    objectFit: 'cover',
                    marginBottom: '8px',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                }}
                alt={name}
            />
            <h2 
                style={{
                    fontWeight: 'bold',
                    fontSize: '1.2rem', 
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginBottom: '4px',
                }}
            >
                {name}
            </h2>
            <div style={{ marginBottom: '4px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1rem', color: '#4B5563' }}>
                    {avgRating} star⭐
                </span>
            </div>
            <p 
                style={{
                    fontSize: '1rem', 
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'normal',
                    marginBottom: '4px',
                }}
            >
                {cuisines.join(", ")}
            </p>
            <p 
                style={{
                    fontSize: '0.75rem', 
                    fontWeight: 'bold',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginBottom: '4px',
                }}
            >
                {/* Additional Information */}
            </p>
        </div>
        </div>
    );
};

export default RestaurantCard;
