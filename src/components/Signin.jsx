import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signin.css';
import Banner from '../shared/Banner'; // Correct path to Banner
import banner from '../assets/banner photo1.png'; // Ensure the image path is correct
import Logo from './Logo'; // Import the Logo component

const SignIn = () => {
    const heading = "Create your account";
    const subheading = "We are dedicated to revolutionizing the maritime industry with our eco-friendly, intelligent unmanned marine vehicles. Our mission is to innovate and lead the way in marine technology, ensuring a sustainable and efficient future for the industry.";

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();
        // Placeholder for sign-in logic
        localStorage.setItem('authenticated', true);
        localStorage.setItem('username', username); // Save username to localStorage
        localStorage.setItem('email', 'user@example.com'); // Save email to localStorage
        navigate('/profile');
    };

    return (
        <div className="mt-20">
            <Banner banner={banner} heading={heading} subsheading={subheading} />

            <div className="signin-container container mx-auto py-12 px-4 md:px-0">
                <Logo />
                <div className="signin-form">
                    <h2>Sign In</h2>
                    <form onSubmit={handleSignIn}>
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
                        <button type="submit" className="signin-button">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
