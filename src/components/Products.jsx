import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../shared/Banner";
import banner from "../assets/banner photo1.png";
import IN100 from "../assets/IN100ROV.jpeg";
import MaatSeer from "../assets/services2_09.png";
import IN300 from "../assets/services2_14.png";
import infra from "../assets/infra.jpg";

const Products = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [visibleSection, setVisibleSection] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [componentsData, setComponentsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    

  useEffect(() => {
    const fetchComponentsData = async () => {
      try {
        const token = ""
        const response = await fetch(
          "",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response", response);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
          const data = await response.json();
      
        setComponentsData(data);
      } catch (err) {
        console.error("API fetch failed:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComponentsData();
  }, []);

  const handleContactClick = () => {
    navigate("/contact");
  };
    
   

  const toggleSection = (section) => {
    setVisibleSection(visibleSection === section ? null : section);
  };

  const handleAddToCart = (item, quantity) => {
    setOrders((prevOrders) => {
      const existingOrder = prevOrders.find(
        (order) => order.model_name === item.model_name
      );
      if (existingOrder) {
        return prevOrders.map((order) =>
          order.model_name === item.model_name
            ? { ...order, quantity: order.quantity + quantity }
            : order
        );
      } else {
        return [...prevOrders, { ...item, quantity }];
      }
        
    });
  };
    

  const handleCheckOems = () => {
    setShowSummary(true);
  };
    
    const handlePurchase = () => {
      const sendOrderData = async () => {
          try {
            const token = ""
        
          // Prepare cart as an array of objects with only serial and quantity
          const cart = orders.map(order => ({
            product_id: order.serial.replace(0, ""),
            quantity: order.quantity,
          }));

          const response = await fetch(
            "",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ cart }),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to send order data");
          }
              const data = await response.json();

              console.log("Order data sent successfully:", data);
              alert("Order submitted successfully!");
              

        } catch (error) {
              console.error("Error sending order data:", error);
              alert("Failed to submit order. Please try again.");

        }
      };
      sendOrderData();

      setOrders([]); // Clear the cart after purchase
      setShowSummary(false); // Close the summary modal
    };

  // Classify components by type and get unique model names for each type
  const classifiedComponents = componentsData
    ? componentsData.data.reduce((acc, component) => {
        const type = component.component_type;
        if (!acc[type]) {
          acc[type] = {
            components: [],
            modelNames: new Set(), 
          };
        }
        acc[type].components.push(component);
        if (component.model_name) {
          acc[type].modelNames.add(component.model_name);
        }
        return acc;
      }, {})
    : {};

  // Function to generate title from model names
  const generateModelTitle = (modelNamesSet) => {
    const modelNames = Array.from(modelNamesSet);
    if (modelNames.length === 0) return "Unnamed Components";
    if (modelNames.length === 1) return modelNames[0];

    return (
      modelNames.slice(0, -1).join(", ") +
      " & " +
      modelNames[modelNames.length - 1]
    );
  };

  const productCards = [
    {
      id: 1,
      title: "Remotely Operated Vehicle",
      subtitle: "IN100 ROV",
      description:
        "Dive up to 100m with our IN100 ROV. Simple yet advanced, it's tailor-made for inspections. Its modular design effortlessly integrates with today's ROV sensors, ensuring adaptability for diverse operations. Dive in, explore with precision.",
      imgSrc: IN100,
      tabs: [
     
      ],
    },
    {
      id: 2,
      title: "Autonomous Surface Vehicle",
      subtitle: "MaatSeer ASV",
      description:
        "Navigate waters with the MaatSeer ASV. Crafted for seamless surface operations, its intuitive design easily accommodates modern sensors. Whether it's research or reconnaissance, MaatSeer stands ready. Sail smoothly, observe confidently.",
      imgSrc: MaatSeer,
      tabs: [
       
      ],
    },
    {
      id: 3,
      title: "Remotely Operated Vehicle",
      subtitle: "IN300 ROV",
      description:
        "Descend to 300m with our IN300 ROV. Beyond depth, it promises unmatched versatility.Crafted for comprehensive inspections, its modular framework seamlessly pairs with contemporary ROV sensors. Dive deeper, achieve with clarity.",
      imgSrc: IN300,
      tabs: [
       
      ],
    },
  ];

  if (loading) {
    return (
      <div className="mt-20 flex justify-center items-center h-64">
        <div className="text-xl text-blue-800">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 flex justify-center items-center h-64">
        <div className="text-xl text-red-500">Error: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="ml-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <Banner
        banner={banner}
        heading="Our Products"
        subsheading="Unleashing Marine Excellence: ROVs & ASVs Tailored for Tomorrow."
      />

      <div className="container mx-auto py-12 px-4 md:px-0 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productCards.map((product, index) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <img
                src={product.imgSrc}
                alt={product.subtitle}
                className="w-full h-auto mb-6 rounded-lg"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {product.title}
              </h3>
              <h4 className="text-xl font-semibold text-primary mb-4">
                {product.subtitle}
              </h4>
              <p className="text-gray-600 mb-4">{product.description}</p>
             
            </div>
          ))}
        </div>

        <div
          className="bg-white p-8 rounded-lg shadow-lg mt-12"
          style={{
            background: "white",
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Customized Solutions: Tailored to Your Vision
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            At Invictus UMVs, we don't just offer vehicles; your needs shape the
            design. Whether you have unique depth requirements, specialized
            sensor integrations, or specific operational needs, our team
            collaborates closely with you to design and develop a UMV solution
            that fits like a glove. Your mission, custom-crafted.
          </p>
          <button
            onClick={() => navigate("/customize")}
            className="mt-6 inline-flex items-center justify-center px-5 py-2.5 rounded-lg
             bg-white  shadow-sm hover:shadow-md transition-shadow
             focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-200"
          >
            <span className="text-base font-medium bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
              Customize Your Solution
            </span>
          </button>
        </div>

        <div
          className="flex flex-col md:flex-row items-center bg-gradient-to-r from-gray-50 to-gray-100 p-8 mt-12 rounded-lg shadow-lg"
          style={{
            background: "white",
          }}
        >
          <div className="md:w-1/2 pr-0 md:pr-8 text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              OEM Modules for Advanced Integration
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Elevate your projects with our OEM modules. Ideal for similar
              vehicles and university endeavors, we supply isolated electronics
              and other components for seamless integration. Trust in our
              technology to deliver unparalleled performance and reliability.
            </p>
            {componentsData &&
            componentsData.data &&
            componentsData.data.length > 0 ? (
              <>
                <ul className="list-none pl-4 text-lg text-gray-700 space-y-2 mb-8">
                  {Object.keys(classifiedComponents).map((type) => (
                    <li key={type}>
                      <button
                        onClick={() => toggleSection(type)}
                        className="text-primary hover:underline"
                      >
                        {" "}
                        {generateModelTitle(
                          classifiedComponents[type].modelNames
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleCheckOems}
                  className="mt-6 inline-flex items-center justify-center px-5 py-2.5 rounded-lg
             bg-white  shadow-sm hover:shadow-md transition-shadow
             focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-200"
                >
                  {/* Cart symbol */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.9-1.45L17 13M7 13V6h10v7"
                    />
                  </svg>
                  <span className=" ml-3 text-base font-medium bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                    See your cart
                  </span>
                </button>
              </>
            ) : (
              <p className="text-red-500 mb-4">
                No component data available. Please check your API connection.
              </p>
            )}
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              src={infra}
              alt="OEM Modules"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Dynamic Sections for Each Component Type */}
        {visibleSection && classifiedComponents[visibleSection] && (
          <ComponentsSection
            title={generateModelTitle(
              classifiedComponents[visibleSection].modelNames
            )}
            items={classifiedComponents[visibleSection].components}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* Order Summary Modal */}
        {showSummary && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center transition-opacity duration-300">
            <div className="bg-white p-8 rounded-lg shadow-2xl transform transition-all duration-500 w-full max-w-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>
              {orders.length > 0 ? (
                <ul className="space-y-4">
                  {orders.map((order, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center text-gray-700 border-b pb-2"
                    >
                      <span className="font-semibold">{order.model_name}</span>
                      <span className="text-blue-600">
                        Quantity: {order.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">Your cart is empty.</p>
              )}
              <button
                onClick={() => setShowSummary(false)}
                className="mt-6 px-6 py-3 text-xl bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent hover:text-gray-200 transition duration-300"
              >
                Close
              </button>
              <button onClick={handlePurchase}
                className="mt-6 px-6 py-3 text-xl bg-gradient-to-r from-blue-500
                to-teal-400 bg-clip-text text-transparent hover:text-gray-200
                transition duration-300"
              >
                Purchase
              </button>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="questions-section my-12 flex justify-center max-w-full mx-auto">
          <div
            className="question-box bg-blue-400 rounded-xl shadow-2xl h-64 w-full p-6 flex flex-col justify-center items-center"
            style={{
              background: "white",
            }}
          >
            <h4 className=" mb-4 text-2xl font-bold text-primary text-center">
              Have any questions?
            </h4>
            <button
              onClick={handleContactClick}
              className=" ml-4 py-2 px-4 rounded shadow-sm  bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent  hover:text-gray-200 transition duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components Section Component
const ComponentsSection = ({ title, items, onAddToCart }) => {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (index, value) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

return (
    <div className="bg-gray-100 p-6 mt-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <div className="space-y-6">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row md:justify-between md:items-center hover:shadow-lg transition-shadow duration-300"
                >
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {item.model_name}
                        </h3>
                        
                    </div>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <input
                            type="number"
                            min="1"
                            value={quantities[index] || 1}
                            onChange={(e) =>
                                handleQuantityChange(index, parseInt(e.target.value) || 1)
                            }
                            placeholder="Qty"
                            className="w-20 p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <button
                            onClick={() => onAddToCart(item, quantities[index] || 1)}
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
};

export default Products;
