// src/shared/Navbar.jsx
import { useState } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaBars,
  FaTimes,
  FaLinkedinIn,
  FaSearch,
} from 'react-icons/fa';
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import ThemeToggle from '../shared/ThemeToggle';

const NAV = [
  { label: 'Home', path: '/home' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Products', path: '/products' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <>
      <nav
        className="
          fixed top-0 inset-x-0 z-50
          bg-[var(--surface)]/80 backdrop-blur
          border-b border-white/10
          shadow-soft
        "
        role="navigation"
        aria-label="Main"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="h-16 flex items-center justify-between gap-4">
            {/* Left: logo + desktop links */}
            <div className="flex items-center gap-8">
              <Link to="/home" className="inline-flex items-center gap-2">
                <img
                  src={logo}
                  alt="Invictus UMVs"
                  className="h-10 w-auto rounded-md object-contain"
                />
              </Link>

              {/* Desktop nav w/ animated underline */}
              <ul className="hidden md:flex items-center gap-2">
                {NAV.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={close}
                      className={({ isActive }) =>
                        [
                          'relative px-3 py-2 rounded-xl transition-colors duration-200',
                          'text-primary hover:text-secondary',
                          // underline (hover + active)
                          "after:content-[''] after:absolute after:left-3 after:right-3 after:-bottom-[3px]",
                          'after:h-[2px] after:rounded-full after:origin-left',
                          'after:bg-gradient-to-r after:from-primary after:to-secondary',
                          isActive
                            ? 'text-secondary after:scale-x-100'
                            : 'after:scale-x-0 hover:after:scale-x-100',
                          'after:transition-transform after:duration-300 after:ease-apple',
                        ].join(' ')
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: search + socials + CTA (desktop) */}
            <div className="hidden md:flex items-center gap-4">
              {/* Search input */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="hidden lg:flex items-center gap-2 h-10 px-3 rounded-xl
                           bg-[var(--surface)]/90 backdrop-blur border border-white/10 shadow-soft"
                role="search"
              >
                <FaSearch className="text-primary" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="bg-transparent outline-none text-sm text-primary placeholder:text-primary w-40 lg:w-56"
                />
              </form>

              <a
                href="/"
                className="hidden lg:inline-flex text-primary hover:text-secondary"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="/"
                className="hidden lg:inline-flex text-primary hover:text-secondary"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="/"
                className="hidden lg:inline-flex text-primary hover:text-secondary"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/company/invictusumvs/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex text-primary hover:text-secondary"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <ThemeToggle />
              <Link to="/signup">
                <button className="btn h-10 px-4 text-primary text-sm hover:text-secondary">
                  Sign Up
                </button>
              </Link>

              {/* Mobile hamburger */}
              <button
                className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border border-white/10 text-primary] hover:bg-white/5 transition-colors"
                onClick={toggle}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="mobile-menu"
              >
                {open ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Separate mobile button (visible < md) */}
            <button
              className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border border-white/10 text-primary] hover:bg-white/5 transition-colors"
              onClick={toggle}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer + backdrop */}
      <div
        id="mobile-menu"
        className={[
          'md:hidden fixed top-16 inset-x-0 z-40',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
      >
        {/* Backdrop */}
        <div
          className={[
            'fixed inset-0 bg-black/40 transition-opacity',
            open ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onClick={close}
        />

        {/* Sheet */}
        <div
          className={[
            'relative mx-3 rounded-2xl border border-white/10',
            'bg-[var(--surface)]/95 backdrop-blur shadow-soft',
            'transition-transform duration-300 ease-apple',
            open ? 'translate-y-0' : '-translate-y-2',
          ].join(' ')}
        >
          <div className="px-4 py-4">
            {/* Mobile search */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 h-10 px-3 rounded-xl bg-white/5 border border-white/10"
            >
              <FaSearch className="text-primary" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm text-primary placeholder:text-primary w-full"
              />
            </form>

            <ul className="mt-3 flex flex-col gap-1">
              {NAV.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={close}
                    className={({ isActive }) =>
                      [
                        'group block px-2 py-2 rounded-xl transition-colors relative',
                        isActive
                          ? 'text-primary bg-white/5'
                          : 'text-primary hover:bg-white/6',
                        // mobile underline accent (subtle)
                        "after:content-[''] after:absolute after:left-2 after:right-2 after:-bottom-[2px] after:h-[2px] after:rounded-full",
                        'after:bg-gradient-to-r after:from-primary after:to-secondary',
                        isActive
                          ? 'after:opacity-100'
                          : 'after:opacity-0 group-hover:after:opacity-100',
                        'after:transition-opacity after:duration-300 after:ease-apple',
                      ].join(' ')
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex items-center gap-3">
              <Link to="/signup" onClick={close} className="flex-1">
                <button className="btn w-full h-10 text-sm">Sign Up</button>
              </Link>
              <a
                href="https://www.linkedin.com/company/invictusumvs/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-primary hover:bg-white/6 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to avoid content underlap */}
      <div className="h-16" />
    </>
  );
}
