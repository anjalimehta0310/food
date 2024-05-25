import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import axios from 'axios';
import BannerList from '../components/BannerList'; // Import the BannerList component

const Home = () => {
    const [banners, setBanners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios
            .post('https://snapsnacks-server.onrender.com/api/foodData', {})
            .then((res) => {
                setFoodItems(res.data[0]);
                setFoodCat(res.data[1]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [foodCat, setFoodCat] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    const [search, setSearch] = useState('');

    function handleSearch(searchText) {
        setSearch(searchText);
    }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7007579&lng=77.4176951&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
        );
        const json = await response.json();
        const bannersData = json?.data?.cards[0]?.card?.card?.imageGridCards?.info || [];
        console.log('Fetched banners:', bannersData); // Debug: Log fetched banners
        setBanners(bannersData);
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


    return (
        <div>
            <Navbar />
            <BannerList isLoading={isLoading} banners={banners} />
            <div className="text-center justifyContent-center m-auto">
                <h1 className="mt-4">
                    <strong>
                        <img src="https://media.giphy.com/media/uCj0XRIzYRUTan5rBe/giphy.gif" style={{ height: '77px' }} alt="MENU" className="d-inline" />
                        <img src="https://media.giphy.com/media/lOrwtrEN8S0DfVI8Bz/giphy.gif" style={{ height: '77px' }} alt="MENU" className="d-inline" />
                        <img src="https://media.giphy.com/media/S5W6jONq0CVLj6WFUO/giphy.gif" style={{ height: '77px' }} alt="MENU" className="d-inline" />
                    </strong>
                    <div className="ms-auto">
                        <button onClick={() => window.location.href = '/Body'} className="btn btn-primary">Explore More</button>
                    </div>
                </h1>
            </div>
            <hr style={{ backgroundColor: 'white' }} />
            <div className="container">
                {foodCat && foodCat.map((categoryDoc, index) => (
                    <div className="row mb-3" key={categoryDoc._id}>
                        <div className="m-3 fs-3">{categoryDoc.CategoryName}</div>
                        <hr />
                        {foodItems && foodItems.filter((foodItem, i) => (
                            foodItem.CategoryName === categoryDoc.CategoryName &&
                            foodItem.name.toLowerCase().includes(search.toLowerCase())
                        )).map((filterItem, ind) => (
                            <div key={filterItem._id} className="col-xs-12 col-md-6 col-lg-3">
                                <Card
                                    id={filterItem._id}
                                    categoryName={filterItem.CategoryName}
                                    name={filterItem.name}
                                    image={filterItem.img}
                                    options={filterItem.options[0]}
                                    description={filterItem.description}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Home;
