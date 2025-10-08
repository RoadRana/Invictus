import Banner from "../shared/Banner";
import { Link } from "react-router-dom";
import {
  FaCogs,
  FaBrain,
  FaLeaf,
  FaDollarSign,
  FaBullseye,
  FaDatabase,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";

import banner from "../assets/banner photo1.png";
import sectionImage from "../assets/banner photo1.png";
import specializationImage from "../assets/main-page_04.png";

const Home = () => {
  const heading = "Innovating Green, Navigating Blue";
  const subheading =
    "Revolutionizing Maritime Industries with Eco-Friendly, Intelligent Unmanned Marine Vehicles.";

  return (
    <div className="mt-20">
      {/* Hero */}
      <Banner banner={banner} heading={heading} subheading={subheading}>
        <div className="flex justify-start gap-8 mt-12">
          <button
            className="py-2 px-4 rounded shadow-xl bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold hover:from-teal-400 hover:to-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            aria-label="Learn More Now"
          >
            Learn More Now!
          </button>
          <button
            className="py-2 px-4 rounded shadow-xl bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold hover:from-teal-400 hover:to-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            aria-label="Get A Free Quote"
          >
            Get A Free Quote
          </button>
        </div>
      </Banner>

      {/* Intro */}
      <div className="container mx-auto py-12 px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center md:justify-start">
            <img
              src={sectionImage}
              alt="Welcome Aboard"
              className="rounded-lg shadow-lg w-[400px] max-w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-primary mb-4">
              Invictus UMVs
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Where Innovation Sails with Sustainability
            </p>
            <p className="text-lg text-justify text-gray-600 mb-4">
              Step into a world where technology sails sustainably with Invictus
              UMVs. Powered by clean energy and enriched with cutting-edge AI,
              our marine vehicles navigate the depth and breadth of the ocean
              with unparalleled precision and a profound commitment to the
              ecosystem.
            </p>
            <p className="text-lg text-justify text-gray-600">
              Your gateway to intelligent marine exploration begins here — where
              every ripple echoes with innovation, and every tide promises new
              possibilities.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="grid grid-cols-1">
        <div className="container mx-auto py-12 px-4 md:px-0">
          <div
            className="items-center p-8 rounded-lg shadow-lg mt-2"
            style={{ background: "white", width: "100%" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 ml-4">
              Get Your Free Quote NOW!
            </h2>
            <p className="text-lg text-justify text-gray-600 mb-8 ml-4">
              Looking for cutting-edge ROVs, ASVs, and expert underwater
              services? Dive into a world of possibilities with Invictus UMVs.
            </p>
            <Link to="/contact" className="ml-4 inline-block">
              <button className="py-2 px-4 rounded shadow-xl bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold hover:from-teal-400 hover:to-blue-500 transition duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Specialization */}
      <div className="container mx-auto py-12 px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center md:justify-start">
            <img
              src={specializationImage}
              alt="Our Specialization"
              className="rounded-lg shadow-lg w-[400px] h-[400px] object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Specialization
            </h2>
            <p className="text-lg text-justify text-gray-600 mb-4 mt-5">
              We merge innovation with functionality, delivering solutions
              engineered with precision, representing values essential to modern
              marine operations. Whether you’re in the oil and gas sector,
              offshore industries, or the realm of marine science, our
              specialties resonate with your needs. Dive into the essence of
              what we bring to the waves.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">
              <div className="flex items-center mb-2">
                <FaCogs className="text-primary mr-2" />
                <span className="text-gray-700">Modularity</span>
              </div>
              <div className="flex items-center mb-2">
                <FaBrain className="text-primary mr-2" />
                <span className="text-gray-700">Intelligent Systems</span>
              </div>
              <div className="flex items-center mb-2">
                <FaLeaf className="text-primary mr-2" />
                <span className="text-gray-700">Sustainability</span>
              </div>
              <div className="flex items-center mb-2">
                <FaDollarSign className="text-primary mr-2" />
                <span className="text-gray-700">Cost-effective</span>
              </div>
              <div className="flex items-center mb-2">
                <FaBullseye className="text-primary mr-2" />
                <span className="text-gray-700">Accuracy</span>
              </div>
              <div className="flex items-center mb-2">
                <FaDatabase className="text-primary mr-2" />
                <span className="text-gray-700">
                  Comprehensive Data Collection
                </span>
              </div>
              <div className="flex items-center mb-2">
                <FaClock className="text-primary mr-2" />
                <span className="text-gray-700">Real-time Operations</span>
              </div>
              <div className="flex items-center mb-2">
                <FaShieldAlt className="text-primary mr-2" />
                <span className="text-gray-700">Safe and High Endurance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services CTA */}
      <div className="p-8 rounded-lg text-center mb-12 mt-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          Our Services
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Empowering Maritime Operations with Advanced Underwater Technology
        </p>
        <div className="flex justify-center gap-8">
          <Link to="/products">
            <button className="py-2 px-4 rounded shadow-xl bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold hover:from-teal-400 hover:to-blue-500 transition duration-300">
              View Products
            </button>
          </Link>
          <Link to="/services">
            <button className="py-2 px-4 rounded shadow-xl bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold hover:from-teal-400 hover:to-blue-500 transition duration-300">
              View Services
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
