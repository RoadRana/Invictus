import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import Banner from "../shared/Banner";
import banner from "../assets/banner photo1.png";
import Logo from "./Logo";
import apiConfig from "../config/api";

// helper to avoid double slashes
const joinURL = (base, path) =>
  new URL(path.replace(/^\/+/, ""), base.replace(/\/+$/, "/")).toString();

const LOGIN_URL = joinURL(apiConfig.baseURL, "users/api/login/");

// Configure your access rule here:
const REQUIRED_PERMISSION = "view_profiles"; // change if your permission codename differs
const ALLOWED_ROLES = ["admin", "staff","client","publisher","ros","software engineer"]; // add role names allowed to access /profiles

const extractToken = (data) =>
  data?.access || data?.token || data?.key || data?.jwt || null;

function parseJwt(token) {
  try {
    const [id,payload] = token.split(".");
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
}

function collectRolesAndPerms(payloadOrResponse) {
  const roles = new Set();
  const perms = new Set();

  const user = payloadOrResponse?.user || payloadOrResponse || {};

  const addRoles = (arr) =>
    Array.isArray(arr) &&
    arr.forEach((r) => roles.add(typeof r === "string" ? r : r?.name));
  const addPerms = (arr) =>
    Array.isArray(arr) &&
    arr.forEach((p) =>
      perms.add(typeof p === "string" ? p : p?.code || p?.codename || p?.name)
    );

  addRoles(payloadOrResponse?.roles);
  addPerms(payloadOrResponse?.permissions);
  addRoles(user?.roles);
  addPerms(user?.permissions);
  addRoles(user?.groups);
  Array.isArray(user?.roles) &&
    user.roles.forEach((r) => addPerms(r?.permissions));

  const tok = extractToken(payloadOrResponse);
  if (tok) {
    const claims = parseJwt(tok);
    addRoles(claims?.roles);
    addPerms(claims?.permissions);
  }

  return {
    roles: Array.from(roles).filter(Boolean),
    permissions: Array.from(perms).filter(Boolean),
  };
}

const SignIn = () => {
  const heading = "Create your account";
  const subheading =
    "We are dedicated to revolutionizing the maritime industry with our eco-friendly, intelligent unmanned marine vehicles. Our mission is to innovate and lead the way in marine technology, ensuring a sustainable and efficient future for the industry.";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const text = await res.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {}

      if (!res.ok) {
        const backendMsg =
          data?.detail || data?.message || data?.error || text || "Bad Request";
        setError(`Login failed (${res.status}): ${backendMsg}`);
        return;
      }

      // Save token + user
      const token = extractToken(data);
      if (token) localStorage.setItem("token", token);
      if (data?.user) localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("authenticated", "true");

      // prefer username from backend if present
      const uname = data?.user?.username || data?.username || username;
      localStorage.setItem("username", uname);

      // ✅ resolve profile id (from user_id field), with safe fallbacks
      const claims = token ? parseJwt(token) : null;
      const profileId =
        data?.user_id ?? // <--- primary field you asked for
        data?.profile_id ?? // common alt field
        data?.user?.id ?? // if backend nests it under user
        claims?.user_id ?? // JWT claim fallback
        claims?.id ?? // alt claim fallback
        claims?.sub ?? // alt claim fallback
        null;

      if (!profileId) {
        // If your backend ever returns no id, still land on /profile (it will try to resolve)
        setMsg("Signed in, but no user_id returned.");
        navigate("/profile");
        return;
      }

      // keep it around for later
      localStorage.setItem("profileId", String(profileId));

      // Permission / role check (unchanged)
      const { roles, permissions } = collectRolesAndPerms({ ...data, token });
      const okByPerm = REQUIRED_PERMISSION
        ? permissions
            .map(String)
            .map((p) => p.toLowerCase())
            .includes(REQUIRED_PERMISSION.toLowerCase())
        : false;
      const okByRole = roles
        .map(String)
        .map((r) => r.toLowerCase())
        .some((r) => ALLOWED_ROLES.map((a) => a.toLowerCase()).includes(r));

      if (!(okByPerm || okByRole)) {
        setError(
          "You don’t have permission to access Profiles. Please contact an administrator."
        );
        localStorage.removeItem("authenticated");
        if (token) localStorage.removeItem("token");
        return;
      }

      setMsg("Signed in successfully.");
      // 👉 redirect using the dynamic id from user_id
      navigate(`/profile/${profileId}`);
    } catch (err) {
      setError(err?.message || "Network error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="mt-20">
      {/* This component used 'subsheading' previously */}
      <Banner banner={banner} heading={heading} subsheading={subheading} />

      <div className="signin-container container mx-auto py-12 px-4 md:px-0">
        <Logo />
        <div className="signin-form">
          <h2>Sign In</h2>

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

          <form onSubmit={handleSignIn}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                minLength={6}
              />
            </div>
            <button type="submit" className="signin-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
