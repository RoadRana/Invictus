import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";
import Banner from "../shared/Banner";
import Logo from "./Logo";
import banner from "../assets/banner photo1.png";
import StaffLogin from "./Stafflogin.jsx";

const SignUp = () => {
  const heading = "Create your account";
  const subheading =
    "We are dedicated to revolutionizing the maritime industry with our eco-friendly, intelligent unmanned marine vehicles. Our mission is to innovate and lead the way in marine technology, ensuring a sustainable and efficient future for the industry.";

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // TODO: Replace with real signup request
    localStorage.setItem("authenticated", "true");
    navigate("/home");
  };

  return (
    <div className="mt-20">
      {/* If your Banner expects 'subsheading', change the prop name below to match */}
      <Banner banner={banner} heading={heading} subheading={subheading} />

      <div className="signup-container container mx-auto py-12 px-4 md:px-0">
        <Logo />

        <div className="signup-form">
          <h2>Create an Account</h2>

          <form onSubmit={handleSignUp}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                minLength={6}
                required
              />
            </div>

            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>

          <div className="signin-link mb-4">
            Already have an account? <Link to="/signin">Sign In</Link>
          </div>

          <div className="staff-login">
            <StaffLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
