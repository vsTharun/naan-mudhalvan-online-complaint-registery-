import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Footer from './FooterC';
import Image1 from '../../Images/complaint.png';

const Home = () => {
   return (
      <>
         <Navbar bg="light" variant="light" expand="lg" className="custom-navbar">
            <Container>
               <Navbar.Brand>Complaint Registery</Navbar.Brand>
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

         <Container className="home-container">
            <div className="row align-items-center">
               {/* Left side: Image */}
               <div className="col-md-6">
                  <div className="home-image">
                     <img src={Image1} alt="Complaint" className="img-fluid" />
                  </div>
               </div>

               {/* Right side: Text and Button */}
               <div className="col-md-6 text-right">
                  <div className="home-content">
                     <p>
                        <span className="highlight-large">Empower Your Team,</span><br />
                        <span className="highlight-medium">Exceed Customer Expectations:</span><br />
                        <span className="highlight-small">Discover our Complaint Management Solution</span><br />
                        <Link to="/login">
                           <button className="btn btn-primary btn-lg mt-3">Register Your Complaint</button>
                        </Link>
                     </p>
                  </div>
               </div>
            </div>
         </Container>

         <Footer />
      </>
   );
};

export default Home;
