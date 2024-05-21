const InstamartCart = ({ displayName, imageId }) => {
    return (
        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', width: '200px', padding: '10px', margin: '10px', boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)' }}>
            <img style={{ width: '100%', height: 'auto', objectFit: 'cover' }} src={"https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_200,w_200/" + imageId} alt={displayName} />
            <h2 style={{ fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>{displayName}</h2>
        </div>
    );
};

export default InstamartCart;
