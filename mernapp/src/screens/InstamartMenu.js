import React, { useState, useEffect } from 'react';
import { filterProductData } from '../utils/helper';
import Navbar from '../components/Navbar';

const InstamartMenu = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData(); 
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("https://www.swiggy.com/api/instamart/home?pageNo=1&layoutId=3173&storeId=1387080&clientId=INSTAMART-APP");
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData?.data?.widgets);
      setFilteredData(jsonData?.data.widgets);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Navbar />
      <div>
        {filteredData.map((widget, index) => (
          <div key={index}>
            <h2>{widget.displayName}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {widget.nodes.map((node) => (
                <div key={node.nodeId}>
                  <h3>{node.displayName}</h3>
                  {node.nodes && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {node.nodes.map((item) => (
                        <div key={item.nodeId}>
                          <h4>{item.displayName}</h4>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstamartMenu;
