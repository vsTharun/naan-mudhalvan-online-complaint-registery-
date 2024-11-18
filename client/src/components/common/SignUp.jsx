import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';

const Signup = () => {
   const navigate = useNavigate();
   const [userType, setUserType] = useState("Select User");
   const [user, setUser] = useState({
      fullName: "",
      email: "",
      password: "",
      mobile: "",
      userType: ""
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
   };

   const handleUserTypeChange = (type) => {
      setUserType(type);
      setUser({ ...user, userType: type });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      // Confirm a valid user type is selected
      if (userType === "Select User") {
         alert("Please select a valid user type.");
         return;
      }

      // Check the payload before sending
      const payload = { ...user, userType };
      console.log("Submitting user data:", payload);

      try {
         const response = await axios.post("http://localhost:8000/signup", payload);
         alert("Successfully registered");
         console.log("Response from server:", response.data);
         navigate("/login");
      } catch (error) {
         console.error("Registration failed:", error.response?.data || error.message);
         alert("Registration failed, please try again.");
      }
   };

   return (
      <>
         <Navbar bg="light" variant="light">
            <Container>
               <Navbar.Brand className="fw-bold">Complaint Registry</Navbar.Brand>
               <div className="nav-buttons ms-auto">
                  <Link to="/"><button className="btn btn-outline-secondary mx-2">Home</button></Link>
                  <Link to="/signup"><button className="btn btn-outline-secondary mx-2">Sign Up</button></Link>
                  <Link to="/login"><button className="btn btn-outline-secondary mx-2">Login</button></Link>
               </div>
            </Container>
         </Navbar>

         <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
               <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                     <div className="card shadow-lg p-4 border-0">
                        <div className="card-body text-center">
                           <h2 className="fw-bold mb-4">Register for Complaint Management</h2>
                           <p className="text-muted mb-5">Please enter your details</p>
                           <form onSubmit={handleSubmit}>
                              <div className="form-outline mb-4">
                                 <input
                                    type="text"
                                    name="fullName"
                                    value={user.fullName}
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                    required
                                    placeholder="Full Name"
                                 />
                              </div>
                              <div className="form-outline mb-4">
                                 <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                    required
                                    placeholder="Email"
                                 />
                              </div>
                              <div className="form-outline mb-4">
                                 <input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                    required
                                    autoComplete="off"
                                    placeholder="Password"
                                 />
                              </div>
                              <div className="form-outline mb-4">
                                 <input
                                    type="tel"
                                    name="mobile"
                                    value={user.mobile}
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                    required
                                    placeholder="Mobile No."
                                 />
                              </div>
                              <div className="form-outline mb-4">
                                 <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                       {userType}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                       <Dropdown.Item onClick={() => handleUserTypeChange("Ordinary")}>Ordinary</Dropdown.Item>
                                       <Dropdown.Item onClick={() => handleUserTypeChange("Admin")}>Admin</Dropdown.Item>
                                       <Dropdown.Item onClick={() => handleUserTypeChange("Agent")}>Agent</Dropdown.Item>
                                    </Dropdown.Menu>
                                 </Dropdown>
                                 <label className="form-label mt-2" htmlFor="userType">Select User Type</label>
                              </div>
                              <button className="btn btn-primary btn-lg w-100" type="submit">Register</button>
                           </form>
                           <p className="mt-4">Already have an account? <Link to="/login">Login</Link></p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default Signup;
