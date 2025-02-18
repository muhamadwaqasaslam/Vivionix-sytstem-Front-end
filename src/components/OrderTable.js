import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderTable.css";

const OrderTable = () => {
  const [Orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [search, setSearch] = useState({
    id: "",
    name: "",
    contact_number: "",
    email: "",
    address: "",
    category_name: "",
    registered_by: "",
    product_list: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          "http://192.168.18.29:8000/customers/customer/list_all/",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
            setOrders(response.data);
        }
      } catch (err) {
        setError("Failed to fetch Order data. Please try again.");
        console.error(err);
      }
    };

    fetchOrder();
  }, []);

  const filteredOrder = Orders.filter((Order) => {
    
    return (
      (search.id === "" || (Order.Customer_id && customer.Customer_id.toString().toLowerCase().includes(search.id.toLowerCase()))) &&
      (search.name === "" || (Order.Companyname && customer.Companyname.toLowerCase().includes(search.name.toLowerCase()))) &&
      (search.email === "" || (Order.Companyemail && customer.Companyemail.toLowerCase().includes(search.email.toLowerCase()))) &&
      (search.contact_number === "" || (Order.Company_phone_number && customer.Company_phone_number.toLowerCase().includes(search.contact_number.toLowerCase()))) &&
      (search.address === "" || (Order.address && customer.address.toLowerCase().includes(search.address.toLowerCase()))) &&
      (search.category_name === "" || (Order.category_name && customer.category_name.toLowerCase().includes(search.category_name.toLowerCase()))) &&
      (search.registered_by === "" || (Order.registered_by && customer.registered_by.toLowerCase().includes(search.registered_by.toLowerCase()))) 
    );
  });

  const handleUpdateClick = (customer) => {
    setSelectedOrder(customer);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setSuccessMessage("");
    setFailureMessage("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestUrl = `http://192.168.18.29:8000/customers/customer/update/${selectedCustomer.Customer_id}`;

      const updatedOrderData = {
        registered_by: selectedOrder.registered_by || null,
        CompanyCategory: selectedOrder.CompanyCategory || "",
        Companyname: selectedOrder.Companyname,
        Companyemail: selectedOrder.Companyemail,
        Company_phone_number: selectedOrder.Company_phone_number,
        address: selectedOrder.address,
      };

      const response = await axios.put(requestUrl, updatedOrderData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setOrders((prevOrders) =>
            prevOrders.map((Order) =>
                Order.Customer_id === selectedOrder.Customer_id
              ? { ...Order, ...updatedOrderData }
              : Order
          )
        );
        setSuccessMessage("Order updated successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
        setIsModalOpen(false);
      } else {
        setFailureMessage("Failed to update Order.");
        setTimeout(() => {
          setFailureMessage("");
        }, 2000);
      }
    } catch (err) {
      console.error(
        "Error during the update:",
        err.response ? err.response.data : err.message
      );
      setFailureMessage("Failed to update Order. Please try again.");
      setTimeout(() => {
        setFailureMessage("");
      }, 2000);
    }
  };

  const handleInputChange = (field, value) => {
    setSelectedOrder({ ...selectedOrder, [field]: value });
  };

  return (
    <div className="Order-table">
      <h2>Order List</h2>

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
                value={search.id}
                onChange={(e) => setSearch({ ...search, id: e.target.value })}
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Search by Company Name"
                value={search.name}
                onChange={(e) => setSearch({ ...search, name: e.target.value })}
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Search by Email"
                value={search.email}
                onChange={(e) =>
                  setSearch({ ...search, email: e.target.value })
                }
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Search by Phone Number"
                value={search.contact_number}
                onChange={(e) =>
                  setSearch({ ...search, contact_number: e.target.value })
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
                value={search.product_list}
                onChange={(e) =>
                  setSearch({ ...search, product_list: e.target.value })
                }
              />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
  {filteredOrder.length > 0 ? (
    filteredOrder.map((Order) => (
      <tr key={Order.Customer_id}>
        <td>{Order.Customer_id}</td>
        <td>{Order.Companyname}</td>
        <td>{Order.Companyemail}</td>
        <td>{Order.Company_phone_number}</td>
        <td>{Order.address}</td>
        <td>{Order.category_name || "N/A"}</td>
        <td>{Order.registered_by}</td>
        <td>
  {Order.products && Order.products.length > 0 ? (
    Order.products.map((product, index) => (
      <div key={index} className="product-item">
        <strong>Product Name:</strong> {product.product_name} <br />
        <strong>Price:</strong> ${product.productprice}
      </div>
    ))
  ) : (
    <span>No products listed</span>
  )}
</td>

        <td>
          <button
            onClick={() => handleUpdateClick(Order)}
            className="update-button"
          >
            Update
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="9">No Order available</td>
    </tr>
  )}
</tbody>

      </table>

      {isModalOpen && selectedCustomer && (
        <div className="Order-modal">
          <div className="Order-modal-content">
            <h3>Update Order</h3>
            <form onSubmit={handleFormSubmit} className="Order-modal-form">
              <div className="form-group">
                <label>Company Category:</label>
                <input
                  type="text"
                  value={selectedOrder.CompanyCategory || ""}
                  onChange={(e) =>
                    handleInputChange("CompanyCategory", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Company Name:</label>
                <input
                  type="text"
                  value={selectedOrder.Companyname}
                  onChange={(e) =>
                    handleInputChange("Companyname", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Company Email:</label>
                <input
                  type="email"
                  value={selectedOrder.Companyemail}
                  onChange={(e) =>
                    handleInputChange("Companyemail", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Company Phone:</label>
                <input
                  type="text"
                  value={selectedOrder.Company_phone_number}
                  onChange={(e) =>
                    handleInputChange("Company_phone_number", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input
                  type="text"
                  value={selectedOrder.address}
                  onChange={(e) =>
                    handleInputChange("address", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Registered By:</label>
                <input
                  type="text"
                  value={selectedOrder.registered_by}
                  onChange={(e) =>
                    handleInputChange("registered_by", e.target.value)
                  }
                />
              </div>
              <button type="submit" className="submit-button">
                Save Changes
              </button>
              <button
                type="button"
                className="close-button"
                onClick={handleModalClose}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
