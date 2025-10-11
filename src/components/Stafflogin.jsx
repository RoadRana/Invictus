import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StaffLogin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

    const handleLogin = (event) => {
        event.preventDefault();
        
        alert("Login successful");
        handleCloseModal();
        navigate('/operations'); 
    };

    return (
        <>
            {/* Login Button in the Header */}
            <button
                onClick={handleOpenModal}
                className="text-primary hover:text-secondary"
            >
                Staff Login
            </button>

            {/* Modal for Staff Login */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white    p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h1 className="text-primary  text-xl mb-8 "> Staff Login </h1>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label className="block text-primary text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="shadow appearance-none border rounded w-full py-3 px-4 text-primary leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-primary text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="shadow appearance-none border rounded w-full py-3 px-4 text-primary leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-secondary"
                                >
                                    Log In
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="ml-4 bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-secondary"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default StaffLogin;
