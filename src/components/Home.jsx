import Banner from '../shared/Banner';
import { Link } from 'react-router-dom';
import {
  FaCogs,
  FaBrain,
  FaLeaf,
  FaDollarSign,
  FaBullseye,
  FaDatabase,
  FaClock,
  FaShieldAlt,
} from 'react-icons/fa';
import banner from '../assets/banner photo1.png'; // Ensure the image path is correct

const Home = () => {
  const heading = 'Innovating Green, Navigating Blue';
  const subheading =
    'Revolutionizing Maritime Industries with Eco-Friendly, Intelligent Unmanned Marine Vehicles.';
  const sectionImage = 'src/assets/banner photo1.png'; // Replace with the actual path to your section image
  const specializationImage = 'src/assets/main-page_04.png'; // Replace with the actual path to your specialization image

  return (
    <div className="mt-20">
      <Banner banner={banner} heading={heading} subsheading={subheading}>
        <div className="mt-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 m-2">
            Learn More Now!
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 m-2">
            Get A Free Quote
          </button>
        </div>
      </Banner>

      <div className="container mx-auto py-12 px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            {/* Reduced image size using w- and h- classes */}
            <img
              src={sectionImage}
              alt="Welcome Aboard"
              className="w-3/4 h-auto rounded-lg shadow-lg mx-auto"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Welcome Aboard
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Invictus UMVs
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              Where Innovation Sails with Sustainability
            </p>
            <p className="text-lg text-gray-600 mb-4">
              Step into a world where technology sails sustainably with Invictus
              UMVs. Powered by clean energy and enriched with cutting-edge AI,
              our marine vehicles navigate the depth and breadth of the ocean
              with unparalleled precision and a profound commitment to the
              ecosystem.
            </p>
            <p className="text-lg text-gray-600">
              Your gateway to intelligent marine exploration begins here — where
              every ripple echoes with innovation, and every tide promises new
              possibilities.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg shadow-lg mt-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Get Your Free Quote NOW!
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Looking for cutting-edge ROVs, ASVs, and expert underwater services?
          Dive into a world of possibilities with Invictus UMVs.
        </p>
        <Link to="/contact">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Contact Us
          </button>
        </Link>
      </div>

      <div className="container mx-auto py-12 px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            {/* Reduced image size using w- and h- classes */}
            <img
              src={specializationImage}
              alt="Our Specialization"
              className="w-3/4 h-auto rounded-lg shadow-lg mx-auto"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Specialization
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              We merge innovation with functionality, delivering solutions
              engineered with precision, representing values essential to modern
              marine operations. Whether you’re in the oil and gas sector,
              offshore industries, or the realm of marine science, our
              specialties resonate with your needs. Dive into the essence of
              what we bring to the waves.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center mb-2">
                <FaCogs className="text-blue-500 mr-2" />
                <span className="text-gray-700">Modularity</span>
              </div>
              <div className="flex items-center mb-2">
                <FaBrain className="text-blue-500 mr-2" />
                <span className="text-gray-700">Intelligent Systems</span>
              </div>
              <div className="flex items-center mb-2">
                <FaLeaf className="text-blue-500 mr-2" />
                <span className="text-gray-700">Sustainability</span>
              </div>
              <div className="flex items-center mb-2">
                <FaDollarSign className="text-blue-500 mr-2" />
                <span className="text-gray-700">Cost-effective</span>
              </div>
              <div className="flex items-center mb-2">
                <FaBullseye className="text-blue-500 mr-2" />
                <span className="text-gray-700">Accuracy</span>
              </div>
              <div className="flex items-center mb-2">
                <FaDatabase className="text-blue-500 mr-2" />
                <span className="text-gray-700">
                  Comprehensive Data Collection
                </span>
              </div>
              <div className="flex items-center mb-2">
                <FaClock className="text-blue-500 mr-2" />
                <span className="text-gray-700">Real-time Operations</span>
              </div>
              <div className="flex items-center mb-2">
                <FaShieldAlt className="text-blue-500 mr-2" />
                <span className="text-gray-700">Safe and High Endurance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg shadow-lg mt-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Our Services
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Empowering Maritime Operations with Advanced Underwater Technology
        </p>
        <div>
          <Link to="/products">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 m-2">
              View Products
            </button>
          </Link>
          <Link to="/services">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 m-2">
              View Services
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
