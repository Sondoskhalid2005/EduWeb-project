import "../pages/style.css";
import { Link } from "react-router-dom"; 
export default function Footer() {
  return (
    <footer className="eduweb-footer">
      <div className="footer-content">
        <div className="footer-about">
          <h3>EduWeb</h3>
          <p>Your gateway to learning. Explore courses, enhance skills, and grow your career with us.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            {/* <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">SignUp</Link></li>
            <li><Link to="/InstructorProfile">Profile</Link></li> */}
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: support@eduweb.com</p>
          <p>Phone: +20 1000000000</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} EduWeb. All rights reserved.</p>
      </div>
    </footer>
  );
}