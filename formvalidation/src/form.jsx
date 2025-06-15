import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const countryCityMap = {
  India: ['Delhi', 'Mumbai', 'Bangalore'],
  USA: ['New York', 'Los Angeles', 'Chicago'],
  UK: ['London', 'Manchester', 'Birmingham']
};

export default function BasicForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    showPassword: false,
    phoneCode: '',
    phoneNumber: '',
    country: '',
    city: '',
    pan: '',
    aadhar: ''
  });

  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedCountry = formData.country;
    setCities(selectedCountry ? countryCityMap[selectedCountry] || [] : []);
    setFormData(prev => ({ ...prev, city: '' }));
  }, [formData.country]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'Required';
    if (!formData.lastName) newErrors.lastName = 'Required';
    if (!formData.username) newErrors.username = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Required';
    if (!formData.phoneCode) newErrors.phoneCode = 'Required';
    if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = '10 digits required';
    if (!formData.country) newErrors.country = 'Required';
    if (!formData.city) newErrors.city = 'Required';
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan)) newErrors.pan = 'Invalid PAN';
    if (!/^\d{12}$/.test(formData.aadhar)) newErrors.aadhar = '12 digits required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      navigate('/success', { state: formData });
    }
  };

  const isFormValid = Object.keys(validate()).length === 0;

  return (
    <div className="my-20">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {[
          ['First Name', 'firstName'],
          ['Last Name', 'lastName'],
          ['Username', 'username'],
          ['Email', 'email'],
          ['PAN No.', 'pan'],
          ['Aadhar No.', 'aadhar']
        ].map(([label, name]) => (
          <div key={name}>
            <label>{label}: </label>
            <input name={name} value={formData[name]} onChange={handleChange} />
            {errors[name] && <span style={{ color: 'red' }}> {errors[name]}</span>}
          </div>
        ))}

        <div>
          <label>Password: </label>
          <input
            type={formData.showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <label>
            <input
              type="checkbox"
              name="showPassword"
              checked={formData.showPassword}
              onChange={handleChange}
            /> Show
          </label>
          {errors.password && <span style={{ color: 'red' }}> {errors.password}</span>}
        </div>

        <div>
          <label>Phone No: </label>
          <input
            name="phoneCode"
            placeholder="+91"
            value={formData.phoneCode}
            onChange={handleChange}
            style={{ width: '60px' }}
          />
          <input
            name="phoneNumber"
            placeholder="1234567890"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneCode && <span style={{ color: 'red' }}> {errors.phoneCode}</span>}
          {errors.phoneNumber && <span style={{ color: 'red' }}> {errors.phoneNumber}</span>}
        </div>

        <div>
          <label>Country: </label>
          <select name="country" value={formData.country} onChange={handleChange}>
            <option value="">Select</option>
            {Object.keys(countryCityMap).map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
          {errors.country && <span style={{ color: 'red' }}> {errors.country}</span>}
        </div>

        <div>
          <label>City: </label>
          <select name="city" value={formData.city} onChange={handleChange}>
            <option value="">Select</option>
            {cities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
          {errors.city && <span style={{ color: 'red' }}> {errors.city}</span>}
        </div>

        <button type="submit" disabled={!isFormValid}>Submit</button>
      </form>
    </div>
  );
}
