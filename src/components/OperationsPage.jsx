import  { useState } from 'react';

const OperationsPage = () => {
  const [activeForm, setActiveForm] = useState(null); // Track which form to display

  const handleButtonClick = (formName) => {
    setActiveForm(formName);
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-indigo-500 via-blue-500 to-pink-500 text-white transition-all duration-300">
      {/* Button Area */}
      <div
        className={`flex flex-col items-center justify-center transition-all duration-500 ease-in-out
                    ${activeForm ? 'w-1/4 items-start pl-8' : 'w-full items-center'}`}
      >
        <h1 className="text-4xl font-extrabold mb-8 text-white bg-clip-text">
          Operations
        </h1>
        <div className="space-y-4 w-full max-w-md">
          <button
            onClick={() => handleButtonClick('staff')}
            className={`w-full py-3 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-bold rounded-lg shadow-lg hover:from-purple-500 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-transform ${
              activeForm === 'staff' ? 'transform scale-105' : ''
            }`}
          >
            Staff Operations
          </button>

          <button
            onClick={() => handleButtonClick('robot')}
            className={`w-full py-3 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-bold rounded-lg shadow-lg hover:from-purple-500 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-transform ${
              activeForm === 'robot' ? 'transform scale-105' : ''
            }`}
          >
            Robot Operations
          </button>

          <button
            onClick={() => handleButtonClick('service')}
            className={`w-full py-3 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-bold rounded-lg shadow-lg hover:from-purple-500 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-transform ${
              activeForm === 'robot' ? 'transform scale-105' : ''
            }`}
          >
            Service Operations
          </button>
        </div>
      </div>

      {/* Form Area */}
      <div
        className={`transition-all duration-500 ease-in-out flex items-start justify-center ${activeForm ? 'w-3/4 p-8 bg-bindigo-600 text-gray-800 rounded-lg shadow-2xl' : 'w-0 overflow-hidden'}`}
      >
        {activeForm === 'staff' && (
          <form className="w-full animate-fade-in space-y-6 bg-gray-100 p-6 rounded-lg shadow-lg mt-20">
            {' '}
            {/* Added mt-20 for margin */}
            <h2 className="text-3xl font-bold mb-4 text-blue-600">
              Staff Operations Form
            </h2>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Create Role</label>
              <select className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300">
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">
                Create Account: Role
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300">
                <option value="">Select Account Role</option>
                <option value="admin-role">Admin Role</option>
                <option value="manager-role">Manager Role</option>
                <option value="employee-role">Employee Role</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">View Users</label>
              <select className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300">
                <option value="">Select View</option>
                <option value="all-users">All Users</option>
                <option value="active-users">Active Users</option>
                <option value="inactive-users">Inactive Users</option>
              </select>
            </div>
          </form>
        )}

        {activeForm === 'robot' && (
          <form className="w-full animate-fade-in space-y-6 bg-gray-100 p-6 rounded-lg shadow-lg mt-20">
            <h2 className="text-3xl font-bold mb-4 text-blue-600">
              Robot Operations Form
            </h2>
            <div className="mb-4 ">
              <label className="block mb-2 font-semibold">Robot Types</label>
              <select className="w-full p-2 border border-gray-300 rounded-md shadow-sm ">
                <option value="">Select Robot Type</option>
                <option value="autonomous">Autonomous</option>
                <option value="manual">Manual</option>
                <option value="semi-autonomous">Semi-Autonomous</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Robot Model</label>
              <select className="w-full p-2 border border-blue-300 rounded-md shadow-sm ">
                <option value="">Select Robot Model</option>
                <option value="rx100">RX100</option>
                <option value="tx200">TX200</option>
                <option value="zx300">ZX300</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">
                Component Types
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-purple-300">
                <option value="">Select Component Type</option>
                <option value="sensor">Sensor</option>
                <option value="actuator">Actuator</option>
                <option value="controller">Controller</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">
                Component Models
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-purple-300">
                <option value="">Select Component Model</option>
                <option value="cm1">CM1</option>
                <option value="cm2">CM2</option>
                <option value="cm3">CM3</option>
              </select>
            </div>
          </form>
        )}

        {activeForm === 'service' && (
          <form className=" w-full animate-fade-in space-y-6 bg-gray-100 p-6 rounded-lg shadow-lg mt-20">
            <h2 className="text-3xl font-bold mb-4 text-blue-600">
              Service Operations Form
            </h2>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Create Service</label>
              <select className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-red-300">
                <option value="">Select Service</option>
                <option value="service1">Service 1</option>
                <option value="service2">Service 2</option>
                <option value="service3">Service 3</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Name</label>
              <select className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-red-300">
                <option value="">Select Name</option>
                <option value="cleaning">Cleaning</option>
                <option value="maintenance">Maintenance</option>
                <option value="consultation">Consultation</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Description</label>
              <select className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-red-300">
                <option value="">Select Description</option>
                <option value="short">Short Term Service</option>
                <option value="long">Long Term Service</option>
                <option value="one-time">One-Time Service</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Approach</label>
              <select
                className="
                            w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-red-300"
              >
                <option value="">Select Approach</option>
                <option value="automated">Automated</option>
                <option value="manual">Manual</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default OperationsPage;
