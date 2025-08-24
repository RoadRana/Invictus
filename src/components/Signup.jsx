import  { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; 
import Banner from '../shared/Banner';
import Logo from './Logo'; 
import { Link } from 'react-router-dom';
import banner from '../assets/banner photo1.png';
import StaffLogin from "./Stafflogin.jsx"; 


const SignUp = () => {
    const bannerImage = "../assets/banner photo1.png"; 
    const heading = "Create your account";
    const subheading = "We are dedicated to revolutionizing the maritime industry with our eco-friendly, intelligent unmanned marine vehicles. Our mission is to innovate and lead the way in marine technology, ensuring a sustainable and efficient future for the industry.";

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        // Placeholder for sign-up logic for now only navigate for homepage
        localStorage.setItem('authenticated', true);
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
                        <button type="submit" className="signup-button">Sign Up</button>
                    </form>
                    <div className="signin-link mb-4">
                        Already have an account?   <Link to="/signin">Sign In</Link>
                    </div>
                    <div className={ "staff-login"}>
                        <StaffLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;