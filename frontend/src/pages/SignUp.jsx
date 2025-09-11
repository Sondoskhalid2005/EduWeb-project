import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import "./style.css";

export default function SignUp(){
 const [role, setRole] = useState("");
 const [accept, setAccept] = useState(false);
  const [formData, setFormData] = useState({role:"",name:"" , email: "", password1: "",  password2: "" });
const [error, setError] = useState(""); 
const navigate = useNavigate();

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
        if(formData.password1!=formData.password2){
            setError("password dont match ")
            return;
        }
        const response = await axios.post("http://eduweb-project.onrender.com/auth/signup",{
            role:role,
            username:formData.name ,
            email:formData.email,
            password:formData.password2

        },)

        if(response.status === 201 || response.status === 200){
            console.log("signed up successfully heading to home page!")
            navigate("/login")
        }

    }catch(error){
        setError("failed to sign up !")
    }
}
;
  return (
    <div className="parent">
      <div className="register">
        <form onSubmit={handelsubmit}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <p style={{ color: "#cfd8dc", marginBottom: "10px" }}>Select your role:</p>
            <button
              type="button"
              className={`role-button ${role === "instructor" ? "active" : ""}`}
              onClick={() => setRole("instructor")}
            >
              instructor
            </button>
            <button
              type="button"
              className={`role-button ${role === "student" ? "active" : ""}`}
              onClick={() => setRole("student")}
            >
              Student
            </button>
          </div>
          <label htmlFor ="name" >Name:</label>
            <input type='text ' name="name" id="name" placeholder=" Name...." value={formData.name || ""} onChange={handleChange} ></input>

          <label htmlFor ="email" >Email:</label>
                  <input type='email' name="email" id="email" placeholder=" Email...." value={formData.email || ""} onChange={handleChange}></input>

                   <label htmlFor ="password" >Password:</label>
                  <input type='password' name="password1" id="password" placeholder=" Password..." value={formData.password1 || ""} onChange={handleChange} ></input>

                   <label htmlFor ="Rpassword" >Repeat Password:</label>
                  <input type='password' name="password2" id="Rpassword" placeholder=" Repeat Password...." value={formData.password2 || ""} onChange={handleChange} ></input>
            {formData.password1.length < 8 && accept && (<p className="error">Password must be more than 8 characters</p> )} 
                  
                  {error && <div className="error">{error}</div>}
                  <div style={{textAlign :'center'}}>
                    <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}