import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import NavBar from "./NavBar";
import { Route , Routes } from "react-router-dom";


const Home = () => {
  const { user } = useUserAuth();
  
  return (
    <>
    <NavBar />
   
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
        {user && user.email}
      </div>
     
    </>
  );
};

export default Home;