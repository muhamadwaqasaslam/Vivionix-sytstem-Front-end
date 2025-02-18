import React, { useState, useEffect } from 'react';
import "./EmployeeRegistration.css";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { BASE_URL } from '../config';

const RegistrationForm = () => {
  const initialEmployeeState = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: '',
    password: '',
    cnic: '',
    address: '',
    bank_account_number: '',
    hire_date: null,
    department: '',
    role: '',
  };

  const [employee, setEmployee] = useState(initialEmployeeState);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch departments from API
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${BASE_URL}employee/departments/`);
        const data = await response.json();
        setDepartments(data); // Assuming API returns an array of departments
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    // Fetch roles from API
    const fetchRoles = async () => {
      try {
        const response = await fetch(`${BASE_URL}employee/roles/`);
        const data = await response.json();
        setRoles(data); // Assuming API returns an array of roles
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchDepartments();
    fetchRoles();
  }, []);

  const handlePhoneChange = (value) => {
    setEmployee((prevState) => ({
      ...prevState,
      phone_number: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}employee/registeration/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Employee registered successfully:', result);

      // Show success message
      setSuccessMessage('Employee registered successfully!');

      // Reset form fields
      setEmployee(initialEmployeeState);

      // Clear the success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to register employee:', error);
      alert('Failed to register employee');
    }
  };

  return (
    <div className="registration-form-container">
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form className="registration-form" onSubmit={handleSubmit}>
        <h1 className='heading'>Employee Registration Form</h1>

        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={employee.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={employee.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={employee.first_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={employee.last_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>CNIC</label>
          <input
            type="text"
            name="cnic"
            value={employee.cnic}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={employee.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Bank Account Number</label>
          <input
            type="text"
            name="bank_account_number"
            value={employee.bank_account_number}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Phone Number</label>
          <PhoneInput
            country={'us'}
            value={employee.phone_number}
            onChange={handlePhoneChange}
            inputProps={{
              name: 'phone_number',
              required: true,
            }}
            className="phone-input"
          />
        </div>

        <div className="input-group">
          <label>Hire Date</label>
          <input
            type="date"
            name="hire_date"
            value={employee.hire_date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Department</label>
          <select
            name="department"
            value={employee.department}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Role</label>
          <select
            name="role"
            value={employee.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.title}>
                {role.title}
              </option>
            ))}
          </select>
        </div>

        <div className="submit-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
