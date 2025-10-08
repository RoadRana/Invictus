import  { useState } from 'react';

const OperationsPage = () => {
    // State management for Staff Operations form
    const [role, setRole] = useState('');
    const [accountRole, setAccountRole] = useState('');
    const [viewUser, setViewUser] = useState('');

    // State management for Robot Operations form
    const [robotType, setRobotType] = useState('');
    const [robotModel, setRobotModel] = useState('');
    const [componentType, setComponentType] = useState('');
    const [componentModel, setComponentModel] = useState('');
    const [robotIcon, setRobotIcon] = useState('');

    // State management for Service Operations form
    const [service, setService] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [serviceApproach, setServiceApproach] = useState('');

    // Handle form submission for all sections
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Selected Role:', role, accountRole, viewUser);
        console.log('Selected Robot:', robotType, robotModel, componentType, componentModel, robotIcon);
        console.log('Selected Service:', service, serviceName, serviceDescription, serviceApproach);
    };

    return (
        <div className="flex flex-col items-center justify-start h-full bg-gray-50 p-8 text-gray-800 space-y-12">
            <h1 className="text-4xl font-bold mb-8">Operations Dashboard</h1>

            {/* Staff Operations Form */}
            <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Staff Operations</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="role" className="block mb-2 text-lg">Create Role</label>
                        <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="block w-full p-2 border rounded-md">
                            <option value="">Select a role</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="accountRole" className="block mb-2 text-lg">Create Account: Role</label>
                        <select id="accountRole" value={accountRole} onChange={(e) => setAccountRole(e.target.value)} className="block w-full p-2 border rounded-md">
                            <option value="">Select an account role</option>
                            <option value="admin-role">Admin Role</option>
                            <option value="manager-role">Manager Role</option>
                            <option value="employee-role">Employee Role</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="viewUser" className="block mb-2 text-lg">View Users</label>
                        <select id="viewUser" value={viewUser} onChange={(e) => setViewUser(e.target.value)} className="block w-full p-2 border rounded-md">
                            <option value="">Select a user</option>
                            <option value="all-users">All Users</option>
                            <option value="active-users">Active Users</option>
                            <option value="inactive-users">Inactive Users</option>
                        </select>
                    </div>
                </form>
            </div>

            {/* Robot Operations Form */}
            <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Robot Operations</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="robotType" className="block mb-2 text-lg">Robot Types</label>
                        <select id="robotType" value={robotType} onChange={(e) => setRobotType(e.target.value)} className="block w-full p-2 border rounded-md">
                            <option value="">Select a robot type</option>
                            <option value="autonomous">Autonomous</option>
                            <option value="manual">Manual</option>
                            <option value="semi-autonomous">Semi-Autonomous</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="robotModel" className="block mb-2 text-lg">Robot Model</label>
                        <select id="robotModel" value={robotModel} onChange={(e) => setRobotModel(e.target.value)} className="block w-full p-2 border rounded-md">
                            <option value="">Select a robot model</option>
                            <option value="rx100">RX100</option>
                            <option value="tx200">TX200</option>
                            <option value="zx300">ZX300</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="componentType" className="block mb-2 text-lg">Component Types</label>
                        <select id="componentType" value={componentType} onChange={(e) => setComponentType(e.target.value)} className="block w-full p-2 border rounded-md">
                            <option value="">Select a component type</option>
                            <option value="sensor">Sensor</option>
                            <option value="actuator">Actuator</option>
                            <option value="controller">Controller</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="componentModel" className="block mb-2 text-lg">Component Models</label>
                        <select id="componentModel" value={componentModel} onChange={(e) => setComponentModel(e.target.value)} className="block w-full p-2 border rounded-md">
                            <option value="">Select a component model</option>
                            <option value="cm1">CM1</option>
                            <option value="cm2">CM2</option>
                            <option value="cm3">CM3</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="robotIcon" className="block mb-2 text-lg">Robot Icon</label>
                        <select id="robotIcon" value={robotIcon} onChange={(e) => setRobotIcon(e.target.value)} className="block w-full p-2 border rounded-md">
                            <option value="">Select a robot icon</option>
                            <option value="icon1">Robot Icon 1</option>
                            <option value="icon2">Robot Icon 2</option>
                            <option value="icon3">Robot Icon 3</option>
                        </select>
                    </div>
                </form>
            </div>

            {/* Service Operations Form */}
            <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Service Operations</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="service" className="block mb-2 text-lg">Create Service</label>
                        <select id="service" value={service} onChange={(e) => setService(e.target.value)} className="block w-full p-2 border rounded-md">
                            <option value="">Select a service</option>
                            <option value="service1">Service 1</option>
                            <option value="service2">Service 2</option>
                            <option value="service3">Service 3</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="serviceName" className="block mb-2 text-lg">Name</label>
                        <select id="serviceName" value={serviceName} onChange={(e) => setServiceName(e.target.value)} className="block w-full p-2 border rounded-md">
                            <option value="">Select a service name</option>
                            <option value="cleaning">Cleaning</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="consultation">Consultation</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="serviceDescription" className="block mb-2 text-lg">Description</label>
                        <select id="serviceDescription" value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} className="block w-full p-2 border rounded-md">
                            <option value="">Select a description</option>
                            <option value="short">Short Term Service</option>
                            <option value="long">Long Term Service</option>
                            <option value="one-time">One-Time Service</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="serviceApproach" className="block mb-2 text-lg">Approach</label>
                        <select id="serviceApproach" value={serviceApproach} onChange={(e) => setServiceApproach(e.target.value)} className="block w-full p-2 border rounded-md">
                            <option value="">Select an approach</option>
                            <option value="automated">Automated</option>
                            <option value="manual">Manual</option>
                            <option value="hybrid">Hybrid</option>
                        </select>
                    </div>
                </form>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                onClick={handleSubmit}
                className="bg-blue-600 text-white font-bold py-3 px-6 rounded mt-8 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                Submit All Operations
            </button>
        </div>
    );
};

export default OperationsPage;


