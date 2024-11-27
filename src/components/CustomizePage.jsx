import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomizePage = () => {
    const navigate = useNavigate();

    const handleCardClick = (path) => {
        navigate(path);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-300 to-blue-500 py-40 px-6 flex flex-col items-center pb-24">
            <h1 className="text-4xl font-bold text-white mb-10 shadow-md">
                Customize Your Solution
            </h1>
            <p className="text-lg text-gray-100 mb-16 max-w-lg text-center">
                Select an option to start building or customizing your robotic solution to meet your unique needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
                {/* Create Robot Card */}
                <div
                    onClick={() => handleCardClick('/create-robot')}
                    className="bg-white p-8 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl flex flex-col items-center"
                >
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6 shadow-md">
                        <span className="text-white text-2xl font-bold">🤖</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                        Create Robot
                    </h2>
                    <p className="text-gray-700 text-center">
                        Design a new robot from scratch with custom features to meet your specific project requirements.
                    </p>
                </div>

                {/* Customize Your Robot Card */}
                <div
                    onClick={() => handleCardClick('/customize-robot')}
                    className="bg-white p-8 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl flex flex-col items-center"
                >
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6 shadow-md">
                        <span className="text-white text-2xl font-bold">🔧</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                        Customize Your Robot
                    </h2>
                    <p className="text-gray-700 text-center">
                        Modify an existing robot model to better fit your unique project specifications and objectives.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CustomizePage;
