import { useState } from "react";

const RobotCard = ({ robot, onAdd }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">{robot.name}</h2>
      <p className="text-gray-600 mb-4 text-center">{robot.description}</p>
      <div className="flex items-center space-x-4 mt-4">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))
          }
          className="w-20 p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={() => onAdd(robot, quantity)}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const CreateRobotPage = () => {
  const [cart, setCart] = useState([]);

  const robotOptions = [
    { id: 1, name: "Remotely Operated Vehicle IN100 ROV", description: "Explore depths of up to 100m with precision and ease." },
    { id: 2, name: "Autonomous Surface Vehicle MaatSeer ASV", description: "Navigate the surface with advanced sensors for research and reconnaissance." },
    { id: 3, name: "Remotely Operated Vehicle IN300 ROV", description: "Descend to 300m for comprehensive inspections and operations." },
  ];

  const addToCart = (robot, quantity) => {
    setCart((prev) => {
      const existing = prev.find((it) => it.id === robot.id);
      if (existing) {
        return prev.map((it) =>
          it.id === robot.id ? { ...it, quantity: it.quantity + quantity } : it
        );
      }
      return [...prev, { ...robot, quantity }];
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 py-40 px-4 flex flex-col items-center pb-24">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">Create Robot</h1>
      <p className="text-lg text-gray-700 mb-16 max-w-lg text-center">
        Choose from our advanced robot models, specify the quantity, and add to your cart.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-4xl">
        {robotOptions.map((robot) => (
          <RobotCard key={robot.id} robot={robot} onAdd={addToCart} />
        ))}
      </div>

      {/* Cart Summary */}
      <div className="w-full max-w-2xl bg-white p-6 mt-16 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cart Summary</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is currently empty.</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center text-gray-700 border-b pb-2">
                <span className="font-semibold">{item.name}</span>
                <span>Quantity: {item.quantity}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CreateRobotPage;
