import React,{useEffect} from "react";
import {useNavigate, Link, Navigate } from "react-router-dom";
import "./style.css";
export default function Logout() {
    const navigate = useNavigate();
   useEffect(() => {
    sessionStorage.clear();            // clear session memory to logout 
    console.log(sessionStorage.getItem("token")); 
    navigate("/");                  
  }, [navigate]);

  return null;
}