// src/pages/Home.jsx
import { Link } from "react-router-dom";
import Banner from "../shared/Banner";
import { Reveal } from "../shared/reveal";

import {
  FaCogs, FaBrain, FaLeaf, FaDollarSign, FaBullseye, FaDatabase, FaClock, FaShieldAlt,
} from "react-icons/fa";

import banner from "../assets/banner photo1.png";
import sectionImage from "../assets/banner photo1.png";
import specializationImage from "../assets/main-page_04.png";

const Home = () => {
  const heading = "Innovating Green, Navigating Blue";
  const subheading =
    "Revolutionizing Maritime Industries with Eco-Friendly, Intelligent Unmanned Marine Vehicles.";

  return (
    <div >
      {/* HERO */}
      <Banner banner={banner} heading={heading} subsheading={subheading}>
        <div className="flex flex-wrap gap-3 md:gap-4 mt-5">
          <Link to="/about" aria-label="Learn More">
            <button className="btn btn-primary h-11 px-5 text-[0.95rem]">
              Learn More Now!
            </button>
          </Link>
          <Link to="/contact" aria-label="Get a Free Quote">
            <button className="btn btn btn-primary h-11 px-5  text-[0.95rem]">
              Get A Free Quote
            </button>
          </Link>
        </div>
      </Banner>

      {/* INTRO */}
      <section className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-10 items-center">
          <Reveal y={8}>
            <div>
              <h2 className="text-[clamp(1.375rem,3vw,2rem)] font-extrabold tracking-tight mb-2">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Invictus UMVs
                </span>
              </h2>
              <p className="text-[clamp(1rem,2vw,1.125rem)] text-muted mb-4">
                Where Innovation Sails with Sustainability
              </p>
              <p className="text-[clamp(0.95rem,1.8vw,1.0625rem)] leading-relaxed text-muted mb-4">
                Step into a world where technology sails sustainably with
                Invictus UMVs. Powered by clean energy and enriched with
                cutting-edge AI, our marine vehicles navigate the ocean with
                precision and a profound commitment to the ecosystem.
              </p>
              <p className="text-[clamp(0.95rem,1.8vw,1.0625rem)] leading-relaxed text-muted">
                Your gateway to intelligent marine exploration begins here—where
                every ripple echoes with innovation, and every tide promises new
                possibilities.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="text-sm text-muted hover:text-secondary transition-colors"
                >
                  Products →
                </Link>
                <Link
                  to="/services"
                  className="text-sm text-muted hover:text-secondary transition-colors"
                >
                  Services →
                </Link>
                <Link
                  to="/contact"
                  className="text-sm text-muted hover:text-secondary transition-colors"
                >
                  Contact →
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Larger, frameless image */}
          <Reveal delay={0.06} y={8}>
            <div className="flex justify-center md:justify-end">
              <img
                src={sectionImage}
                alt="Welcome Aboard"
                className="rounded-3xl w-full max-w-[min(92vw,960px)] md:max-w-[620px] lg:max-w-[720px]
                           h-auto object-cover drop-shadow-lg transform-gpu transition-transform duration-400 ease-apple hover:scale-[1.01]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* BIG CTA (gradient pill) */}
      <section className="container mx-auto px-4 md:px-6">
        <Reveal y={10}>
          <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 shadow-soft">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90" />
            <div className="relative">
              <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-extrabold tracking-tight text-white mb-2">
                Get Your Free Quote NOW!
              </h2>
              <p className="text-white/92 text-[clamp(1rem,2.2vw,1.125rem)] max-w-2xl mb-7">
                Looking for cutting-edge ROVs, ASVs, and expert underwater
                services? Dive into a world of possibilities with Invictus UMVs.
              </p>
              <Link to="/contact">
                <button className="inline-flex items-center h-11 px-5 rounded-2xl font-semibold text-primary bg-white hover:bg-white/95 transition-colors">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SPECIALIZATION */}
      <section className="container mx-auto py-14 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.05fr] gap-12 items-center">
          <Reveal y={8}>
            <div className="flex justify-center md:justify-start">
              <img
                src={specializationImage}
                alt="Our Specialization"
                className="rounded-3xl w-full max-w-[min(92vw,960px)] md:max-w-[620px] lg:max-w-[720px]
                           h-[clamp(300px,42vw,460px)] object-cover drop-shadow-lg transform-gpu transition-transform duration-400 ease-apple hover:scale-[1.01]"
              />
            </div>
          </Reveal>

          <Reveal delay={0.06} y={8}>
            <div>
              <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-extrabold tracking-tight mb-2">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Our Specialization
                </span>
              </h2>
              <p className="text-[clamp(1rem,2.2vw,1.125rem)] text-muted mb-6">
                We merge innovation with functionality, delivering solutions
                engineered with precision for modern marine operations—from oil
                &amp; gas to offshore and marine science.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Chip icon={<FaCogs />} label="Modularity" />
                <Chip icon={<FaBrain />} label="Intelligent Systems" />
                <Chip icon={<FaLeaf />} label="Sustainability" />
                <Chip icon={<FaDollarSign />} label="Cost-effective" />
                <Chip icon={<FaBullseye />} label="Accuracy" />
                <Chip icon={<FaDatabase />} label="Comprehensive Data" />
                <Chip icon={<FaClock />} label="Real-time Operations" />
                <Chip icon={<FaShieldAlt />} label="Safe & High Endurance" />
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container mx-auto px-4 md:px-6 mb-14">
        <Reveal y={8}>
          <div className="text-center">
            <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-extrabold tracking-tight mb-2">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>
            <p className="text-[clamp(1rem,2.2vw,1.125rem)] text-muted mb-7">
              Empowering Maritime Operations with Advanced Underwater Technology
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/products">
                <button className="btn h-11 px-5">View Products</button>
              </Link>
              <Link to="/services">
                <button className="btn btn-surface h-11 px-5">
                  View Services
                </button>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

function Chip({ icon, label }) {
  return (
    <li className="group flex items-center gap-3 rounded-2xl px-4 py-3
                   bg-white/5 hover:bg-white/8 border border-white/10
                   transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:shadow-soft">
      <span className="inline-grid place-items-center rounded-xl w-9 h-9
                       bg-gradient-to-br from-primary to-secondary text-white">
        <span className="text-[0.9rem]">{icon}</span>
      </span>
      <span className="text-[clamp(0.95rem,1.8vw,1.0625rem)] text-muted group-hover:text-secondary transition-colors">
        {label}
      </span>
    </li>
  );
}

export default Home;
