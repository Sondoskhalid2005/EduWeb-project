import React,{useEffect} from "react";
import {useNavigate, Link, Navigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
export default function Logout() {
    const navigate = useNavigate();
   useEffect(() => {
    const logoutUser = async () => {
    try{
      const res = await axios.get(`http://localhost:4000/auth/logout`,{
            headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
          },)
          
        if(res.status===200||res.status===201){ 
          sessionStorage.removeItem("token");
sessionStorage.removeItem("role");
      sessionStorage.clear();            // clear session memory to logout 
    console.log(sessionStorage.getItem("token")); 
    console.log(res?.data?.msg);
    navigate("/"); 
        }
  }catch(error){   
      console.log("error loging out 500 ");
    }  } 
    logoutUser()           
  }, [navigate]);

  return null;
}