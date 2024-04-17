

import React, { useState } from 'react';
import axios from 'axios';
import './MyForm.css'; // Import CSS for styling

const MyForm = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    permAddress: ' ',
    fileName1: '',
    fileType1: '',
    fileName2: '',
    fileType2: '',
    sameAsResidential: false,
  });
   console.log(formData.sameAsResidential)
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
     ...prevData,
      [name]: type === 'checkbox'? checked : value,
    }));

    // Clear validation errors when user starts typing again
    if (errors[name]) {
      setErrors({
       ...errors,
        [name]: '',
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.dob) {
      const dobDate = new Date(formData.dob);
      const today = new Date();
      const age = today.getFullYear() - dobDate.getFullYear();
      if (age < 18) {
        alert('Minimum age should be 18 years.');
        return;
      }
    }

    // Validate form data
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!formData.dob.trim()) {
      newErrors.dob = 'Date of Birth is required';
    }
    // if (!formData.permAddress.trim() ||!formData.permAddress.trim()) {
    //   newErrors.address = 'Address is required';
    // }
    if (!formData.fileName1.trim() ||!formData.fileType1.trim()) {
      newErrors.fileName1 = 'File Name and Type are required';
    }
    if (!formData.fileName2.trim() ||!formData.fileType2.trim()) {
      newErrors.fileName2 = 'File Name and Type are required';
    }

    // Check if file type is valid
    if (formData.fileType1.trim() &&!['image', 'pdf'].includes(formData.fileType1.trim())) {
      newErrors.fileType1 = 'Invalid file type';
    }
    if (formData.fileType2.trim() &&!['image', 'pdf'].includes(formData.fileType2.trim())) {
      newErrors.fileType2 = 'Invalid file type';
    }

    // Set errors and return if there are any
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form data
    console.log(formData);
    try {
      const response = await axios.post('http://localhost:5000/api/formdata', formData);
      alert(response.data.message)
      console.log(response.data); // Log response from backend
      // Optionally, reset form state after successful submission
      setFormData({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    permAddress: '',
    fileName1: '',
    fileType1: '',
    fileName2: '',
    fileType2: '',
    sameAsResidential: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
      <div className="row">
          <div className="col">
            <label htmlFor="firstName"><sub>First Name<span className='star'>*</span> </sub></label>
            <input type="text" id="firstName" name="firstName"
             value={formData.firstName} onChange={handleChange}
             placeholder='Enter First name' />
             {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>
          <div className="col">
            <label htmlFor="lastName"><sub>Last Name<span className='star'>*</span> </sub></label>
            <input type="text" id="lastName" name="lastName"
             value={formData.lastName} onChange={handleChange}
             placeholder='Enter Last name' />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="email"><sub>Email<span className='star'>*</span> </sub></label>
            <input type="email" id="email" name="email" 
            value={formData.email} onChange={handleChange}
            placeholder='Ex:myname@gmail.com'  />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="col">
            <label htmlFor="dob"><sub>Date of Birth<span className='star'>*</span>  </sub></label>
            <input type="date" id="dob" name="dob" 
            value={formData.dob} onChange={handleChange} 
            placeholder='Enter Date of Birth' />
               <span className='street'>(min age should be 18 years)</span> 
          </div>
        </div>
        <label>Residential Address </label>
        {formData.sameAsResidential? " ": " "}
        <div className="row">
          <div className="col">
            <label htmlFor="permAddress.street1" className='street'>
              <sub>Street 1<span className='star'>*</span> </sub></label>
            <input type="text" id="street1" name="permAddress.street1" 
            value={formData.permAddress.street1} onChange={handleChange} 
             />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          <div className="col">
            <label htmlFor="permAddress.street2" className='street'>
              <sub>Street 2<span className='star'>*</span> </sub></label>
            <input type="text" id="street2" name="permAddress.street2" 
            value={formData.permAddress.street2} onChange={handleChange}
             />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
        </div>
        <label>
        <input type='checkbox' id="sameAsResidential" 
        name="sameAsResidential" checked={formData.sameAsResidential} 
        onChange={handleChange} /> Same as Residential Address
        </label>
        <br/>
        <label>Permanent Address </label>
        {formData.sameAsResidential? " " : 
        
        <div className="row">
          <div className="col">
            <label htmlFor="permAddress.street1" className='street'><sub>Street 1 </sub></label>
            <input type="text" id="street1" name="permAddress.street1" 
            value={formData.permAddress.street1} onChange={handleChange} 
            disabled={formData.sameAsResidential} 
            />
          </div>
          
          <div className="col">
            <label htmlFor="permAddress.street2" className='street'><sub>Street 2 </sub></label>
            <input type="text" id="street2" name="permAddress.street2" 
            value={formData.permAddress.street2} onChange={handleChange}
            disabled={formData.sameAsResidential}
             />
          </div>
         
        </div>}
        
        
       
        <label>Upload Document</label>
        <div className="row">
          <div className="col">
            <label htmlFor="fileName1" className='street'>
              <sub>File Name<span className='star'>*</span></sub> </label>
            <input type="text" id="fileName1" name="fileName1" 
            value={formData.fileName1} onChange={handleChange} />
            {errors.fileName1 && <span className="error">{errors.fileName1}</span>}
          </div>
          <div className="col">
            <label htmlFor="fileType1" className='street'>
              <sub>Type of File<span className='star'>*</span> </sub> </label>
            <select id="fileType1" name="fileType1" 
            value={formData.fileType1} onChange={handleChange}>
              <option value="" >Select Type</option>
              <option value="image">Image</option>
              <option value="pdf">PDF</option>
            </select>
            <span className='street'>(image, pdf)</span>
            {errors.fileType1 && <span className="error">{errors.fileType1}</span>}
          </div>
          <div className="col">
            <label htmlFor="fileName1" className='street'> 
            <sub>Document Upload<span className='star'>*</span> </sub></label>
            <input type="file" id="file1" name="file1"
             value={formData.file1} onChange={handleChange} />
             {errors.file1 && <span className="error">{errors.file1}</span>}
          </div>
          {/* Add upload input for File 1 here */}
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="fileName2" className='street'>
              <sub>File Name<span className='star'>*</span>  </sub></label>
            <input type="text" id="fileName2" name="fileName2"
             value={formData.fileName2} onChange={handleChange} />
             {errors.fileName2 && <span className="error">{errors.fileName2}</span>}
          </div>
          <div className="col">
            <label htmlFor="fileType2" className='street'>
              <sub>Type of File<span className='star'>*</span> </sub> </label>
            <select id="fileType2" name="fileType2" 
            value={formData.fileType2} onChange={handleChange} >
              <option value="" disabled>Select Type</option>
              <option value="image">Image</option>
              <option value="pdf">PDF</option>
            </select>
            <span  className='street'>(image, pdf)</span>
            {errors.fileType2 && <span className="error">{errors.fileType2}</span>}
          </div>
          <div className="col">
            <label htmlFor="fileName2" className='street'> 
            <sub>Document Upload<span className='star'>*</span> </sub></label>
            <input type="file" id="file2" name="file2" 
             value={formData.file2} onChange={handleChange} />
             {errors.file2 && <span className="error">{errors.file2}</span>}
          </div>
          {/* Add upload input for File 2 here */}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MyForm;

