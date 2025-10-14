// src/shared/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-12" role="contentinfo">
      {/* Brand gradient hairline */}
      <div className="h-[2px] bg-gradient-to-r from-primary via-white/20 to-secondary opacity-80" />

      {/* Surface body */}
      <div className="bg-[var(--surface)]/90 backdrop-blur border-t border-white/10 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* About */}
            <div>
              <h3 className="text-lg md:text-xl font-bold leading-snug text-[var(--text)]">
                Revolutionizing Maritime Industries with eco-friendly,
                intelligent unmanned marine vehicles.
              </h3>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-base md:text-lg font-semibold text-[var(--text)] mb-3">
                Our Company
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-[var(--muted)] hover:text-secondary transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-[var(--muted)] hover:text-secondary transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-[var(--muted)] hover:text-secondary transition-colors"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-[var(--muted)] hover:text-secondary transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-base md:text-lg font-semibold text-[var(--text)] mb-3">
                Our Services
              </h4>
              <ul className="space-y-2 text-[var(--muted)]">
                <li>Research &amp; Development</li>
                <li>Inspection</li>
                <li>Exploration</li>
                <li>Environmental Assessment</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-base md:text-lg font-semibold text-[var(--text)] mb-3">
                Contact Details
              </h4>
              <p className="text-[var(--muted)]">
                398 Abu Qir Street, Mostafa Kamel, Al Fanar Tower, Alexandria
                Governorate
              </p>
              <p className="text-[var(--muted)] mt-2">
                Phone:{' '}
                <a
                  href="tel:+201006584054"
                  className="underline decoration-transparent hover:decoration-inherit hover:text-secondary transition-colors"
                >
                  +20 100 658 4054
                </a>
              </p>
              <p className="text-[var(--muted)] mt-1">
                Email:{' '}
                <a
                  href="mailto:info@invictusumvs.com"
                  className="underline decoration-transparent hover:decoration-inherit hover:text-secondary transition-colors"
                >
                  info@invictusumvs.com
                </a>
              </p>
            </div>
          </div>

          {/* Divider + legal */}
          <div className="mt-10 border-t border-white/10 pt-4 text-center">
            <p className="text-sm text-[var(--subtler)]">
              &copy; {new Date().getFullYear()} INVICTUS UMVs. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
