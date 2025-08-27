import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import banner from "../assets/banner photo.png";
import Banner from "../shared/Banner";
import infraImage from "../assets/services2_05.png";
import oceanImage from "../assets/services2_09.png";
import environmentalImage from "../assets/services2_14.png";
import maritimeImage from "../assets/services2_19.png";
import apiConfig from "../config/api";

const Services = () => {
  const [servicesData, setServicesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleSection, setVisibleSection] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch data from API
    const fetchData = async () => {
      try {
          const baseUrl = apiConfig.baseURL;
          const token = apiConfig.token;
        const response = await fetch(
          `${baseUrl}/services/api/services_categories_list/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response", response);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setServicesData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const handleScroll = () => {
      const sections = document.querySelectorAll(".animated-section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= windowHeight - 100) {
          section.classList.add("opacity-100", "translate-y-0");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (section) => {
    setVisibleSection(visibleSection === section ? null : section);
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  const getCategoryImage = (categoryId) => {
    switch (categoryId) {
      case 1:
        return infraImage;
      case 2:
        return oceanImage;
      case 3:
        return environmentalImage;
      case 4:
        return maritimeImage;
      default:
        return infraImage;
    }
  };

  if (loading) {
    return (
      <div className="mt-20 flex justify-center items-center h-64">
        <p className="text-xl">Loading services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 flex justify-center items-center h-64">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

return (
    <div className="mt-20">
        <Banner
            banner={banner}
            heading="Our Services"
            subsheading="Discover marine services with Invictus UMVs. Our advanced ROV and ASV provide clear ocean insights. We plan with care to ensure every survey is thorough and reliable."
        />

        {/* Services Section */}
        <div className="services-section my-24 p-4 max-w-8xl mx-auto">
            <div className="flex flex-wrap justify-center gap-10">
                {[
                    {
                        title: "Thoughtful Data Collection",
                        description:
                            "Each survey is guided by a focus on gathering accurate, meaningful data, supporting the quality of our results.",
                    },
                    {
                        title: "Flexible Survey Design",
                        description:
                            "We tailor our approach to your needs and the changing marine environment, ensuring the best fit for every project.",
                    },
                    {
                        title: "Care for Safety & Environment",
                        description:
                            "We protect both our equipment and marine life, collecting data gently and efficiently with minimal disturbance.",
                    },
                    {
                        title: "Timely & Considerate",
                        description:
                            "We complete projects on schedule, always mindful of value and your expectations.",
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

        {/* Dynamically render service categories */}
        {servicesData &&
            servicesData.data.map((category, index) => (
                <div
                    key={category.id}
                    className="service-category-section p-4 max-w-6xl mx-auto"
                >
                    <div
                        className={`animated-section flex flex-col md:flex-row justify-between items-center gap-8 transition-all duration-1000 ease-in-out transform opacity-0 translate-y-10 ${
                            index % 2 === 0 ? "" : "md:flex-row-reverse"
                        }`}
                    >
                        <div className="md:w-1/3">
                            <img
                                src={getCategoryImage(category.id)}
                                alt={category.name}
                                className="rounded-lg shadow-lg mb-4 md:mb-0 w-full h-auto transition-transform duration-300 transform hover:scale-105 hover:brightness-110"
                            />
                        </div>
                        <div className="md:w-2/3">
                            <h2 className="text-3xl font-bold text-primary mb-5">
                                <a
                                    href="#"
                                    onClick={e => {
                                        e.preventDefault();
                                        navigate(`/src/components/${category.name.replace(/ /g, "").replace(/&/g, "And")}`);
                                    }}
                                >
                                    {category.name}
                                </a>
                            </h2>
                            <p className="text-gray-600 text-lg mb-3">
                                {category.description}
                            </p>
                            <ul className="list-disc list-inside text-primary text-lg">
                                {category.services.map((service) => (
                                    <li key={service.id}>
                                        <a
                                            href={`#${service.name.replace(/ /g, "").toLowerCase()}`}
                                            onClick={e => {
                                                e.preventDefault();
                                                if (
                                                    service.name.replace(/ /g, "").toLowerCase() ===
                                                    "pipelineinspection"
                                                ) {
                                                    
                                                } else {
                                                    handleLinkClick(
                                                        service.name.replace(/ /g, "").toLowerCase()
                                                    );
                                                }
                                            }}
                                            className={`hover:text-blue-400 cursor-pointer ${
                                                visibleSection ===
                                                service.name.replace(/ /g, "").toLowerCase()
                                                    ? "text-blue-400"
                                                    : ""
                                            }`}
                                        >
                                            {service.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}

        {/* Contact Section */}
        <div className="questions-section p-6 mb-4 mt-8 flex justify-center max-w-full mx-auto">
            <div className="bg-white question-box rounded-xl shadow-2xl h-64 w-full p-6 flex flex-col justify-center items-center">
                <h4 className="text-2xl font-bold text-primary">
                    Have any questions?
                </h4>
                <button
                    onClick={handleContactClick}
                    className="mt-4 py-2 px-4 rounded shadow-sm bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent hover:text-gray-200 transition duration-300"
                >
                    Contact Us
                </button>
            </div>
        </div>
    </div>
);
};

export default Services;
