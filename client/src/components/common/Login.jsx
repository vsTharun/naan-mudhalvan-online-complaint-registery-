import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Login = () => {
   const navigate = useNavigate();
   const [user, setUser] = useState({
      email: "",
      password: ""
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      await axios.post("http://localhost:8000/Login", user)
         .then((res) => {
            alert("Successfully logged in");
            localStorage.setItem("user", JSON.stringify(res.data));
            const isLoggedIn = JSON.parse(localStorage.getItem("user"));
            const { userType } = isLoggedIn;
            switch (userType) {
               case "Admin":
                  navigate("/AdminHome");
                  break;
               case "Ordinary":
                  navigate("/HomePage");
                  break;
               case "Agent":
                  navigate("/AgentHome");
                  break;
               default:
                  navigate("/Login");
                  break;
            }
         })
         .catch((err) => {
            if (err.response && err.response.status === 401) {
               alert("User doesn't exist");
            }
            navigate("/Login");
         });
   };

   return (
      <>
         <Navbar bg="light" variant="light">
            <Container>
               <Navbar.Brand className="fw-bold">Complaint Registery</Navbar.Brand>
               <div className="nav-buttons ms-auto">
                  <Link to="/">
                     <button className="btn btn-outline-secondary mx-2">Home</button>
                  </Link>
                  <Link to="/signup">
                     <button className="btn btn-outline-secondary mx-2">Sign Up</button>
                  </Link>
                  <Link to="/login">
                     <button className="btn btn-outline-secondary mx-2">Login</button>
                  </Link>
               </div>
            </Container>
         </Navbar>

         <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
               <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                     <div className="card shadow-lg p-4 border-0">
                        <div className="card-body text-center">
                           <h2 className="fw-bold mb-4">Login to Register Complaints</h2>
                           <p className="text-muted mb-5">Please enter your credentials</p>
                           <form onSubmit={handleSubmit}>
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
                              <button className="btn btn-primary btn-lg w-100" type="submit">Login</button>
                           </form>
                           <p className="mt-4">Don’t have an account? <Link to="/signup">Sign Up</Link></p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default Login;
