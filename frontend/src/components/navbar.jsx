// import { Link } from "react-router-dom";
// import "../pages/style.css";

// export default function Navbar() {
//     const role = sessionStorage.getItem("role")?.trim(); 
//     const profileRoute =
//     role === "instructor" ? "/teacher-profile" :
//     role === "student" ? "/student-profile" :
//     "/login"; 
//     console.log("Raw role:", role);
// console.log("Role type:", typeof role);
// console.log("Role length:", role?.length);
// console.log("Profile route:", profileRoute);
//     console.log(role);
    
  
//   return (
//     <nav className="eduweb-nav">

//       <Link to={profileRoute}>Profile</Link>
//       <Link to="/courses">Courses</Link>
//       <Link to="/">Home</Link>
//       <Link to="/login">Login</Link>
//       <Link to="/signup">SignUp</Link>
//     </nav>
//   );
// }

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../pages/style.css";

export default function Navbar() {
    const [role, setRole] = useState(null);
    useEffect(() => {
        const checkRole = () => {
            const storedRole = sessionStorage.getItem("role");
            setRole(storedRole);
        };
        
        
        checkRole();
        const interval = setInterval(checkRole, 1000);
        window.addEventListener('storage', checkRole);
        
        return () => {
            clearInterval(interval);
            window.removeEventListener('storage', checkRole);
        };
    }, []);
    
    const profileRoute =
        role === "instructor" ? "/teacher-profile" :
        role === "student" ? "/student-profile" :
        "/login";
        
    console.log("Profile route:", profileRoute);

    return (
        <nav className="eduweb-nav">
            <Link to={profileRoute}>Profile</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">SignUp</Link>
        </nav>
    );
}