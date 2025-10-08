import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Community from "./components/Community";
import Profile from "./components/Profile";
import Services from "./components/Services";
import Products from "./components/Products";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SignUp from "./components/Signup";
import SignIn from "./components/Signin";
import InfrastructureInspectionAndMaintenance from "./components/InfrastructureInspectionAndMaintenance";
import ScrollToTop from "./components/ScrollToTop";
import CustomizePage from "./components/CustomizePage";
import CreateRobot from "./components/CreateRobotPage";
import StaffLogin from "./components/Stafflogin";
import OperationsPage from "./components/Operations";

function App() {
  return (
    <Router basename="/Invictus" future={{ v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route
              path="/src/components/InfrastructureInspectionAndMaintenance"
              element={<InfrastructureInspectionAndMaintenance />}
            />
            <Route path="/products" element={<Products />} />
            <Route path="/customize" element={<CustomizePage />} />
            <Route path="/create-robot" element={<CreateRobot />} />
            {/* <Route path="/community" element={<Community />} /> */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<Profile />} />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/operations" element={<OperationsPage />} />

            {/* <Route path="/staffoperations" element={<StaffOperations />} />
            <Route path="/stafflogin" element={<StaffLogin />} /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );

}

export default App;
