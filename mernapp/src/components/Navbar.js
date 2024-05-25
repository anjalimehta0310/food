import React, { useState } from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FastfoodSharpIcon from '@mui/icons-material/FastfoodSharp';
import { NavLink, useNavigate } from "react-router-dom";
import Modal from './Modal';
import Cart from "../screens/Cart";
import { useCart } from './ContextReducer';

const Navbar = () => {
  const items = useCart();
  const [cartView, setCartView] = useState(false);
  const navigateTo = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("authToken");
    navigateTo("/login");
  }

  function handleCartClicked() {
    setCartView(true);
    console.log(cartView);
  }

  function closeButtonclicked() {
    setCartView(false);
  }

  return (
    <nav className="bg-success p-4 flex justify-between items-center">
      <div className="flex items-center space-x-5">
        <NavLink to="/" className="text-black flex items-center  text-xl">
          <FastfoodSharpIcon fontSize='large' />
        </NavLink>
        <NavLink to="/" className="text-black text-decoration-none text-xl">Home</NavLink>
        {localStorage.getItem("authToken") &&
          <NavLink to="/myorders" className="text-black  text-xl text-decoration-none">My Orders</NavLink>
        }
        <NavLink to="/instamart" className="text-black  text-xl text-decoration-none">Instamart</NavLink>
      </div>
      <div className="flex items-center space-x-5">
        {localStorage.getItem("authToken") ?
          <div className="flex items-center space-x-5 cursor-pointer  text-xl">
            <div className="text-black" onClick={handleCartClicked}>
              <Badge showZero color="secondary" badgeContent={items.length}>
                <ShoppingCartIcon />
              </Badge>
              My Cart
            </div>
            {cartView && <Modal onClose={closeButtonclicked}><Cart /></Modal>}
            <div className="text-black  text-lg cursor-pointer" onClick={handleLogOut}>Logout</div>
          </div>
          :
          <div className="flex items-center space-x-5">
            <NavLink to="/login" className="text-black cursor-pointer  text-xl">Login</NavLink>
            <NavLink to="/signup" className="text-black cursor-pointer  text-xl">Sign Up</NavLink>
          </div>
        }
      </div>
    </nav>
  );
}

export default Navbar;
