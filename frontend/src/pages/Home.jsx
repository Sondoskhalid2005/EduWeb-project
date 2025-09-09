import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
export default function EduWeb() {
  return (
    <>
      <div className="eduweb-container">
        <header className="eduweb-header">
          <h1>Welcome to EduWeb</h1>
          <p>Learn, Explore, and Grow with our curated courses!</p>
        </header>
        <section className="eduweb-features">
          <h2>Why Choose EduWeb?</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <h3>Expert Instructors</h3>
              <p>Learn from industry leaders and experienced professionals.</p>
            </div>
            <div className="feature-card">
              <h3>Flexible Learning</h3>
              <p>Access courses anytime, anywhere, on any device.</p>
            </div>
            <div className="feature-card">
              <h3>Certificates</h3>
              <p>Earn recognized certificates to boost your career.</p>
            </div>
          </div>
        </section>
        <section className="eduweb-courses">
          <h2>Popular Courses:</h2>
          <div className="eduweb-cards">
            <div className="edu-card">
              <h2>React for Beginners</h2>
              <p>Start building modern web apps with React from scratch.</p>
            </div>
            <div className="edu-card">
              <h2>Python Programming</h2>
              <p>Learn Python and dive into data analysis, AI, and automation.</p>
            </div>
            <div className="edu-card">
              <h2>UI/UX Design</h2>
              <p>Create stunning designs and improve user experiences effectively.</p>
            </div>
          </div>
        </section>
        <section className="eduweb-cta">
          <h2>Get Started Today!</h2>
          <p>Join thousands of learners and start your journey with EduWeb.</p>
          <Link to="/signup" className="cta-button">Sign Up Now</Link>
        </section>

      </div>
    </>
  );
}