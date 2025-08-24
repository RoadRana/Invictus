import  { useState } from 'react';

const ServiceOperations = () => {
    const [service, setService] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [serviceApproach, setServiceApproach] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Selected Service:', service);
        console.log('Service Name:', serviceName);
        console.log('Service Description:', serviceDescription);
        console.log('Service Approach:', serviceApproach);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800">
            <h1 className="text-4xl font-bold mb-10">Service Operations</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                {/* Create Service Dropdown */}
                <div className="mb-6">
                    <label
                        htmlFor="service"
                        className="block text-lg font-semibold mb-2"
                    >
                        Create Service
                    </label>
                    <select
                        id="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-300"
                    >
                        <option value="">Select a service</option>
                        <option value="service1">Service 1</option>
                        <option value="service2">Service 2</option>
                        <option value="service3">Service 3</option>
                    </select>
                </div>

                {/* Service Name Dropdown */}
                <div className="mb-6">
                    <label
                        htmlFor="service-name"
                        className="block text-lg font-semibold mb-2"
                    >
                        Name
                    </label>
                    <select
                        id="service-name"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-300"
                    >
                        <option value="">Select a service name</option>
                        <option value="cleaning">Cleaning</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="consultation">Consultation</option>
                    </select>
                </div>

                {/* Service Description Dropdown */}
                <div className="mb-6">
                    <label
                        htmlFor="service-description"
                        className="block text-lg font-semibold mb-2"
                    >
                        Description
                    </label>
                    <select
                        id="service-description"
                        value={serviceDescription}
                        onChange={(e) => setServiceDescription(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-300"
                    >
                        <option value="">Select a description</option>
                        <option value="short">Short Term Service</option>
                        <option value="long">Long Term Service</option>
                        <option value="one-time">One-Time Service</option>
                    </select>
                </div>

                {/* Service Approach Dropdown */}
                <div className="mb-6">
                    <label
                        htmlFor="service-approach"
                        className="block text-lg font-semibold mb-2"
                    >
                        Approach
                    </label>
                    <select
                        id="service-approach"
                        value={serviceApproach}
                        onChange={(e) => setServiceApproach(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-300"
                    >
                        <option value="">Select an approach</option>
                        <option value="automated">Automated</option>
                        <option value="manual">Manual</option>
                        <option value="hybrid">Hybrid</option>
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

export default ServiceOperations;
