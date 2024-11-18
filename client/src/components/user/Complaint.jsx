import axios from 'axios';
import React, { useState } from 'react';

const Complaint = () => {
   const user = JSON.parse(localStorage.getItem('user'));
   const [userComplaint, setUserComplaint] = useState({
      userId: user._id,
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      status: '',
      comment: ''
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUserComplaint({ ...userComplaint, [name]: value });
   };

   const handleClear = () => {
      setUserComplaint({
         userId: '',
         name: '',
         address: '',
         city: '',
         state: '',
         pincode: '',
         status: '',
         comment: ''
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         // eslint-disable-next-line no-unused-vars
         const response = await axios.post(`http://localhost:8000/Complaint/${user._id}`, userComplaint);
         alert("Your complaint has been submitted!");
         handleClear();
      } catch (error) {
         console.error('Error sending complaint:', error);
         alert("Something went wrong!");
      }
   };

   return (
      <div className="complaint-container d-flex justify-content-center">
         <form onSubmit={handleSubmit} className="complaint-form bg-light p-4 shadow rounded">
            <h3 className="text-center mb-4">Register Your Complaint</h3>

            <div className="mb-3">
               <label htmlFor="name" className="form-label">Name</label>
               <input name="name" onChange={handleChange} value={userComplaint.name} type="text" className="form-control" id="name" required />
            </div>

            <div className="mb-3">
               <label htmlFor="address" className="form-label">Address</label>
               <input name="address" onChange={handleChange} value={userComplaint.address} type="text" className="form-control" id="address" required />
            </div>

            <div className="mb-3">
               <label htmlFor="city" className="form-label">City</label>
               <input name="city" onChange={handleChange} value={userComplaint.city} type="text" className="form-control" id="city" required />
            </div>

            <div className="mb-3">
               <label htmlFor="state" className="form-label">State</label>
               <input name="state" onChange={handleChange} value={userComplaint.state} type="text" className="form-control" id="state" required />
            </div>

            <div className="mb-3">
               <label htmlFor="pincode" className="form-label">Pincode</label>
               <input name="pincode" onChange={handleChange} value={userComplaint.pincode} type="text" className="form-control" id="pincode" required />
            </div>

            <div className="mb-3">
               <label htmlFor="status" className="form-label">Status</label>
               <input placeholder="Type 'Pending'" name="status" onChange={handleChange} value={userComplaint.status} type="text" className="form-control" id="status" required />
            </div>

            <div className="mb-3">
               <label htmlFor="comment" className="form-label">Description</label>
               <textarea name="comment" onChange={handleChange} value={userComplaint.comment} className="form-control" rows="4" required></textarea>
            </div>

            <div className="text-center">
               <button type="submit" className="btn btn-primary w-100">Submit Complaint</button>
            </div>
         </form>
      </div>
   );
};

export default Complaint;
