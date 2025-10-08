import { useState, useEffect } from "react";
import Banner from "../shared/Banner";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaLinkedinIn,
  FaInstagram,
  FaChevronDown,
  FaChevronUp,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import banner from "../assets/banner photo.png";
import apiConfig from "../config/api";
const Contact = () => {
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [loading, setLoading] = useState({ services: true, products: true });
  const [errors, setErrors] = useState({ services: null, products: null });
  const [formData, setFormData] = useState({
    name: "",
    company_name: "",
    description: "",
  });
  const [quantities, setQuantities] = useState({});

  const baseUrl = apiConfig.baseURL;
  const token = apiConfig.token;
  useEffect(() => {
    // Fetch services from API
    const fetchServices = async () => {
      try {
        setLoading((prev) => ({ ...prev, services: true }));
        setErrors((prev) => ({ ...prev, services: null }));

        const response = await fetch(
          `${baseUrl}/services/api/services_list/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        // Extract the data array from the response
        setServices(result.data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
        setErrors((prev) => ({ ...prev, services: "Failed to load services" }));
      } finally {
        setLoading((prev) => ({ ...prev, services: false }));
      }
    };

    // Fetch products from API
    const fetchProducts = async () => {
      try {
        setLoading((prev) => ({ ...prev, products: true }));
        setErrors((prev) => ({ ...prev, products: null }));

        const response = await fetch(
          `${baseUrl}/products/api/component_model_list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        // Extract the data array from the response
        setProducts(result.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setErrors((prev) => ({ ...prev, products: "Failed to load products" }));
      } finally {
        setLoading((prev) => ({ ...prev, products: false }));
      }
    };

    fetchServices();
    fetchProducts();
  }, []);

  const toggleServiceDropdown = () => {
    setIsServiceDropdownOpen(!isServiceDropdownOpen);
    // Close product dropdown when opening service dropdown
    if (!isServiceDropdownOpen && isProductDropdownOpen) {
      setIsProductDropdownOpen(false);
    }
  };

  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
    // Close service dropdown when opening product dropdown
    if (!isProductDropdownOpen && isServiceDropdownOpen) {
      setIsServiceDropdownOpen(false);
    }
  };

  const selectService = (service) => {
    setSelectedService(service);
    // Initialize quantity to 1 if not already set
    if (!quantities[`service-${service.id}`]) {
      setQuantities((prev) => ({
        ...prev,
        [`service-${service.id}`]: 1,
      }));
    }
    setIsServiceDropdownOpen(false);
  };

  const selectProduct = (product) => {
    setSelectedProduct(product);
    // Initialize quantity to 1 if not already set
    if (!quantities[`product-${product.id}`]) {
      setQuantities((prev) => ({
        ...prev,
        [`product-${product.id}`]: 1,
      }));
    }
    setIsProductDropdownOpen(false);
  };

  const updateQuantity = (type, id, amount) => {
    const key = `${type}-${id}`;
    const currentQuantity = quantities[key] || 1;
    const newQuantity = Math.max(1, currentQuantity + amount);

    setQuantities((prev) => ({
      ...prev,
      [key]: newQuantity,
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isServiceDropdownOpen || isProductDropdownOpen) {
        const dropdowns = document.querySelectorAll(".dropdown-container");
        let isClickInside = false;

        dropdowns.forEach((dropdown) => {
          if (dropdown.contains(event.target)) {
            isClickInside = true;
          }
        });

        if (!isClickInside) {
          setIsServiceDropdownOpen(false);
          setIsProductDropdownOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isServiceDropdownOpen, isProductDropdownOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare items in the correct format
    const items = [];

    // Add product if selected
    if (selectedProduct) {
      items.push({
        product: selectedProduct.id,
        service: null,
        quantity: quantities[`product-${selectedProduct.id}`] || 1,
      });
    }

    // Add service if selected
    if (selectedService) {
      items.push({
        product: null,
        service: selectedService.id,
        quantity: quantities[`service-${selectedService.id}`] || 1,
      });
    }

    // Prepare the complete payload
    const payload = {
      name: formData.name,
      company_name: formData.companyName,
      description: formData.message,
      items: items,
    };

    try {
      const response = await fetch(`${baseUrl}/orders/api/create_order/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response;
        throw new Error(errorData.message || "Failed to send order data");
      }

      const data = await response;
      console.log("Order data sent successfully:", data);
      alert("Order submitted successfully!");

      // Reset form
      setFormData({
        name: "",
        company_name: "",
        description: "",
      });
      setSelectedProduct(null);
      setSelectedService(null);
      setQuantities({});
    } catch (error) {
      console.error("Error submitting order:", error);
      alert(`Failed to submit order: ${error.message}`);
    }
  };

  return (
    <div className="mt-20">
      <Banner banner={banner} heading="Contact Us" />
      <div className="container mx-auto py-12 px-4 md:px-0">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          Get in Touch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="companyName"
                >
                  Company Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="companyName"
                  type="text"
                  placeholder="Your Company Name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4 relative dropdown-container">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Select a Service
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex items-center justify-between"
                    onClick={toggleServiceDropdown}
                    disabled={loading.services}
                  >
                    <span>
                      {selectedService?.name ||
                        (loading.services
                          ? "Loading services..."
                          : "Choose a Service")}
                    </span>
                    {loading.services ? (
                      <svg
                        className="animate-spin h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : isServiceDropdownOpen ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>
                  {errors.services && (
                    <p className="text-red-500 text-xs italic mt-1">
                      {errors.services}
                    </p>
                  )}
                  {isServiceDropdownOpen && (
                    <ul className="absolute z-10 bg-white border rounded shadow-lg mt-1 w-full max-h-60 overflow-y-auto">
                      {services.length > 0 ? (
                        services.map((service) => (
                          <li
                            key={service.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <div
                              className="flex justify-between items-center"
                              onClick={() => selectService(service)}
                            >
                              <span>{service.name}</span>
                              {selectedService?.id === service.id && (
                                <div
                                  className="flex items-center space-x-2 ml-4"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <button
                                    type="button"
                                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                                    onClick={() =>
                                      updateQuantity("service", service.id, -1)
                                    }
                                  >
                                    <FaMinus size={12} />
                                  </button>
                                  <span className="w-8 text-center">
                                    {quantities[`service-${service.id}`] || 1}
                                  </span>
                                  <button
                                    type="button"
                                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                                    onClick={() =>
                                      updateQuantity("service", service.id, 1)
                                    }
                                  >
                                    <FaPlus size={12} />
                                  </button>
                                </div>
                              )}
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-2 text-gray-500">
                          No services available
                        </li>
                      )}
                    </ul>
                  )}
                </div>
                {selectedService && (
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Quantity:</span>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                        onClick={() =>
                          updateQuantity("service", selectedService.id, -1)
                        }
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="w-8 text-center">
                        {quantities[`service-${selectedService.id}`] || 1}
                      </span>
                      <button
                        type="button"
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                        onClick={() =>
                          updateQuantity("service", selectedService.id, 1)
                        }
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="mb-4 relative dropdown-container">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Select a Product
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex items-center justify-between"
                    onClick={toggleProductDropdown}
                    disabled={loading.products}
                  >
                    <span>
                      {selectedProduct?.model_name ||
                        (loading.products
                          ? "Loading products..."
                          : "Choose a Product")}
                    </span>
                    {loading.products ? (
                      <svg
                        className="animate-spin h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : isProductDropdownOpen ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>
                  {errors.products && (
                    <p className="text-red-500 text-xs italic mt-1">
                      {errors.products}
                    </p>
                  )}
                  {isProductDropdownOpen && (
                    <ul className="absolute z-10 bg-white border rounded shadow-lg mt-1 w-full max-h-60 overflow-y-auto">
                      {products.length > 0 ? (
                        products.map((product) => (
                          <li
                            key={product.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <div
                              className="flex justify-between items-center"
                              onClick={() => selectProduct(product)}
                            >
                              <span>{product.model_name}</span>
                              {selectedProduct?.id === product.id && (
                                <div
                                  className="flex items-center space-x-2 ml-4"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <button
                                    type="button"
                                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                                    onClick={() =>
                                      updateQuantity(
                                        "product",
                                        product.id,
                                        -1
                                      )
                                    }
                                  >
                                    <FaMinus size={12} />
                                  </button>
                                  <span className="w-8 text-center">
                                    {quantities[`product-${product.id}`] || 1}
                                  </span>
                                  <button
                                    type="button"
                                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                                    onClick={() =>
                                      updateQuantity(
                                        "product",
                                        product.id,
                                        1
                                      )
                                    }
                                  >
                                    <FaPlus size={12} />
                                  </button>
                                </div>
                              )}
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-2 text-gray-500">
                          No products available
                        </li>
                      )}
                    </ul>
                  )}
                </div>
                {selectedProduct && (
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Quantity:</span>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                        onClick={() =>
                          updateQuantity("product", selectedProduct.id, -1)
                        }
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="w-8 text-center">
                        {quantities[`product-${selectedProduct.id}`] || 1}
                      </span>
                      <button
                        type="button"
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                        onClick={() =>
                          updateQuantity("product", selectedProduct.id, 1)
                        }
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  placeholder="Your Message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button
                className="ml-4 py-2 px-4 rounded shadow-sm bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent hover:text-gray-200 transition duration-300"
                type="submit"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Contact Info
            </h3>
            <p className="text-gray-600 mb-4">
              <strong>Call Us</strong>
              <br />
              ‭+201006584054‬
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Our Email</strong>
              <br />
              <a
                href="mailto:info@invictusumvs.com"
                className="text-primary hover:underline"
              >
                info@invictusumvs.com
              </a>
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Our Location</strong>
              <br />
              398 Abu Qir Street, Mostafa Kamel, Al Fanar Tower, Alexandria
              Governorate
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Working Hours</strong>
              <br />
              Mon-Fri: 10AM-5PM
              <br />
              Sat-Sun: 10AM-1PM
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Follow Us</strong>
            </p>
            <div className="flex space-x-4">
              <a href="/" className="text-primary hover:text-gray-600">
                <FaFacebookF />
              </a>
              <a href="/" className="text-primary hover:text-gray-600">
                <FaTwitter />
              </a>
              <a href="/" className="text-primary hover:text-gray-600">
                <FaGooglePlusG />
              </a>
              <a href="/" className="text-primary hover:text-gray-600">
                <FaLinkedinIn />
              </a>
              <a href="/" className="text-primary hover:text-gray-600">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
