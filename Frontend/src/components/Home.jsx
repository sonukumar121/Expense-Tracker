import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
export const Home=()=> {
    const navigate = useNavigate();
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-container">
          <div className="logo">ExpenseTracker</div>

          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">Features</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>

          <div>
      <button
        className="btn-secondary"
        style={{
          marginRight: "10px",
        }}
        onClick={() => navigate("/login")}
      >
        Login
      </button>

      {/* <button
        className="btn-primary"
        onClick={() => navigate("/login")}
      >
        Sign Up
      </button> */}
    </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container hero">
        <div className="hero-left">
          <span className="badge">💰 Take Control of Your Money</span>

          <h1>
            Track Your Expenses <br />
            <span>Save More, Stress Less</span>
          </h1>

          <p>
            A simple and smart way to manage your daily expenses and reach your
            financial goals.
          </p>

          <button className="btn-primary" onClick={()=>navigate("/login")}>Get Started</button>
        </div>

        <div className="hero-right">
          <div className="mockup-card">
            <h4>Total Expense</h4>
            <h2>₹12,500</h2>

            <p>Food: 35% | Travel: 25% | Shopping: 15%</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container features-section">
        <h2>Why Choose Us?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>📊 Easy Tracking</h3>
            <p>Track your daily expenses without any hassle.</p>
          </div>

          <div className="feature-card">
            <h3>🎯 Budget Planning</h3>
            <p>Set monthly budgets and stay in control.</p>
          </div>

          <div className="feature-card">
            <h3>📈 Reports</h3>
            <p>View spending trends and summaries.</p>
          </div>

          <div className="feature-card">
            <h3>🔒 Secure</h3>
            <p>Your financial data stays protected.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container stats-section">
        <div className="stat-card">
          <h2>10K+</h2>
          <p>Active Users</p>
        </div>

        <div className="stat-card">
          <h2>₹5M+</h2>
          <p>Expenses Tracked</p>
        </div>

        <div className="stat-card">
          <h2>99%</h2>
          <p>User Satisfaction</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="container how-section">
        <h2>How It Works</h2>

        <div className="steps">
          <div className="step">
            <h3>1️⃣ Create Account</h3>
            <p>Sign up and create your personal account.</p>
          </div>

          <div className="step">
            <h3>2️⃣ Add Expenses</h3>
            <p>Record all your daily expenses easily.</p>
          </div>

          <div className="step">
            <h3>3️⃣ Analyze & Save</h3>
            <p>Understand spending habits and save more.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container testimonial-section">
        <h2>What Our Users Say</h2>

        <div className="testimonial-grid">
          <div className="testimonial">
            <p>"This app helped me control my monthly spending."</p>
            <h4>- Rahul</h4>
          </div>

          <div className="testimonial">
            <p>"Simple interface and very easy to use."</p>
            <h4>- Priya</h4>
          </div>

          <div className="testimonial">
            <p>"Perfect for students managing expenses."</p>
            <h4>- Aman</h4>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container cta-section">
        <h2>Start Managing Your Expenses Today</h2>

        <p>Join thousands of users who are saving money with ExpenseTracker.</p>

        <button className="btn-primary">Get Started Free</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <h3>ExpenseTracker</h3>

          <p>Smart expense management for everyone.</p>

          <div className="footer-links">
            <a href="#">Home</a>
            <a href="#">Features</a>
            <a href="#">About</a>
            <a href="#">Privacy</a>
            <a href="#">Contact</a>
          </div>

          <p className="copyright">
            © 2026 ExpenseTracker. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
