import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Community from './components/Community';
import Profile from './components/Profile';
import Services from './components/Services';
import Products from './components/Products';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SignUp from './components/Signup';
import SignIn from './components/Signin';
import PipelineInspection from './components/Pipeline'; // Import the PipelineInspection component
import ScrollToTop from './components/ScrollToTop';
// import OperationsPage from './components/OperationsPage';
import CustomizePage from './components/CustomizePage';
import CreateRobot from './components/CreateRobotPage'; // Assume you have this component
// import CustomizeRobot from './components/CustomizeRobot'; // Assume you have this component


function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />

        <div className="content-container">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path='/services' element={<Services />} />
            <Route path="/pipeline-inspection" element={<PipelineInspection />} /> {/* Add this route */}

            <Route path='/products' element={<Products />} />
            <Route path="/customize" element={<CustomizePage />} />
            <Route path="/create-robot" element={<CreateRobot />} /> {/* Add this route
            {/* <Route path="/customize-robot" element={<CustomizeRobot />} /> Add this route */}

            <Route path="/community" element={<Community />} />
            <Route path='/contact' element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/operations" element={<OperationsPage />} /> */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
