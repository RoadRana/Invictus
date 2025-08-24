import { useState, useEffect } from "react";
import IN100 from "../assets/IN100ROV.jpeg";
import MaatSeer from "../assets/services2_09.png";
import IN300 from "../assets/services2_14.png";

const CustomizePage = () => {
  const [robotData, setRobotData] = useState([]);
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    version: "",
    components: [],
  });
  const [availableVersions, setAvailableVersions] = useState([]);

  // Fetch robot data on component mount
  useEffect(() => {
    fetchRobotData();
  }, []);

  // Helper function to fetch robot data
  const fetchRobotData = async () => {
    try {
       const token =
         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU4NjI1ODI5LCJpYXQiOjE3NTYwMzM4MjksImp0aSI6ImNmZmVhZjM0MWM2NDRkOWRiMmM1ZDYzZTFlYzYyMzMxIiwidXNlcl9pZCI6NH0.GiD7tuwgWA1gp-A_-ecWerxhSpiMpih1Y5eDymKb354";
       const response = await fetch(
         "https://3b980835104d.ngrok-free.app/products/api/robot_list/",
         {
           method: "GET",
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRobotData(data);

      // Extract all unique versions from the data
      const versions = [...new Set(data.map((robot) => robot.version))];
      setAvailableVersions(versions);
    } catch (error) {
      console.error("Error fetching robot data:", error);
      
    }
  };

  const handleCardClick = (robotId) => {
    const robot = robotData.find((r) => r.id === robotId);
    if (robot) {
      setSelectedRobot(robot);
      // Initialize form data with default values
      setFormData({
        version: robot.version,
        components: robot.components.map((comp) => ({
          component_model: comp.component_model,
          quantity: 1,
        })),
      });
      setShowModal(true);
    }
  };

  const handleInputChange = (index, value) => {
    const newComponents = [...formData.components];
    newComponents[index].quantity = parseInt(value) || 1;
    setFormData({
      ...formData,
      components: newComponents,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sendOrderData = async () => {
      try {
        const token = "";

  
    
        const response = await fetch(
          "",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              robot_model: selectedRobot.id,
              components: formData.components,
            }),
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

    setShowModal(false);
  };

  return (
    <div className=" bg-white py-12 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-primary mb-6 text-center mt-14">
        Customize Your Robotic Solution
      </h1>
      <p className="text-sm text-primary mb-10  max-w-2xl text-center">
        Select a robot to start building or customizing your robotic solution to
        meet your unique operational needs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-5/6 max-w-6xl mt-10">
        {robotData.map((robot) => (
          <div
            key={robot.id}
            onClick={() => handleCardClick(robot.id)}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-primary mb-2">
                {robot.descriptive_name}
              </h2>
              <h3 className="text-lg text-primary font-semibold mb-3">
                {robot.version}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {robot.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-primary">
                  ${robot.price.toLocaleString()}
                </span>
                <button className="mt-4 py-2 px-4 rounded shadow-sm bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent hover:text-gray-200 transition duration-300">
                  Customize
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedRobot && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-400 to-teal-300 p-5 text-white">
              <h2 className="text-2xl font-bold">
                Configure {selectedRobot.descriptive_name}
              </h2>
              <p className="text-white">Customize your robotic solution</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Version Selection */}
              <div className="mb-6">
                <label className="block text-primary font-medium mb-2">
                  Select Version:
                </label>
                <select
                  value={formData.version}
                  onChange={(e) =>
                    setFormData({ ...formData, version: e.target.value } )
                  }
                  className="w-full p-3 border text-primary border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary "
                >
                  {availableVersions.map((version) => (
                    <option key={version} value={version}>
                      {version}
                    </option>
                  ))}
                </select>
              </div>

              {/* Component Quantities */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-primary mb-4">
                  Component Quantities
                </h3>
                {selectedRobot.components.map((component, index) => (
                  <div key={index} className="mb-4 ">
                    <label className="block text-primary mb-2">
                      Component {component.component_model} (Available:{" "}
                      {component.quantity}):
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={component.quantity}
                      value={formData.components[index]?.quantity || 0}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className="w-full p-3 border border-primary rounded-lg focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mt-4 py-2 px-4 rounded shadow-sm bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent hover:text-gray-200 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="mt-4 py-2 px-4 rounded shadow-sm bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent hover:text-gray-200 transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizePage;
