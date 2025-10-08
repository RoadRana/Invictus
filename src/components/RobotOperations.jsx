import  { useState } from 'react';

const RobotOperations = () => {
  const [robotType, setRobotType] = useState('');
  const [robotModel, setRobotModel] = useState('');
  const [componentType, setComponentType] = useState('');
  const [componentModel, setComponentModel] = useState('');
  const [robotIcon, setRobotIcon] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Selected Robot Type:', robotType);
        console.log('Selected Robot Model:', robotModel);
        console.log('Selected Component Type:', componentType);
        console.log('Selected Component Model:', componentModel);
        console.log('Selected Robot Icon:', robotIcon);
    };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-10">Robot Operations</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        {/* Robot Types Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="robot-type"
            className="block text-lg font-semibold mb-2"
          >
            Robot Types
          </label>
          <select
            id="robot-type"
            value={robotType}
            onChange={(e) => setRobotType(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-300"
          >
            <option value="">Select a robot type</option>
            <option value="autonomous">Autonomous</option>
            <option value="manual">Manual</option>
            <option value="semi-autonomous">Semi-Autonomous</option>
          </select>
        </div>

        {/* Robot Model Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="robot-model"
            className="block text-lg font-semibold mb-2"
          >
            Robot Model
          </label>
          <select
            id="robot-model"
            value={robotModel}
            onChange={(e) => setRobotModel(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-300"
          >
            <option value="">Select a robot model</option>
            <option value="rx100">RX100</option>
            <option value="tx200">TX200</option>
            <option value="zx300">ZX300</option>
          </select>
        </div>

        {/* Component Types Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="component-type"
            className="block text-lg font-semibold mb-2"
          >
            Component Types
          </label>
          <select
            id="component-type"
            value={componentType}
            onChange={(e) => setComponentType(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-300"
          >
            <option value="">Select a component type</option>
            <option value="sensor">Sensor</option>
            <option value="actuator">Actuator</option>
            <option value="controller">Controller</option>
          </select>
        </div>

        {/* Component Models Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="component-model"
            className="block text-lg font-semibold mb-2"
          >
            Component Models
          </label>
          <select
            id="component-model"
            value={componentModel}
            onChange={(e) => setComponentModel(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-300"
          >
            <option value="">Select a component model</option>
            <option value="cm1">CM1</option>
            <option value="cm2">CM2</option>
            <option value="cm3">CM3</option>
          </select>
        </div>

        {/* Robot Icons Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="robot-icon"
            className="block text-lg font-semibold mb-2"
          >
            Robot Icon
          </label>
          <select
            id="robot-icon"
            value={robotIcon}
            onChange={(e) => setRobotIcon(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-300"
          >
            <option value="">Select a robot icon</option>
            <option value="icon1">Robot Icon 1</option>
            <option value="icon2">Robot Icon 2</option>
            <option value="icon3">Robot Icon 3</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded w-full hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RobotOperations;
