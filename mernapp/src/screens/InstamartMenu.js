import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import InstamartCart from './InstamartCart'; // Import the InstamartCart component

const InstamartMenu = () => {
  const { resId } = useParams();
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("https://www.swiggy.com/api/instamart/home?pageNo=1&layoutId=3173&storeId=1387080&clientId=INSTAMART-APP");
      const json = await response.json();
      console.log(json);
      setData(json?.data?.widgets[1]?.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Navbar />
      <div className='accordion'>
        {data && data.length > 0 && data.map((item) => (
          item?.data?.nodes && item.data?.nodes.map((node) => (
            <div key={node.nodeId} className="p-4">
              <h1 className="text-lg font-bold">{node.displayName}</h1>
              <InstamartCart displayName={node.displayName} imageId={node.imageId} key={node.nodeId} /> {/* Assign unique key prop */}
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default InstamartMenu;
