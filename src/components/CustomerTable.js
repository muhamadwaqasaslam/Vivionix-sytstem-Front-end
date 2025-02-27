import React, { useState } from "react";
import "./CustomerTable.css";

const CustomerTable = () => {
  const [customers, setCustomers] = useState([
    { customerid:"C001",
      id: "CRF123",
      registrationDate: "2024-01-15",
      name: "John Doe",
      address: "123 Main Street, NY",
      city: "New York",
      contactNo: "+1 234 567 890",
      category: "Retail",
      type: "Individual",
      representative: {
        name: "Jane Doe",
        designation: "Account Manager",
        email: "janedoe@example.com",
        officePhone: "+1 987 654 321",
        personalPhone: "+1 543 210 987",
        address: "456 Business Ave, NY",
      },
    },
  ]);

  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalType, setModalType] = useState(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredCustomers = customers.filter((customer) => {
    return (
      Object.values(customer).some(value =>
        typeof value === "string" && value.toLowerCase().includes(search)
      ) ||
      Object.values(customer.representative).some(value =>
        typeof value === "string" && value.toLowerCase().includes(search)
      )
    );
  });

  const openModal = (customer, type) => {
    setSelectedCustomer({ ...customer });
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedCustomer(null);
    setModalType(null);
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const updateCustomer = () => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === selectedCustomer.id ? selectedCustomer : customer
      )
    );
    closeModal();
  };

  return (
    <div className="customer-container">
      <h2 className="customer-title">Registered Customer List</h2>
      <table className="customer-table">
        <thead>
          <tr>
            <th>Customer Register By</th>
            <th>Date of Registration</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Contact No</th>
            <th>Category</th>
            <th>Type</th>
            <th>Representative</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.registrationDate}</td>
              <td>{customer.customerid}</td>
              <td>{customer.name}</td>
              <td>{customer.address}</td>
              <td>{customer.city}</td>
              <td>{customer.contactNo}</td>
              <td>{customer.category}</td>
              <td>{customer.type}</td>
              <td>
                <a href="#" onClick={() => openModal(customer, "representative")}>
                  {customer.representative.name}
                </a>
              </td>
              <td className="customer-row-button">
                <button className="btn-view" >View History</button>
                <button className="btn-update" onClick={() => openModal(customer, "update")}>Update Vendor</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCustomer && modalType === "update" && (
        <div className="modal-update-customer">
          <div className="modal-content-update-customer">
            <span className="close" onClick={closeModal}>&times;</span>
            <h3>Update Customer</h3>
            <form className="customer-form">
            
            <label>
            Customer Register By:
                <input
                  type="text"
                  name="name"
                  value={selectedCustomer.registerby}
                  onChange={handleCustomerChange}
                />
              </label>
             
              <label>
              Date of Registration:
                <input
                  type="text"
                  name="name"
                  value={selectedCustomer.registrationDate}
                  onChange={handleCustomerChange}
                />
              </label>
              <label>
                Customer Name:
                <input
                  type="text"
                  name="name"
                  value={selectedCustomer.name}
                  onChange={handleCustomerChange}
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={selectedCustomer.address}
                  onChange={handleCustomerChange}
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  name="city"
                  value={selectedCustomer.city}
                  onChange={handleCustomerChange}
                />
              </label>
              <label>
                Contact No:
                <input
                  type="text"
                  name="contactNo"
                  value={selectedCustomer.contactNo}
                  onChange={handleCustomerChange}
                />
              </label>
              <label>
                Category:
                <input
                  type="text"
                  name="contactNo"
                  value={selectedCustomer.category}
                  onChange={handleCustomerChange}
                />
              </label>
              <label>
                Type:
                <input
                  type="text"
                  name="contactNo"
                  value={selectedCustomer.type}
                  onChange={handleCustomerChange}
                />
              </label>
              <button
                type="button"
                className="btn-save"
                onClick={updateCustomer}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {selectedCustomer && modalType === "representative" && (
        <div className="modal-representative">
          <div className="modal-content-representative">
            <span className="close" onClick={closeModal}>&times;</span>
            <h3>Representative Details</h3>
            <form>
              <label>
                Name:
                <input type="text" value={selectedCustomer.representative.name} disabled />
              </label>
              <label>
                Designation:
                <input type="text" value={selectedCustomer.representative.designation} disabled />
              </label>
              <label>
                Email:
                <input type="text" value={selectedCustomer.representative.email} disabled />
              </label>
              <label>
                Office Phone:
                <input type="text" value={selectedCustomer.representative.officePhone} disabled />
              </label>
              <label>
                Personal Phone:
                <input type="text" value={selectedCustomer.representative.personalPhone} disabled />
              </label>
              <label>
                Address:
                <input type="text" value={selectedCustomer.representative.address} disabled />
              </label>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerTable;
