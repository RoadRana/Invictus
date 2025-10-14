import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';
import Banner from '../shared/Banner';
import Logo from './Logo';
import banner from '../assets/banner photo1.png';
import apiConfig from '../config/api';

const joinURL = (base, path) =>
  new URL(path.replace(/^\/+/, ''), base.replace(/\/+$/, '/')).toString();
const REGISTER_URL = joinURL(apiConfig.baseURL, 'users/api/register/');

export default function SignUp() {
  const heading = 'Create your Invictus account';
  const subheading =
    'Sign up to request quotes faster, track orders, and explore our ASV/ROV solutions. Built for professionals who value precision and sustainability.';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirm_password: confirmPassword,
        }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch (e) {
       console.error(error)
      }

      if (!res.ok) {
        const backendMsg =
          data?.detail ||
          data?.message ||
          data?.error ||
          (typeof data === 'string' ? data : null);
        setError(
          backendMsg || `Registration failed: ${res.status} ${res.statusText}`
        );
        return;
      }

      setMsg('Account created successfully.');
      navigate('/signin');
    } catch (err) {
      setError(err?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20">
      <Banner banner={banner} heading={heading} subheading={subheading} />

      <section className="signup-wrap container mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Brand column */}
          <aside className="brand-card">
            <div className="brand-card__inner">
              <Logo />
              <h2 className="brand-title text-primary">
                Purpose-built for{' '}
                <span className="accent-underline">marine teams</span>
              </h2>
              <p className="brand-sub">
                Request quotes faster, track orders, and manage support in one
                secure place.
              </p>
              <ul className="brand-list">
                <li>
                  <span>🔐</span> Enterprise-grade security
                </li>
                <li>
                  <span>⚡</span> Rapid quoting & status updates
                </li>
                <li>
                  <span>🌿</span> Sustainable by design
                </li>
              </ul>
              <p className="brand-footnote">
                Questions?{' '}
                <Link to="/contact" className="link-primary">
                  Contact us
                </Link>
              </p>
            </div>
          </aside>

          {/* Form column */}
          <div className="signup-container">
            <div className="signup-form">
              <h3 className="form-title text-primary">Create an Account</h3>

              {error && <div className="alert alert-danger">{error}</div>}
              {msg && <div className="alert alert-success">{msg}</div>}

              <form onSubmit={handleSignUp} className="form-grid">
                <div className="form-group">
                  <label htmlFor="name" className="label">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                    className="themed-input "
                    placeholder="Your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="themed-input"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="label">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    minLength={6}
                    required
                    className="themed-input"
                    placeholder="Minimum 6 characters"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="label">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    minLength={6}
                    required
                    className="themed-input"
                    placeholder="Retype your password"
                  />
                </div>

                <button
                  type="submit"
                  className={`btn w-full h-11 px-5 ${loading ? 'btn--loading' : ''}`}
                  disabled={loading}
                  aria-busy={loading ? 'true' : 'false'}
                >
                  <span className="btn__label">
                    {loading ? 'Signing up...' : 'Sign Up'}
                  </span>
                  <span className="btn__spinner" aria-hidden="true" />
                </button>
              </form>

              <p className="signin-line">
                Already have an account?{' '}
                <Link to="/signin" className="link-primary">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
