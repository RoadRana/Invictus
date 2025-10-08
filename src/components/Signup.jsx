// src/components/SignUp.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Ensure this file exists with the styles defined below
import Banner from '../shared/Banner';
import Logo from './Logo'; // Import the Logo component
import { Link } from 'react-router-dom';
import banner from '../assets/banner photo1.png'; // Ensure the image path is correct

const SignUp = () => {
  const heading = 'Create your account';
  const subheading =
    'We are dedicated to revolutionizing the maritime industry with our eco-friendly, intelligent unmanned marine vehicles. Our mission is to innovate and lead the way in marine technology, ensuring a sustainable and efficient future for the industry.';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  /** @type {import('react').FormEventHandler<HTMLFormElement>} */

  const handleSignUp = (e) => {
    e.preventDefault();
    // Placeholder for sign-up logic
    // For now, just navigate to home page after sign-up
    localStorage.setItem('authenticated', 'true');
    navigate('/home');
  };

  return (
    <div className="mt-20">
      <Banner banner={banner} heading={heading} subsheading={subheading} />
      <div className="signup-container container mx-auto py-12 px-4 md:px-0">
        <Logo />
        <div className="signup-form">
          <h2>Create an Account</h2>
          <form onSubmit={handleSignUp}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
          <div className="signin-link">
            Already have an account? <Link to="/signin">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
