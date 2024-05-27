import axios from 'axios';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {
  //USENAVIGATE HOOK:
  const navigateTo = useNavigate();  
  
  //STATE VARIABLE:-
  const [loginData, setLoginData] = useState({
    email:"",
    password:"",
  })



  //FUNCTIONS:-

  function handleChange(e){
    setLoginData({...loginData,[e.target.name]:e.target.value});
  }




  function handleSubmit(e){
    e.preventDefault();

    //now we make a post request tot he server with 'axios'
    //to validate our user whhether the user already exists in our database or not:-
    axios.post("http://localhost:5000/api/login",{
      email:loginData.email,
      password:loginData.password
    })
    .then((res)=>{
      alert("Logged in successfullly !!");
      //our server will send a response in which there will be 2 properties- success,authToken
      //now we store the authorisation token sent over by the server to the client 
      //and from now on with every request t othe server we pass this jwt token to identifythat our user is 
      //already authenticated/loggedin
      //storing the authToken on the localstorage in the browser cache memory:-
      localStorage.setItem("authToken",res.data.authToken);
      //we also store the email of the user which will be used to match orders with the server:-
      localStorage.setItem("email",loginData.email);

      navigateTo("/");
    })
    .catch((err)=>{
      console.log(err);
      alert("Error Occured !!");
    });
  }










  return (
    <div className='div-container' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div className='container m-4'style={{ maxWidth: '550px', width: '100%', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px'}}>
      <h3 className='ml-0' style={{alignItems:'center'}}>Login</h3>
      <form onSubmit={handleSubmit} className='mt-4' style={{ maxWidth: '500px', margin: 'auto'}}> 
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input name='email' value={loginData.email} onChange={handleChange} type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input name='password' value={loginData.password} onChange={handleChange} type="password" className="form-control" id="password"/>
      </div>
      <button type="submit" className="mt-3 btn btn-success text-white">Login</button>
      <NavLink to="/signup"><button type="submit" className="mt-3 btn btn-primary text-white" style={{"marginLeft":"9px"}}>New User</button></NavLink>
    </form>
    </div>
  </div>
  )
}

export default Login