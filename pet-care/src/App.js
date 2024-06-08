import logo from "./logo.svg";
import "./App.css";
import Home from "./HomePage/Home/Home";
import Login from "./Components/Login/Login";
import { AuthProvider } from "./Components/Login/Authen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/Login/SignUp";
import Booking from "./HomePage/Booking/Booking";
import Service from "./HomePage/Service/Service";
import Blog from "./HomePage/Blog/Blog";
import About from "./HomePage/About/About";
import Profile from "./Doctor/Profile/ProfileDoctor";
import ProfileCustomer from "./Customer/Profile/ProfileCust";
import ManageDoctor from "./Admin/ManageDoctor/ManageDoctor";
import ManageAppointment from "./Admin/ManageAppointment/ManageAppointment";
import CreateSlotBooking from "./Admin/ManageAppointment/CreateSlotBooking";
import RegisterPet from "./HomePage/Booking/Booking";

function App() {
  return (
    <div className="App" id="wrapper">
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signin" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/booking" element={<Booking />} />
            <Route exact path="/service" element={<Service />} />
            <Route exact path="/blog" element={<Blog />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/profile-doctor" element={<Profile />} />
            <Route exact path="/profile-customer" element={<ProfileCustomer />} />
            <Route exact path="/manage-doctor" element={<ManageDoctor />} />
            <Route exact path="/manage-appoinment" element={<ManageAppointment />} />
            <Route exact path="/create-slot-booking" element={<CreateSlotBooking />} />
            <Route exact path="/register-pet" element={<RegisterPet/>}/>
            
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
