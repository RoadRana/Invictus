import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation
import banner from '../assets/banner photo.png';
import Banner from '../shared/Banner';
import infraImage from '../components/services2_05.png';
import oceanImage from '../assets/services2_09.png';
import environmentalImage from '../components/services2_14.png';
import maritimeImage from '../components/services2_19.png';

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Trigger animations on scroll
    const handleScroll = () => {
      const sections = document.querySelectorAll('.animated-section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= windowHeight - 100) {
          section.classList.add('opacity-100', 'translate-y-0');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [visibleSection, setVisibleSection] = useState(
    /** @type {string | null} */ (null)
  );
  const navigate = useNavigate();

  /** @param {string} section */
  const handleLinkClick = (section) => {
    setVisibleSection(visibleSection === section ? null : section);
  };

  const handleContactClick = () => {
    navigate('/contact'); // Navigate to the contact page
  };

  return (
    <div className="mt-20">
      <Banner
        banner={banner}
        heading="Our Services"
        subsheading="Explore marine services with Invictus UMVs. Our advanced ROV and ASV give clear views of the ocean. We plan carefully to ensure our surveys are top-notch."
      />

      {/* Services Section */}
      <div className="services-section my-24 p-4 max-w-8xl mx-auto">
        <div className="flex flex-wrap justify-center gap-10">
          {[
            {
              title: 'Precision-Driven Data Collection',
              description:
                'Every survey is rooted in acquiring accurate and meaningful data, ensuring the integrity of our findings.',
            },
            {
              title: 'Adaptive Survey Design',
              description:
                'Our strategies are malleable, adapting to specific client needs and the ever-changing marine landscape.',
            },
            {
              title: 'Safety and Sustainability',
              description:
                'We ensure the safety of our equipment and marine life, collecting data efficiently with minimal disruption.',
            },
            {
              title: 'Timely & Cost-Effective',
              description:
                'Ensuring project completion within set timeframes while maximizing value for money.',
            },
          ].map((service, index) => (
            <div
              key={index}
              className="service-card bg-white rounded-lg shadow-lg h-64 w-64 p-6 flex flex-col justify-center items-center hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300"
            >
              <h4 className="text-xl font-semibold text-primary text-center">
                {service.title}
              </h4>
              <p className="text-lg text-gray-600 mt-4 text-center">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Infrastructure Section */}
      <div className="inspection-section p-4 max-w-6xl mx-auto">
        <div
          className={`animated-section flex flex-col md:flex-row justify-between items-center gap-8 transition-all duration-1000 ease-in-out transform opacity-0 translate-y-10`}
        >
          <div className="md:w-1/3">
            <img
              src={infraImage}
              alt="Infrastructure Inspection"
              className="rounded-lg shadow-lg mb-4 md:mb-0 w-full h-auto transition-transform duration-300 transform hover:scale-105 hover:brightness-110"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold text-primary mb-5">
              Infrastructure Inspection & Maintenance
            </h2>
            <p className="text-gray-600 text-lg mb-3">
              Guarding the lifelines of our urban and marine landscapes, our
              specialized services delve deep to inspect and maintain crucial
              infrastructures. From submerged pipelines to towering bridges, we
              bring unparalleled precision to every inspection, ensuring safety
              and prolonging the lifespan of vital assets. Trust in our
              expertise, safeguard your structures.
            </p>
            <ul className="list-disc list-inside text-gray-600 text-lg">
              {[
                'Pipeline Inspection',
                'Cable Inspection',
                'Hull Inspection',
                'Dam Inspection',
                'Seabed Inspection',
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to="/pipeline-inspection"
                    className={`hover:text-blue-500 cursor-pointer ${visibleSection === item.replace(/ /g, '').toLowerCase() ? 'text-blue-500' : ''}`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Ocean Exploration Section */}
      <div className="ocean-exploration-section p-4 max-w-6xl mx-auto">
        <div
          className={`animated-section flex flex-col md:flex-row justify-between items-center gap-8 transition-all duration-1000 ease-in-out transform opacity-0 translate-y-10`}
        >
          <div className="md:w-2/3 order-2 md:order-1">
            <h2 className="text-3xl font-bold text-primary mb-5">
              Ocean Exploration
            </h2>
            <p className="text-gray-600 text-lg mb-3">
              Harness the power of MaatSeer ASV in conducting detailed
              hydrographic surveys, mapping benthic habitats, and collecting
              high-resolution oceanographic data. Precision technology combined
              with advanced navigation ensures comprehensive coverage and
              pinpoint accuracy.
            </p>
            <ul className="list-disc list-inside text-gray-600 text-lg">
              {[
                'Hydrographic Surveys',
                'Benthic Habitat Mapping',
                'Ocean Current and Wave Analysis',
                'Oil & Gas Exploration',
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.replace(/ /g, '').toLowerCase()}`}
                    onClick={() =>
                      handleLinkClick(item.replace(/ /g, '').toLowerCase())
                    }
                    className={`hover:text-blue-500 cursor-pointer ${visibleSection === item.replace(/ /g, '').toLowerCase() ? 'text-blue-500' : ''}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/3 order-1 md:order-2">
            <img
              src={oceanImage}
              alt="Ocean Exploration"
              className="rounded-lg shadow-lg mb-4 md:mb-0 w-full h-auto transition-transform duration-300 transform hover:scale-105 hover:brightness-110"
            />
          </div>
        </div>
      </div>

      {/* Environmental Assessment Section */}
      <div className="environmental-assessment-section p-4 max-w-6xl mx-auto">
        <div
          className={`animated-section flex flex-col md:flex-row justify-between items-center gap-8 transition-all duration-1000 ease-in-out transform opacity-0 translate-y-10`}
        >
          <div className="md:w-1/3">
            <img
              src={environmentalImage}
              alt="Environmental Assessment"
              className="rounded-lg shadow-lg mb-4 md:mb-0 w-full h-auto transition-transform duration-300 transform hover:scale-105 hover:brightness-110"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold text-primary mb-5">
              Environmental Assessment & Aquaculture
            </h2>
            <p className="text-gray-600 text-lg mb-3">
              Leverage the advanced capabilities of both our MaatSeer ASV and IN
              100 ROV for pioneering marine science and environmental
              assessments. Dive into complex ecosystems, monitor aquaculture
              health, and capture invaluable data for sustainable breakthroughs.
              With MaatSeer’s dual assets, you’re not just observing; you’re
              comprehending and safeguarding the pulse of our oceans.
            </p>
            <ul className="list-disc list-inside text-gray-600 text-lg">
              {[
                'Biodiversity Monitoring',
                'Habitat Assessment',
                'Water Quality Analysis',
                'Aquaculture Health Monitoring',
                'Coral Reef Studies',
                'Pollution Assessment',
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.replace(/ /g, '').toLowerCase()}`}
                    onClick={() =>
                      handleLinkClick(item.replace(/ /g, '').toLowerCase())
                    }
                    className={`hover:text-blue-500 cursor-pointer ${visibleSection === item.replace(/ /g, '').toLowerCase() ? 'text-blue-500' : ''}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Maritime Security Section */}
      <div className="maritime-security-section p-4 max-w-6xl mx-auto">
        <div
          className={`animated-section flex flex-col md:flex-row justify-between items-center gap-8 transition-all duration-1000 ease-in-out transform opacity-0 translate-y-10`}
        >
          <div className="md:w-2/3 order-2 md:order-1">
            <h2 className="text-3xl font-bold text-primary mb-5">
              Maritime Security
            </h2>
            <p className="text-gray-600 text-lg mb-3">
              The MaatSeer ASV offers advanced surveillance in marine domains,
              ensuring maritime safety with its top-tier sensors and systems.
              Combat illicit activities and strengthen borders effectively.
              Experience uncompromised maritime defense with MaatSeer.
            </p>
            <ul className="list-disc list-inside text-gray-600 text-lg">
              {[
                'Port and Harbor Security',
                'Border Patrol',
                'Oil and Gas Infrastructure Security',
                'Underwater Asset Protection',
                'Search and Rescue Operations',
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.replace(/ /g, '').toLowerCase()}`}
                    onClick={() =>
                      handleLinkClick(item.replace(/ /g, '').toLowerCase())
                    }
                    className={`hover:text-blue-500 cursor-pointer ${visibleSection === item.replace(/ /g, '').toLowerCase() ? 'text-blue-500' : ''}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/3 order-1 md:order-2">
            <img
              src={maritimeImage}
              alt="Maritime Security"
              className="rounded-lg shadow-lg mb-4 md:mb-0 w-full h-auto transition-transform duration-300 transform hover:scale-105 hover:brightness-110"
            />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="questions-section p-6 my-12 flex justify-center max-w-full mx-auto">
        <div className="question-box bg-blue-300 rounded-xl shadow-2xl h-64 w-full p-6 flex flex-col justify-center items-center">
          <h4 className="text-2xl font-bold text-white text-center">
            Have any questions?
          </h4>
          <button
            onClick={handleContactClick} // Navigates to the Contact page
            className="mt-6 px-6 py-3 bg-blue-400 text-white rounded-full hover:bg-blue-400 transition-transform duration-300 transform hover:scale-105"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
