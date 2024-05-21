import { useEffect ,useState} from "react";
const UseRestarurant=(resId)=>{
    const [restaurant,setRestaurant]=useState({});
    useEffect(()=>{
        getRestaurantInfo();
    },[]);
    async function getRestaurantInfo(){
        const data=await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7022686&lng=77.4192428&restaurantId="+resId+"&catalog_qa=undefined&submitAction=ENTER");
        const json=await data.json();
        console.log(json);
        setRestaurant(json.data?.cards[2]?.card?.card?.info);
    }
    return restaurant;
};
export default UseRestarurant;


