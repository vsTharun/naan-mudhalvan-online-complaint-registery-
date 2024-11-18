import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Complaint from '../user/Complaint';
import Status from '../user/Status';

const HomePage = () => {
   const navigate = useNavigate();
   const [activeComponent, setActiveComponent] = useState('Complaint');
   const [userName, setUserName] = useState('');

   useEffect(() => {
      const getData = async () => {
         try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
               const { name } = user;
               setUserName(name);
            } else {
               navigate('/');
            }
         } catch (error) {
            console.log(error);
         }
      };

      getData();
   }, [navigate]);

   const handleNavLinkClick = (componentName) => {
      setActiveComponent(componentName);
   };

   const Logout = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   return (
      <>
         <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
               <h1 className="navbar-brand text-dark" style={{ fontWeight: 'bold' }}>
                  Hi, {userName}
               </h1>
               <div className="navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                     <li className="nav-item mb-2">
                        <NavLink
                           to="#"
                           className={`nav-link btn btn-light ${activeComponent === 'Complaint' ? 'active' : ''}`}
                           onClick={() => handleNavLinkClick('Complaint')}
                        >
                           Complaint Register
                        </NavLink>
                     </li>
                     <li className="nav-item mb-2">
                        <NavLink
                           to="#"
                           className={`nav-link btn btn-light ${activeComponent === 'Status' ? 'active' : ''}`}
                           onClick={() => handleNavLinkClick('Status')}
                        >
                           Status
                        </NavLink>
                     </li>
                  </ul>
               </div>
               <button className="btn btn-danger" onClick={Logout}>
                  Log Out
               </button>
            </div>
         </nav>

         <div className="container mt-4">
            {activeComponent === 'Complaint' ? <Complaint /> : null}
            {activeComponent === 'Status' ? <Status /> : null}
         </div>

      </>
   );
};

export default HomePage;
