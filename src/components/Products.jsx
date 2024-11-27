import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../shared/Banner';
import banner from '../assets/banner photo1.png';

const Products = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [activeTabs, setActiveTabs] = useState([null, null, null]);
    const [visibleSection, setVisibleSection] = useState(null); // Track which section is open
    const [orders, setOrders] = useState([]); // State to store orders
    const [showSummary, setShowSummary] = useState(false); // State to toggle order summary

    const handleContactClick = () => {
        navigate('/contact');
    };

    const toggleTab = (index, tabIndex) => {
        setActiveTabs(activeTabs.map((activeTab, i) => (i === index ? (activeTab === tabIndex ? null : tabIndex) : activeTab)));
    };

    const toggleSection = (section) => {
        setVisibleSection(visibleSection === section ? null : section);
    };

    const handleAddToCart = (item, quantity) => {
        setOrders((prevOrders) => {
            const existingOrder = prevOrders.find((order) => order.title === item.title);
            if (existingOrder) {
                return prevOrders.map((order) =>
                    order.title === item.title ? { ...order, quantity: order.quantity + quantity } : order
                );
            } else {
                return [...prevOrders, { ...item, quantity }];
            }
        });
    };

    const handleCheckOems = () => {
        setShowSummary(true);
    };


    const productCards = [
        {
            id: 1,
            title: "Remotely Operated Vehicle",
            subtitle: "IN100 ROV",
            description: "Dive up to 100m with our IN100 ROV. Simple yet advanced, it’s tailor-made for inspections. Its modular design effortlessly integrates with today’s ROV sensors, ensuring adaptability for diverse operations. Dive in, explore with precision.",
            imgSrc: "src/components/services2_05.png",
            tabs: [
                { title: "Title 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo." },
                { title: "Title 2", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo." },
                { title: "Title 3", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo." }
            ]
        },
        {
            id: 2,
            title: "Autonomous Surface Vehicle",
            subtitle: "MaatSeer ASV",
            description: "Navigate waters with the MaatSeer ASV. Crafted for seamless surface operations, its intuitive design easily accommodates modern sensors. Whether it’s research or reconnaissance, MaatSeer stands ready. Sail smoothly, observe confidently.",
            imgSrc: "src/assets/services2_09.png",
            tabs: [
                { title: "Title 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo." },
                { title: "Title 2", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo." },
                { title: "Title 3", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo." }
            ]
        },
        {
            id: 3,
            title: "Remotely Operated Vehicle",
            subtitle: "IN300 ROV",
            description: "Descend to 300m with our IN300 ROV. Beyond depth, it promises unmatched versatility.Crafted for comprehensive inspections, its modular framework seamlessly pairs with contemporary ROV sensors. Dive deeper, achieve with clarity.",
            imgSrc: "src/components/services2_14.png",
            tabs: [
                { title: "Title 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo." },
                { title: "Title 2", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo." },
                { title: "Title 3", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo." }
            ]
        }


    ];

    // Section Content Data
    const sectionContent = {
        vision: {
            title: "Vision Systems",
            items: [
                { title: "High-Resolution Cameras", description: "Capture clear, detailed images for advanced analysis and operations." },
                { title: "Infrared Imaging", description: "See beyond visible light with infrared sensors, perfect for low-light conditions." },
                { title: "Lidar Scanners", description: "Use laser-based technology to measure distances with high precision." },
            ],
        },
        powerSupply: {
            title: "Power Supply Modules",
            items: [
                { title: "Battery Management System", description: "Efficiently manage power with our advanced battery systems." },
                { title: "Redundant Power Sources", description: "Ensure uninterrupted operation with dual power sources." },
                { title: "Solar Integration", description: "Eco-friendly power solutions with integrated solar modules." },
            ],
        },
        sensors: {
            title: "Sensors",
            items: [
                { title: "Temperature Sensors", description: "Monitor environmental conditions with high-accuracy temperature sensors." },
                { title: "Pressure Sensors", description: "Get real-time pressure readings for in-depth analysis." },
                { title: "Proximity Sensors", description: "Detect objects and obstacles with advanced proximity sensing technology." },
            ],
        },
        enclosures: {
            title: "Enclosures",
            items: [
                { title: "Waterproof Casings", description: "Protect your equipment with durable waterproof enclosures." },
                { title: "Impact-Resistant Frames", description: "Built to withstand tough conditions and harsh impacts." },
                { title: "Heat Dissipation Design", description: "Engineered to prevent overheating during extended use." },
            ],
        },
        connectors: {
            title: "Connectors",
            items: [
                { title: "Quick-Release Connectors", description: "Easily connect and disconnect components on the go." },
                { title: "Waterproof Connectors", description: "Maintain secure connections, even underwater." },
                { title: "High-Durability Pins", description: "Ensure long-lasting, reliable connections with durable pins." },
            ],
        },
    };

    return (
        <div className='mt-20'>
            <Banner banner={banner} heading="Our Products" subsheading="Unleashing Marine Excellence: ROVs & ASVs Tailored for Tomorrow." />

            <div className="container mx-auto py-12 px-4 md:px-0 ">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {productCards.map((product, index) => (
                        <div
                            key={product.id}
                            className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            <img src={product.imgSrc} alt={product.subtitle} className="w-full h-auto mb-6 rounded-lg" />
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">{product.title}</h3>
                            <h4 className="text-xl font-semibold text-gray-700 mb-4">{product.subtitle}</h4>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Technical Specs & Features</h3>
                            {product.tabs.map((tab, tabIndex) => (
                                <div key={tabIndex}>
                                    <button
                                        className="text-left w-full mb-2 text-blue-500 hover:underline"
                                        onClick={() => toggleTab(index, tabIndex)}
                                    >
                                        {tab.title}
                                    </button>
                                    {activeTabs[index] === tabIndex && (
                                        <div className="p-4 border border-gray-200 rounded-lg mb-4">
                                            {tab.content}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4">
                                Learn More
                            </button>
                        </div>
                    ))}
                </div>

                {/* Customized Solutions Section */}
                <div className="bg-gradient-to-r from-blue-200 to-blue-400 p-8 rounded-lg shadow-lg mt-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Customized Solutions: Tailored to Your Vision</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        At Invictus UMVs, we don’t just offer vehicles; your needs shape the design. Whether you have unique depth requirements, specialized sensor integrations, or specific operational needs, our team collaborates closely with you to design and develop a UMV solution that fits like a glove. Your mission, custom-crafted.
                    </p>
                    <button
                        onClick={() => navigate('/customize')}
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Customize Your Solution
                    </button>

                </div>

                {/* OEM Modules Section */}
                <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-gray-50 to-gray-100 p-8 mt-12 rounded-lg shadow-lg">
                    <div className="md:w-1/2 pr-0 md:pr-8 text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">OEM Modules for Advanced Integration</h2>
                        <p className="text-lg text-gray-700 mb-4">
                            Elevate your projects with our OEM modules. Ideal for similar vehicles and university endeavors, we supply isolated electronics and other components for seamless integration. Trust in our technology to deliver unparalleled performance and reliability.
                        </p>
                        <ul className="list-none pl-4 text-lg text-gray-700 space-y-2 mb-8">
                            {Object.keys(sectionContent).map((key) => (
                                <li key={key}>
                                    <button onClick={() => toggleSection(key)} className="text-blue-600 hover:underline">
                                        🔹 {sectionContent[key].title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button onClick={handleCheckOems} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                            Check OEMs
                        </button>
                    </div>

                    <div className="md:w-1/2 flex justify-center">
                        <img src="src/assets/infra.jpg" alt="OEM Modules" className="w-full h-auto rounded-lg shadow-md" />
                    </div>
                </div>

                {/* Dynamic Sections for Each Module */}
                {visibleSection && sectionContent[visibleSection] && (
                    <Section title={sectionContent[visibleSection].title} items={sectionContent[visibleSection].items} onAddToCart={handleAddToCart} />
                )}

                {/* Order Summary Modal */}
                {showSummary && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center transition-opacity duration-300">
                        <div className="bg-white p-8 rounded-lg shadow-2xl transform transition-all duration-500 w-full max-w-lg">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Summary</h2>
                            <ul className="space-y-4">
                                {orders.map((order, index) => (
                                    <li key={index} className="flex justify-between items-center text-gray-700 border-b pb-2">
                                        <span className="font-semibold">{order.title}</span>
                                        <span className="text-blue-600">Quantity: {order.quantity}</span>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => setShowSummary(false)} className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* Contact Section */}
                <div className='questions-section p-6 my-12 flex justify-center max-w-full mx-auto'>
                    <div className='question-box bg-blue-400 rounded-xl shadow-2xl h-64 w-full p-6 flex flex-col justify-center items-center'>
                        <h4 className="text-2xl font-bold text-white text-center">Have any questions?</h4>
                        <button
                            onClick={handleContactClick}
                            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reusable Section Component for Dynamic Modules with Quantity Input
const Section = ({ title, items, onAddToCart }) => (
    <div className="bg-gray-100 p-6 mt-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <div className="space-y-6">
            {items.map((item, index) => {
                const [quantity, setQuantity] = useState(1); // State for item quantity
                return (
                    <div key={index} className="p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row md:justify-between md:items-center hover:shadow-lg transition-shadow duration-300">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                            <p className="text-gray-600 mb-4">{item.description}</p>
                        </div>
                        <div className="flex items-center space-x-4 mt-4 md:mt-0">
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                placeholder="Qty"
                                className="w-20 p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            <button
                                onClick={() => onAddToCart(item, quantity)}
                                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
);

export default Products;