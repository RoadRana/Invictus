// src/pages/Profile.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Banner from "../shared/Banner";
import banner from "../assets/banner photo1.png";
import apiConfig from "../config/api";

// --- helpers ---
const joinURL = (base, path) =>
  new URL(path.replace(/^\/+/, ""), base.replace(/\/+$/, "/")).toString();

const parseJwt = (t) => {
  try {
    const [, p] = t.split(".");
    return JSON.parse(atob(p.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
};

const H = () => {
  const t = localStorage.getItem("token");
  return t
    ? { Accept: "application/json", Authorization: `Bearer ${t}` }
    : { Accept: "application/json" };
};

// Known URLs
const PROFILE_BY_ID_URL = (id) =>
  joinURL(apiConfig.baseURL, `users/api/view_profile/${id}/`);



const prettyDate = (iso) => {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso ?? "";
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso ?? "";
  }
};

// --- component ---
export default function Profile() {
  // Support BOTH routes:
  //   /profile/:id
  //   /profile/u/:username
  const params = useParams();
  const routeId = params.id;
  const routeUsername = params.username;
  const navigate = useNavigate();

  // Resolve keyType ('id'|'username') + value from:
  // 1) route param
  // 2) localStorage (profileId, username, user object)
  // 3) JWT claims
  const [keyType, setKeyType] = useState(() => {
    if (routeUsername && String(routeUsername).trim()) return "username";
    if (routeId && /^\d+$/.test(routeId)) return "id";
    return ""; // undecided yet
  });
  const [keyValue, setKeyValue] = useState(() => {
    if (routeUsername && String(routeUsername).trim()) return routeUsername;
    if (routeId && /^\d+$/.test(routeId)) return routeId;

    // LocalStorage fallbacks
    const storedId = localStorage.getItem("profileId");
    if (storedId && /^\d+$/.test(storedId)) {
      return storedId;
    }
    const storedUsername = localStorage.getItem("username");
    if (storedUsername && String(storedUsername).trim()) {
      return storedUsername.trim();
    }
    try {
        const u = JSON.parse(localStorage.getItem("user") || "null");
        console.log("user",u)
      if (u?.id) return String(u.id);
      if (u?.username) return String(u.username);
      if (typeof u === "number") return String(u);
    } catch {}

    // JWT claims
    const tok = localStorage.getItem("token");
    if (tok) {
      const c = parseJwt(tok);
      const claimId = c?.user_id || c?.id || c?.sub;
      if (claimId) return String(claimId);
      const claimUsername = c?.username || c?.preferred_username || c?.email;
      if (claimUsername) return String(claimUsername);
    }
    return "";
  });

  // If we got a value but no type yet, infer it
  useEffect(() => {
    if (!keyType && keyValue) {
      setKeyType(/^\d+$/.test(keyValue) ? "id" : "username");
    }
  }, [keyType, keyValue]);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Fetcher that handles both id + username paths
  useEffect(() => {
    let alive = true;

    const fetchById = async (id) => {
      const res = await fetch(PROFILE_BY_ID_URL(id), { headers: H() });
      const text = await res.text();
      if (!res.ok) throw new Error(text || res.statusText);
      return text ? JSON.parse(text) : {};
    };

   

    const run = async () => {
      if (!keyType || !keyValue) return;
      setLoading(true);
      setErr("");
      try {
        const data =
          keyType === "id"
            ? await fetchById(keyValue)
            : await fetchByUsername(keyValue);
        if (!alive) return;
        setProfile(data?.data ?? data);
      } catch (e) {
        if (!alive) return;
        setErr(e?.message || "Network error");
      } finally {
        if (alive) setLoading(false);
      }
    };

    run();
    return () => {
      alive = false;
    };
  }, [keyType, keyValue]);

  // Avatar resolver (handles relative media paths)
  const avatarSrc = useMemo(() => {
    const p = profile?.profile_image;
    if (!p) return null;
    try {
      return new URL(p, apiConfig.baseURL).toString();
    } catch {
      return p;
    }
  }, [profile]);

  const roles = Array.isArray(profile?.role) ? profile.role : [];
  const usernameLS = localStorage.getItem("username") || "User";
  const heading = `Welcome ${usernameLS} to your profile`;

  // Manual rescue inputs (never block user)
  const [manualUsername, setManualUsername] = useState("");

  



  return (
    <div className="mt-20">
      <Banner banner={banner} heading={heading} subsheading="" />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Rescue UI if we couldn't resolve anything */}
        {!keyValue && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 text-amber-800">
            <div className="mb-2 font-semibold">
              We couldn’t determine which profile to load.
            </div>
            <div className="grid gap-3 md:grid-cols-2">
             
              <form onSubmit={handleManualUsername} className="flex gap-2">
                <input
                  className="px-3 py-2 border rounded-lg w-full"
                  placeholder="Enter username…"
                  value={manualUsername}
                  onChange={(e) => setManualUsername(e.target.value)}
                />
                <button className="px-3 py-2 rounded-lg bg-primary text-white">
                  Load by Username
                </button>
              </form>
            </div>
            <div className="mt-3">
              <button
                className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-sm"
                onClick={() => navigate("/signin")}
              >
                Go to Sign In
              </button>
            </div>
          </div>
        )}

        {/* Error box */}
        {err && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 text-rose-700 text-sm">
            {err}
            <div className="mt-3 flex gap-3">
              <button
                className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
                onClick={() => navigate("/signin")}
              >
                Go to Sign In
              </button>
              <button
                className="px-3 py-1.5 rounded-lg bg-primary text-white hover:opacity-90"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow">
              <div className="w-28 h-28 rounded-full bg-gray-200 mb-4" />
              <div className="h-5 bg-gray-200 w-40 mb-2 rounded" />
              <div className="h-4 bg-gray-200 w-56 rounded" />
            </div>
            <div className="bg-white rounded-2xl p-6 shadow lg:col-span-2">
              <div className="h-5 bg-gray-200 w-48 mb-4 rounded" />
              <div className="h-4 bg-gray-200 w-full mb-2 rounded" />
              <div className="h-4 bg-gray-200 w-5/6 rounded" />
            </div>
          </div>
        )}

        {/* Content */}
        {!loading && profile && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left card */}
            <div className="bg-white rounded-2xl p-6 shadow">
              <div className="flex flex-col items-center text-center">
                <img
                  src={avatarSrc || "/media/profile/user-default.png"}
                  onError={(e) =>
                    (e.currentTarget.src = "/media/profile/user-default.png")
                  }
                  alt={profile?.name || profile?.username}
                  className="w-28 h-28 rounded-full object-cover border"
                />
                <h2 className="mt-4 text-xl font-semibold text-primary">
                  {profile?.name || profile?.username}
                </h2>
                <p className="text-sm text-gray-600">{profile?.email}</p>

                {Array.isArray(profile?.role) && profile.role.length > 0 && (
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {profile.role.map((r) => (
                      <span
                        key={r.id || r.name}
                        className="px-2.5 py-1 rounded-full text-xs bg-gray-100 text-primary border"
                        title={r.role_type ? `Type: ${r.role_type}` : ""}
                      >
                        {r.name}
                        {r.role_type ? (
                          <span className="text-gray-500">{` • ${r.role_type}`}</span>
                        ) : null}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 w-full text-left text-sm space-y-2">
                  <div>
                    <span className="font-medium">Joined: </span>
                    <span className="text-gray-700">
                      {prettyDate(profile?.created)}
                    </span>
                  </div>
                  {profile?.updated && (
                    <div>
                      <span className="font-medium">Updated: </span>
                      <span className="text-gray-700">
                        {prettyDate(profile?.updated)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-6 w-full">
                  <Link
                    to="/profile"
                    className="w-full inline-flex justify-center px-3 py-2 rounded-lg border hover:bg-gray-50 text-sm"
                  >
                    Back to profile
                  </Link>
                </div>
              </div>
            </div>

            {/* Right card */}
            <div className="bg-white rounded-2xl p-6 shadow lg:col-span-2">
              <h3 className="text-lg font-semibold text-primary">About</h3>
              <p className="mt-1 text-sm text-gray-600">
                Username:{" "}
                <span className="font-medium">{profile?.username}</span>
              </p>

              <div className="mt-5">
                <h4 className="text-sm font-semibold mb-2">Bio</h4>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {profile?.bio?.trim() ? profile.bio : "No bio yet."}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50">
                  <div className="text-xs text-gray-500 mb-1">Email</div>
                  <div className="text-sm">{profile?.email}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <div className="text-xs text-gray-500 mb-1">Location</div>
                  <div className="text-sm">{profile?.location || "—"}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <div className="text-xs text-gray-500 mb-1">Role Count</div>
                  <div className="text-sm">
                    {Array.isArray(profile?.role) ? profile.role.length : 0}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gray-50">
                  <div className="text-xs text-gray-500 mb-1">Member Since</div>
                  <div className="text-sm">{prettyDate(profile?.created)}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
}
