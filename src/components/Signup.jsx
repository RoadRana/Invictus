import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";
import Banner from "../shared/Banner";
import Logo from "./Logo";
import banner from "../assets/banner photo1.png";
import StaffLogin from "./Stafflogin.jsx";
import apiConfig from "../config/api";

// Avoid double slashes when joining URLs
const joinURL = (base, path) =>
  new URL(path.replace(/^\/+/, ""), base.replace(/\/+$/, "/")).toString();

const REGISTER_URL = joinURL(apiConfig.baseURL, "users/api/register/");

const SignUp = () => {
  const heading = "Create your account";
  const subheading =
    "We are dedicated to revolutionizing the maritime industry with our eco-friendly, intelligent unmanned marine vehicles. Our mission is to innovate and lead the way in marine technology, ensuring a sustainable and efficient future for the industry.";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(""); // success/info message
  const [error, setError] = useState(""); // error message

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirm_password: confirmPassword,
        }),
      });

      // Try to parse any JSON response (errors or success)
      let data = null;
      try {
        data = await res.json();
      } catch {
        // non-JSON response
      }

      if (!res.ok) {
        // Prefer backend error message if present
        const backendMsg =
          data?.detail ||
          data?.message ||
          data?.error ||
          (typeof data === "string" ? data : null);
        setError(
          backendMsg || `Registration failed: ${res.status} ${res.statusText}`
        );
        return;
      }

      // Success
      setMsg("Account created successfully.");

      // If your API returns a token and you want to auto-login, uncomment:
      // if (data?.token) {
      //   localStorage.setItem("token", data.token);
      //   localStorage.setItem("authenticated", "true");
      //   navigate("/home");
      //   return;
      // }

      // Otherwise, send them to sign-in
      navigate("/signin");
    } catch (err) {
      setError(err?.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20">
      {/* If your Banner expects 'subsheading', change the prop name below to match */}
      <Banner banner={banner} heading={heading} subheading={subheading} />

      <div className="signup-container container mx-auto py-12 px-4 md:px-0">
        <Logo />

        <div className="signup-form">
          <h2>Create an Account</h2>

          {/* Feedback messages */}
          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm bg-rose-50 text-rose-700">
              {error}
            </div>
          )}
          {msg && (
            <div className="mb-4 p-3 rounded-lg text-sm bg-emerald-50 text-emerald-700">
              {msg}
            </div>
          )}

          <form onSubmit={handleSignUp}>
            <div className="form-group">
              <label htmlFor="name">Full Name:</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>

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

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                minLength={6}
                required
              />
            </div>

            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
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
