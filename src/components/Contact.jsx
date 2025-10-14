import { useState, useEffect, useRef } from 'react';
import Banner from '../shared/Banner';
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
} from 'react-icons/fa';
import banner from '../assets/banner photo.png';
import apiConfig from '../config/api';

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
    name: '',
    company_name: '',
    description: '',
  });
  const [quantities, setQuantities] = useState({});

  const baseUrl = apiConfig.baseURL.replace(/\/+$/, '');
  const token = apiConfig.token;
  const didFetch = useRef(false);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    const fetchServices = async () => {
      try {
        setLoading((prev) => ({ ...prev, services: true }));
        setErrors((prev) => ({ ...prev, services: null }));

        const response = await fetch(`${baseUrl}/services/api/services_list/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const result = await response.json();
        setServices(result.data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
        setErrors((prev) => ({ ...prev, services: 'Failed to load services' }));
      } finally {
        setLoading((prev) => ({ ...prev, services: false }));
      }
    };

    const fetchProducts = async () => {
      try {
        setLoading((prev) => ({ ...prev, products: true }));
        setErrors((prev) => ({ ...prev, products: null }));

        const response = await fetch(
          `${baseUrl}/products/api/component_model_list`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const result = await response.json();
        setProducts(result.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setErrors((prev) => ({ ...prev, products: 'Failed to load products' }));
      } finally {
        setLoading((prev) => ({ ...prev, products: false }));
      }
    };

    fetchServices();
    fetchProducts();
  }, [baseUrl, token]);

  const toggleServiceDropdown = () => {
    setIsServiceDropdownOpen(!isServiceDropdownOpen);
    if (!isServiceDropdownOpen && isProductDropdownOpen) {
      setIsProductDropdownOpen(false);
    }
  };

  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
    if (!isProductDropdownOpen && isServiceDropdownOpen) {
      setIsServiceDropdownOpen(false);
    }
  };

  const selectService = (service) => {
    setSelectedService(service);
    if (!quantities[`service-${service.id}`]) {
      setQuantities((prev) => ({ ...prev, [`service-${service.id}`]: 1 }));
    }
    setIsServiceDropdownOpen(false);
  };

  const selectProduct = (product) => {
    setSelectedProduct(product);
    if (!quantities[`product-${product.id}`]) {
      setQuantities((prev) => ({ ...prev, [`product-${product.id}`]: 1 }));
    }
    setIsProductDropdownOpen(false);
  };

  const updateQuantity = (type, id, amount) => {
    const key = `${type}-${id}`;
    const currentQuantity = quantities[key] || 1;
    const newQuantity = Math.max(1, currentQuantity + amount);
    setQuantities((prev) => ({ ...prev, [key]: newQuantity }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isServiceDropdownOpen || isProductDropdownOpen) {
        const dropdowns = document.querySelectorAll('.dropdown-container');
        let isClickInside = false;
        dropdowns.forEach((dropdown) => {
          if (dropdown.contains(event.target)) isClickInside = true;
        });
        if (!isClickInside) {
          setIsServiceDropdownOpen(false);
          setIsProductDropdownOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isServiceDropdownOpen, isProductDropdownOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const items = [];
    if (selectedProduct) {
      items.push({
        product: selectedProduct.id,
        service: null,
        quantity: quantities[`product-${selectedProduct.id}`] || 1,
      });
    }
    if (selectedService) {
      items.push({
        product: null,
        service: selectedService.id,
        quantity: quantities[`service-${selectedService.id}`] || 1,
      });
    }

    const payload = {
      name: formData.name,
      company_name: formData.companyName,
      description: formData.message,
      items,
    };

    try {
      const response = await fetch(`${baseUrl}/orders/api/create_order/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errBody;
        try {
          errBody = await response.json();
        } catch {
          errBody = await response.text();
        }
        throw new Error(
          errBody?.message ||
            (typeof errBody === 'string'
              ? errBody
              : 'Failed to send order data')
        );
      }

      await response.json().catch(() => null);
      alert('Order submitted successfully!');

      setFormData({ name: '', company_name: '', description: '' });
      setSelectedProduct(null);
      setSelectedService(null);
      setQuantities({});
    } catch (error) {
      console.error('Error submitting order:', error);
      alert(`Failed to submit order: ${error.message}`);
    }
  };

  const inputClass =
    'w-full h-11 px-3 rounded-2xl bg-[var(--field-bg)] border border-primary text-[var(--field-text)] ' +
    'placeholder:text-[var(--field-placeholder)] hover:border-[var(--field-hover-border)] focus:outline-none ' +
    'focus:border-[var(--field-focus-border)] focus:ring-4 focus:ring-[var(--field-ring)] transition-colors';

  const selectBtnClass =
    'w-full h-11 px-3 rounded-2xl bg-[var(--field-bg)] border border-primary text-[var(--field-text)] ' +
    'hover:border-[var(--field-hover-border)] focus:outline-none focus:border-[var(--field-focus-border)] ' +
    'focus:ring-4 focus:ring-[var(--field-ring)] flex items-center justify-between transition-colors';

  const qtyBtnClass =
    'inline-flex items-center justify-center h-8 w-8 rounded-full bg-[var(--chip-bg)] text-[var(--field-text)] ' +
    'hover:bg-white/16 transition-colors';

  return (
    <div>
      <Banner banner={banner} heading="Contact Us" />

      <div className="container mx-auto py-12 px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          Get in Touch
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="rounded-3xl p-6 bg-[var(--surface)]/90 backdrop-blur border border-white/10 shadow-soft">
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-5">
                <label
                  className="block text-sm font-semibold text-[var(--muted)] mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className={inputClass}
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Company Name */}
              <div className="mb-5">
                <label
                  className="block text-sm font-semibold text-[var(--muted)] mb-2"
                  htmlFor="companyName"
                >
                  Company Name
                </label>
                <input
                  id="companyName"
                  type="text"
                  placeholder="Your Company Name"
                  className={inputClass}
                  value={formData.companyName || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Service dropdown */}
              <div className="mb-5 relative dropdown-container">
                <label className="block text-sm font-semibold text-[var(--muted)] mb-2">
                  Select a Service
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className={selectBtnClass}
                    onClick={toggleServiceDropdown}
                    disabled={loading.services}
                  >
                    <span className="truncate">
                      {selectedService?.name ||
                        (loading.services
                          ? 'Loading services...'
                          : 'Choose a Service')}
                    </span>
                    {loading.services ? (
                      <svg
                        className="animate-spin h-1 w-5 text-[var(--muted)]"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    ) : isServiceDropdownOpen ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>

                  {errors.services && (
                    <p className="text-danger text-xs mt-1">
                      {errors.services}
                    </p>
                  )}

                  {isServiceDropdownOpen && (
                    <ul className="relative z-10 mt-1 w-full max-h-60 overflow-y-auto bg-[var(--surface)]/95 backdrop-blur border border-white/10 rounded-2xl shadow-soft">
                      {services.length > 0 ? (
                        services.map((service) => (
                          <li
                            key={service.id}
                            className="px-4 py-2 hover:bg-white/6 cursor-pointer"
                          >
                            <div
                              className="flex justify-between items-center"
                              onClick={() => selectService(service)}
                            >
                              <span className="truncate">{service.name}</span>
                              {selectedService?.id === service.id && (
                                <div
                                  className="flex items-center gap-2 ml-4"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <button
                                    type="button"
                                    className={qtyBtnClass}
                                    onClick={() =>
                                      updateQuantity('service', service.id, -1)
                                    }
                                  >
                                    <FaMinus size={12} />
                                  </button>
                                  <span className="w-8 text-center">
                                    {quantities[`service-${service.id}`] || 1}
                                  </span>
                                  <button
                                    type="button"
                                    className={qtyBtnClass}
                                    onClick={() =>
                                      updateQuantity('service', service.id, 1)
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
                        <li className="px-4 py-2 text-[var(--muted)]">
                          No services available
                        </li>
                      )}
                    </ul>
                  )}
                </div>

                {selectedService && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm text-[var(--muted)]">
                      Quantity:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className={qtyBtnClass}
                        onClick={() =>
                          updateQuantity('service', selectedService.id, -1)
                        }
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="w-8 text-center">
                        {quantities[`service-${selectedService.id}`] || 1}
                      </span>
                      <button
                        type="button"
                        className={qtyBtnClass}
                        onClick={() =>
                          updateQuantity('service', selectedService.id, 1)
                        }
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Product dropdown */}
              <div className="mb-5 relative dropdown-container">
                <label className="block text-sm font-semibold text-[var(--muted)] mb-2">
                  Select a Product
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className={selectBtnClass}
                    onClick={toggleProductDropdown}
                    disabled={loading.products}
                  >
                    <span className="truncate">
                      {selectedProduct?.model_name ||
                        (loading.products
                          ? 'Loading products...'
                          : 'Choose a Product')}
                    </span>
                    {loading.products ? (
                      <svg
                        className="animate-spin h-5 w-5 text-[var(--muted)]"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    ) : isProductDropdownOpen ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>

                  {errors.products && (
                    <p className="text-danger text-xs mt-1">
                      {errors.products}
                    </p>
                  )}

                  {isProductDropdownOpen && (
                    <ul className="relative z-10 mt-1 w-full max-h-60 overflow-y-auto bg-[var(--surface)]/95 backdrop-blur border border-white/10 rounded-2xl shadow-soft">
                      {products.length > 0 ? (
                        products.map((product) => (
                          <li
                            key={product.id}
                            className="px-4 py-2 hover:bg-white/6 cursor-pointer"
                          >
                            <div
                              className="flex justify-between items-center"
                              onClick={() => selectProduct(product)}
                            >
                              <span className="truncate">
                                {product.model_name}
                              </span>
                              {selectedProduct?.id === product.id && (
                                <div
                                  className="flex items-center gap-2 ml-4"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <button
                                    type="button"
                                    className={qtyBtnClass}
                                    onClick={() =>
                                      updateQuantity('product', product.id, -1)
                                    }
                                  >
                                    <FaMinus size={12} />
                                  </button>
                                  <span className="w-8 text-center">
                                    {quantities[`product-${product.id}`] || 1}
                                  </span>
                                  <button
                                    type="button"
                                    className={qtyBtnClass}
                                    onClick={() =>
                                      updateQuantity('product', product.id, 1)
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
                        <li className="px-4 py-2 text-[var(--muted)]">
                          No products available
                        </li>
                      )}
                    </ul>
                  )}
                </div>

                {selectedProduct && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm text-[var(--muted)]">
                      Quantity:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className={qtyBtnClass}
                        onClick={() =>
                          updateQuantity('product', selectedProduct.id, -1)
                        }
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="w-8 text-center">
                        {quantities[`product-${selectedProduct.id}`] || 1}
                      </span>
                      <button
                        type="button"
                        className={qtyBtnClass}
                        onClick={() =>
                          updateQuantity('product', selectedProduct.id, 1)
                        }
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="mb-6">
                <label
                  className="block text-sm font-semibold text-[var(--muted)] mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Your Message"
                  className={inputClass + ' min-h-[120px] py-3 resize-y'}
                  value={formData.message || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="btn h-11 px-5">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="rounded-3xl p-6 bg-[var(--surface)]/90 backdrop-blur border border-white/10 shadow-soft">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Contact Info
            </h3>

            <p className="text-[var(--muted)] mb-4">
              <strong className="text-[var(--text)]">Call Us</strong>
              <br />
              ‭+201006584054‬
            </p>

            <p className="text-[var(--muted)] mb-4">
              <strong className="text-[var(--text)]">Our Email</strong>
              <br />
              <a
                href="mailto:info@invictusumvs.com"
                className="text-primary hover:underline"
              >
                info@invictusumvs.com
              </a>
            </p>

            <p className="text-[var(--muted)] mb-4">
              <strong className="text-[var(--text)]">Our Location</strong>
              <br />
              398 Abu Qir Street, Mostafa Kamel, Al Fanar Tower, Alexandria
              Governorate
            </p>

            <p className="text-[var(--muted)] mb-5">
              <strong className="text-[var(--text)]">Working Hours</strong>
              <br />
              Mon–Fri: 10AM–5PM
              <br />
              Sat–Sun: 10AM–1PM
            </p>

            <p className="text-[var(--muted)] mb-3">
              <strong className="text-[var(--text)]">Follow Us</strong>
            </p>
            <div className="flex gap-4">
              <a href="/" className="text-primary hover:text-secondary">
                <FaFacebookF />
              </a>
              <a href="/" className="text-primary hover:text-secondary">
                <FaTwitter />
              </a>
              <a href="/" className="text-primary hover:text-secondary">
                <FaGooglePlusG />
              </a>
              <a href="/" className="text-primary hover:text-secondary">
                <FaLinkedinIn />
              </a>
              <a href="/" className="text-primary hover:text-secondary">
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
