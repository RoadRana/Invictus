import React, { useState, useEffect } from 'react';
import Banner from '../shared/Banner';
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import banner from '../assets/banner photo.png'; // Ensure the image path is correct

const Contact = () => {
    const [services, setServices] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [selectedProduct, setSelectedProduct] = useState("");
    const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

    // Replace with your actual base_url
    const baseUrl = "https://example.com";

    useEffect(() => {
        // Fetch services from API
        const fetchServices = async () => {
            try {
                const response = await fetch(`${baseUrl}/services/api/services_list/`);
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        // Fetch products from API
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${baseUrl}/products/api/robot_list/`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchServices();
        fetchProducts();
    }, []);

    const toggleServiceDropdown = () => {
        setIsServiceDropdownOpen(!isServiceDropdownOpen);
    };

    const toggleProductDropdown = () => {
        setIsProductDropdownOpen(!isProductDropdownOpen);
    };

    const selectService = (service) => {
        setSelectedService(service);
        setIsServiceDropdownOpen(false);
    };

    const selectProduct = (product) => {
        setSelectedProduct(product);
        setIsProductDropdownOpen(false);
    };

    return (
        <div className="mt-20">
            <Banner banner={banner} heading="Contact Us" />
            <div className="container mx-auto py-12 px-4 md:px-0">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Get in Touch</h2>
                <p className="text-lg text-gray-600 mb-12">We value your feedback.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Basic Contact Form */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your Name" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">Company Name</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="companyName" type="text" placeholder="Your Company Name" />
                            </div>
                            <div className="mb-4 relative">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Select a Service</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        onClick={toggleServiceDropdown}
                                    >
                                        {selectedService || "Choose a Service"}
                                    </button>
                                    {isServiceDropdownOpen && (
                                        <ul className="absolute z-10 bg-white border rounded shadow-lg mt-2 w-full">
                                            {services.map((service) => (
                                                <li
                                                    key={service.id}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => selectService(service.name)}
                                                >
                                                    {service.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <div className="mb-4 relative">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Select a Product</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        onClick={toggleProductDropdown}
                                    >
                                        {selectedProduct || "Choose a Product"}
                                    </button>
                                    {isProductDropdownOpen && (
                                        <ul className="absolute z-10 bg-white border rounded shadow-lg mt-2 w-full">
                                            {products.map((product) => (
                                                <li
                                                    key={product.id}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => selectProduct(product.name)}
                                                >
                                                    {product.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Message</label>
                                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="Your Message" rows="4"></textarea>
                            </div>
                            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" type="submit">Send Message</button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Info</h3>
                        <p className="text-gray-600 mb-4"><strong>Call Us</strong><br />‭+201006584054‬</p>
                        <p className="text-gray-600 mb-4"><strong>Our Email</strong><br /><a href="mailto:info@invictusumvs.com" className="text-blue-500 hover:underline">info@invictusumvs.com</a></p>
                        <p className="text-gray-600 mb-4"><strong>Our Location</strong><br />398 Abu Qir Street, Mostafa Kamel, Al Fanar Tower, Alexandria Governorate</p>
                        <p className="text-gray-600 mb-4"><strong>Working Hours</strong><br />Mon-Fri: 10AM-5PM<br />Sat-Sun: 10AM-1PM</p>
                        <p className="text-gray-600 mb-4"><strong>Follow Us</strong></p>
                        <div className="flex space-x-4">
                            <a href="/" className="text-gray-600 hover:text-blue-500"><FaFacebookF /></a>
                            <a href="/" className="text-gray-600 hover:text-blue-500"><FaTwitter /></a>
                            <a href="/" className="text-gray-600 hover:text-blue-500"><FaGooglePlusG /></a>
                            <a href="/" className="text-gray-600 hover:text-blue-500"><FaLinkedinIn /></a>
                            <a href="/" className="text-gray-600 hover:text-blue-500"><FaInstagram /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
