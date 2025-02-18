import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerTable.css";
import { BASE_URL } from "../config";

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [search, setSearch] = useState({
    Customer_id: "",
    Companyname: "",
    Companyemail: "",
    Company_phone_number: "",
    address: "",
    category_name: "",
    registered_by: "",
    products: "",
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}customers/customer/list_all/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
          setCustomers(response.data);
        }
      } catch (err) {
        setError("Failed to fetch customer data. Please try again.");
        console.error(err);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    return (
      (search.Customer_id === "" ||
        (customer.Customer_id &&
          customer.Customer_id.toString().toLowerCase().includes(search.Customer_id.toLowerCase()))) &&
      (search.Companyname === "" ||
        (customer.Companyname &&
          customer.Companyname.toLowerCase().includes(search.Companyname.toLowerCase()))) &&
      (search.Companyemail === "" ||
        (customer.Companyemail &&
          customer.Companyemail.toLowerCase().includes(search.Companyemail.toLowerCase()))) &&
      (search.Company_phone_number === "" ||
        (customer.Company_phone_number &&
          customer.Company_phone_number.toString().toLowerCase().includes(search.Company_phone_number.toLowerCase()))) &&
      (search.address === "" ||
        (customer.address &&
          customer.address.toLowerCase().includes(search.address.toLowerCase()))) &&
      (search.category_name === "" ||
        (customer.category_name &&
          customer.category_name.toLowerCase().includes(search.category_name.toLowerCase()))) &&
      (search.registered_by === "" ||
        (customer.registered_by &&
          customer.registered_by.toLowerCase().includes(search.registered_by.toLowerCase())))
    );
  });
  
  const handleUpdateClick = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
    setSuccessMessage("");
    setFailureMessage("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestUrl = `${BASE_URL}customers/customer/update/${selectedCustomer.Customer_id}`;

      const updatedCustomerData = {
        registered_by: selectedCustomer.registered_by || null,
        Companyname: selectedCustomer.Companyname,
        Companyemail: selectedCustomer.Companyemail,
        Company_phone_number: selectedCustomer.Company_phone_number,
        address: selectedCustomer.address,
        category_name: selectedCustomer.category_name || "",
      };

      const response = await axios.put(requestUrl, updatedCustomerData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.Customer_id === selectedCustomer.Customer_id
              ? { ...customer, ...updatedCustomerData }
              : customer
          )
        );
        setSuccessMessage("Customer updated successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
        setIsModalOpen(false);
      } else {
        setFailureMessage("Failed to update customer.");
        setTimeout(() => {
          setFailureMessage("");
        }, 2000);
      }
    } catch (err) {
      console.error(
        "Error during the update:",
        err.response ? err.response.data : err.message
      );
      setFailureMessage("Failed to update customer. Please try again.");
      setTimeout(() => {
        setFailureMessage("");
      }, 2000);
    }
  };

  const handleInputChange = (field, value) => {
    setSelectedCustomer({ ...selectedCustomer, [field]: value });
  };

  return (
    <div className="customer-table">
      <h2>Customer List</h2>

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
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>Customer Phone Number</th>
            <th>Address</th>
            <th>Category</th>
            <th>Registered By</th>
            <th>Product List</th>
            <th>Action</th>
          </tr>
          <tr>
            <th>
              <input
                type="text"
                placeholder="Search by ID"
                value={search.Customer_id}
                onChange={(e) => setSearch({ ...search, Customer_id: e.target.value })}
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Search by Company Name"
                value={search.Companyname}
                onChange={(e) => setSearch({ ...search, Companyname: e.target.value })}
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Search by Email"
                value={search.Companyemail}
                onChange={(e) =>
                  setSearch({ ...search, Companyemail: e.target.value })
                }
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Search by Phone Number"
                value={search.Company_phone_number}
                onChange={(e) =>
                  setSearch({ ...search, Company_phone_number: e.target.value })
                }
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Search by Address"
                value={search.address}
                onChange={(e) =>
                  setSearch({ ...search, address: e.target.value })
                }
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Search by Category"
                value={search.category_name}
                onChange={(e) =>
                  setSearch({ ...search, category_name: e.target.value })
                }
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Search by Registered By"
                value={search.registered_by}
                onChange={(e) =>
                  setSearch({ ...search, registered_by: e.target.value })
                }
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Search by Product Name"
                value={search.products}
                onChange={(e) =>
                  setSearch({ ...search, products: e.target.value })
                }
              />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <tr key={customer.Customer_id}>
                <td>{customer.Customer_id}</td>
                <td>{customer.Companyname}</td>
                <td>{customer.Companyemail}</td>
                <td>{customer.Company_phone_number}</td>
                <td>{customer.address}</td>
                <td>{customer.category_name || "N/A"}</td>
                <td>{customer.registered_by}</td>
                <td>
                  {customer.products && customer.products.length > 0 ? (
                    customer.products.map((product, index) => (
                      <div key={index} className="product-item">
                        <strong>Product Name:</strong> {product.product_name}{" "}
                        <br />
                        <strong>Price:</strong> ${product.productprice}
                      </div>
                    ))
                  ) : (
                    <span>No products listed</span>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => handleUpdateClick(customer)}
                    className="update-button"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No customers available</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && selectedCustomer && (
        <div className="customer-modal">
          <div className="customer-modal-content">
            <h3>Update Customer</h3>
            <hr />
            <form onSubmit={handleFormSubmit} className="customer-modal-form">
              <div className="form-group">
                <label>Customer Name:</label>
                <input
                  type="text"
                  value={selectedCustomer.Companyname}
                  onChange={(e) =>
                    handleInputChange("Companyname", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Customer Email:</label>
                <input
                  type="email"
                  value={selectedCustomer.Companyemail}
                  onChange={(e) =>
                    handleInputChange("Companyemail", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Customer Phone:</label>
                <input
                  type="text"
                  value={selectedCustomer.Company_phone_number}
                  onChange={(e) =>
                    handleInputChange("Company_phone_number", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input
                  type="text"
                  value={selectedCustomer.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Category :</label>
                <input
                  type="text"
                  value={selectedCustomer.category_name}
                  onChange={(e) => handleInputChange("category_name", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Registered By:</label>
                <input
                  type="text"
                  value={selectedCustomer.registered_by}
                  onChange={(e) =>
                    handleInputChange("registered_by", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Products :</label>
                <textarea
                  value={
                    selectedCustomer.products
                      ? selectedCustomer.products
                          .map(
                            (product) =>
                              `${product.product_name} - $${product.productprice}`
                          )
                          .join("\n")
                      : "No products listed"
                  }
                  readOnly
                />
              </div>
              <div className="customer-modal-buttons">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="customer-cancel-button"
                >
                  Cancel
                </button>
                <button type="submit" className="customer-save-button">
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

export default CustomerTable;
