import { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import "./style.css";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
export default function Login() {
const [formData, setFormData] = useState({role:"",email: "",password:"" });
const [error, setError] = useState(""); 
const navigate = useNavigate();
  toastr.options={
  positionClass: "toast-top-center",
  timeOut: "2000", // 3 seconds
  progressBar: true,
  closeButton: true,
 } // for notification
const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
}
const handelsubmit=async(e)=>{ 
    e.preventDefault() //prevent refreshing the page
    setError("");
    try{ 
      // sessionStorage.clear();
        const response = await axios.post("http://localhost:4000/auth/login",{
            email:formData.email,
            password:formData.password
        },)
                 if(response.status === 404){
          setError("wrong email !")
         
        }

        if(response.status === 200){
           console.log("loged in successfully heading to home page!", response.data.token)
            sessionStorage.setItem("token",response.data.token)
            sessionStorage.setItem("role", response.data.role);
            sessionStorage.setItem("username", response.data.username);
            sessionStorage.setItem("userid", response.data.id);
            sessionStorage.setItem("email", response.data.email);            
            toastr.success(`✅ Loged In Successfully, WELCOME ${response.data.username} !`)
          navigate("/")   
            
             
            
        }

    }catch(error){

        setError("Error logging in:", error.response?.data.msg || error.message)
    }
};
return (
    <div className="parent2">
      <div className="login">
        <form onSubmit={handelsubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email..."
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password..."
            value={formData.password}
            onChange={handleChange}
          />
          {error && <div className="error">{error}</div>}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}