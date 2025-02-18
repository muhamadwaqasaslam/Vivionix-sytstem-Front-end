import React, { useState, useEffect } from "react";
import "./EmployeeTable.css";
import axios from "axios";
import { BASE_URL } from "../config";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [searchQueries, setSearchQueries] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    cnic: "",
    address: "",
    bank_account_number: "",
    hire_date: "",
    department: "",
    role: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${BASE_URL}employee/employees/list`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.data) {
          setEmployees(response.data);
        }
      } catch (err) {
        setError("Failed to fetch employee data. Please try again.");
        console.error(err);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) => {
    return Object.keys(searchQueries).every((key) => {
      const query = searchQueries[key].toLowerCase();
      const employeeValue = employee[key]
        ? employee[key].toString().toLowerCase()
        : "";
      return employeeValue.includes(query);
    });
  });

  const handleUpdateClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
    setSuccessMessage("");
    setFailureMessage("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestUrl = `${BASE_URL}employee/employees/edit/${selectedEmployee.email}/`;

      const updatedEmployeeData = {
        ...selectedEmployee,
      };

      const response = await axios.put(requestUrl, updatedEmployeeData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setEmployees((prevEmployees) =>
          prevEmployees.map((employee) =>
            employee.username === selectedEmployee.username
              ? { ...employee, ...updatedEmployeeData }
              : employee
          )
        );
        setSuccessMessage("Employee updated successfully!");
        setIsModalOpen(false);
      } else {
        setFailureMessage("Failed to update employee.");
      }
    } catch (err) {
      console.error("Error during the update:", err);
      setFailureMessage("Failed to update employee. Please try again.");
    }
  };

  const handleInputChange = (field, value) => {
    setSelectedEmployee({ ...selectedEmployee, [field]: value });
  };

  const handleSearchChange = (e, key) => {
    setSearchQueries({
      ...searchQueries,
      [key]: e.target.value,
    });
  };

  return (
    <div className="employee-table">
      <h2>Employee List</h2>

      {error && <div className="error-message">{error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {failureMessage && (
        <div className="failure-message">{failureMessage}</div>
      )}

      <table>
        <thead>
          <tr>
            {[
              "Username",
              "Email",
              "First Name",
              "Last Name",
              "Phone Number",
              "CNIC",
              "Address",
              "Bank Account Number",
              "Hire Date",
              "Department",
              "Role",
            ].map((header) => (
              <th key={header}>{header}</th>
            ))}
            <th rowSpan="2" >Action</th> {/* Adding rowspan to Action column */}
          </tr>
          <tr>
            {Object.keys(searchQueries).map((key) => (
              <th key={key}>
                <input
                  type="text"
                  placeholder={`Search ${key.replace("_", " ")}`}
                  onChange={(e) => handleSearchChange(e, key)}
                />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.username}>
              <td>{employee.username}</td>
              <td>{employee.email}</td>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.phone_number}</td>
              <td>{employee.cnic}</td>
              <td>{employee.address}</td>
              <td>{employee.bank_account_number}</td>
              <td>{employee.hire_date}</td>
              <td>{employee.department}</td>
              <td>{employee.role}</td>
              <td>
                <button
                  onClick={() => handleUpdateClick(employee)}
                  className="update-button"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="employee-modal">
          <div className="employee-modal-content">
            <h3>Update Employee</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={selectedEmployee.username || ""}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  value={selectedEmployee.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={selectedEmployee.first_name || ""}
                  onChange={(e) =>
                    handleInputChange("first_name", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={selectedEmployee.last_name || ""}
                  onChange={(e) =>
                    handleInputChange("last_name", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={selectedEmployee.phone_number || ""}
                  onChange={(e) =>
                    handleInputChange("phone_number", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>CNIC</label>
                <input
                  type="text"
                  value={selectedEmployee.cnic || ""}
                  onChange={(e) => handleInputChange("cnic", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={selectedEmployee.address || ""}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Bank Account Number</label>
                <input
                  type="text"
                  value={selectedEmployee.bank_account_number || ""}
                  onChange={(e) =>
                    handleInputChange("bank_account_number", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Hire Date</label>
                <input
                  type="date"
                  value={selectedEmployee.hire_date || ""}
                  onChange={(e) =>
                    handleInputChange("hire_date", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  value={selectedEmployee.department || ""}
                  onChange={(e) =>
                    handleInputChange("department", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input
                  type="text"
                  value={selectedEmployee.role || ""}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                />
              </div>
              <div className="modal-button-container">
                <button
                  type="button"
                  className="modal-close-button"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button type="submit" className="modal-button">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
