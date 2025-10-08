import  { useState } from 'react';

const StaffOperations = () => {
    const [role, setRole] = useState('');
    const [accountRole, setAccountRole] = useState('');
    const [viewUser, setViewUser] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your logic for submitting the selected data
        console.log('Selected Role:', role);
        console.log('Selected Account Role:', accountRole);
        console.log('Selected View User:', viewUser);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800">
            <h1 className="text-4xl font-bold mb-10">Staff Operations</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                {/* Create Role Dropdown */}
                <div className="mb-6">
                    <label
                        htmlFor="role"
                        className="block text-lg font-semibold mb-2"
                    >
                        Create Role
                    </label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-300"
                    >
                        <option value="">Select a role</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="employee">Employee</option>
                    </select>
                </div>

                {/* Create Account Role Dropdown */}
                <div className="mb-6">
                    <label
                        htmlFor="account-role"
                        className="block text-lg font-semibold mb-2"
                    >
                        Create Account: Role
                    </label>
                    <select
                        id="account-role"
                        value={accountRole}
                        onChange={(e) => setAccountRole(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-300"
                    >
                        <option value="">Select an account role</option>
                        <option value="admin-role">Admin Role</option>
                        <option value="manager-role">Manager Role</option>
                        <option value="employee-role">Employee Role</option>
                    </select>
                </div>

                {/* View Users Dropdown */}
                <div className="mb-6">
                    <label
                        htmlFor="view-users"
                        className="block text-lg font-semibold mb-2"
                    >
                        View Users
                    </label>
                    <select
                        id="view-users"
                        value={viewUser}
                        onChange={(e) => setViewUser(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-300"
                    >
                        <option value="">Select a user</option>
                        <option value="all-users">All Users</option>
                        <option value="active-users">Active Users</option>
                        <option value="inactive-users">Inactive Users</option>
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

export default StaffOperations;
