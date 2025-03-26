import React, { useState } from "react";
import "./OrderDetailTable.css";

const SavedOrder = () => {
  const [orders, setOrders] = useState([
    {
      orderNo: "ORD001",
      orderDate: "2024-03-15",
      orderAttachment: "invoice_001.pdf",
      customerName: "John Doe",
      orderDeliveryDate: "2024-03-20",
      instructions: "Handle with care",
      status: "Saved",
      orderProducts: {
        srNo: 1,
        productCode: "P123",
        productName: "Test Kit A",
        productRef: "REF001",
        brandName: "BrandX",
        packSize: "10 Tests",
        unitPerPack: 10,
        packPrice: 50,
        orderQuantity: 2,
        gst: 5,
        totalPrice: 105,
      },
    },
    {
      orderNo: "ORD002",
      orderDate: "2024-03-16",
      orderAttachment: "invoice_002.pdf",
      customerName: "Jane Smith",
      orderDeliveryDate: "2024-03-21",
      instructions: "Fragile",
      status: "Pending",
      orderProducts: {
        srNo: 2,
        productCode: "P124",
        productName: "Test Kit B",
        productRef: "REF002",
        brandName: "BrandY",
        packSize: "5 Tests",
        unitPerPack: 5,
        packPrice: 30,
        orderQuantity: 3,
        gst: 5,
        totalPrice: 94.5,
      },
    },
    {
      orderNo: "ORD003",
      orderDate: "2024-03-17",
      orderAttachment: "invoice_003.pdf",
      customerName: "Robert Brown",
      orderDeliveryDate: "2024-03-22",
      instructions: "Standard Delivery",
      status: "Approval",
      orderProducts: {
        srNo: 3,
        productCode: "P125",
        productName: "Test Kit C",
        productRef: "REF003",
        brandName: "BrandZ",
        packSize: "20 Tests",
        unitPerPack: 20,
        packPrice: 100,
        orderQuantity: 1,
        gst: 5,
        totalPrice: 105,
      },
    }
  ]);

  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalType, setModalType] = useState(null);

  const [filteredStatus, setFilteredStatus] = useState("All");

  const filteredButtonOrders = orders.filter((order) => 
    filteredStatus === "All" || order.status === filteredStatus
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  
  const filteredOrders = filteredButtonOrders.filter((order) => 
    order.customerName.toLowerCase().includes(search.toLowerCase()) ||
    order.orderNo.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (order, type) => {
    setSelectedOrder({ ...order });
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalType(null);
  };

  return (
    <div className="ordersaved-container">
      <div className="ordersaved-header">
      <h2 className="ordersaved-title">Registered Order List</h2>
      <div className="ordersaved-buttons">
          <button className="filter-button" onClick={() => setFilteredStatus("All")}>All</button>
          <button className="filter-button" onClick={() => setFilteredStatus("Saved")}>Saved</button>
          <button className="filter-button" onClick={() => setFilteredStatus("Pending")}>Pending</button>
          <button className="filter-button"onClick={() => setFilteredStatus("approval")} >Approval</button>
        </div>
        </div>

      <table className="ordersaved-table">
        <thead>
          <tr>
            <th>Order No:</th>
            <th>Order Date:</th>
            <th>Order Attachment:</th>
            <th>Customer Name:</th>
            <th>Order Delivery Date:</th>
            <th>Instructions (if any):</th>
            <th>Products</th>
            <th>Status</th>
          </tr>

          <tr>
            {["orderNo", "orderDate", "orderAttachment", "customerName", "orderDeliveryDate", "instructions", "orderProducts"].map((key) => (
              <th key={key}>
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => handleSearchChange(e, key)}
                />
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={index}>
              <td>{order.orderNo}</td>
              <td>{order.orderDate}</td>
              <td>
                <a
                  href={order.orderAttachment}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Attachment
                </a>
              </td>
              <td>{order.customerName}</td>
              <td>{order.orderDeliveryDate}</td>
              <td>{order.instructions}</td>
              <td>
                <a href="#" onClick={() => openModal(order, "Product")}> 
                  {order.orderProducts.productName}
                </a>
              </td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedOrder && modalType === "Product" && (
        <div className="modal-order">
          <div className="modal-content-order">
            <span className="close" onClick={closeModal}>&times;</span>
            <h3>Product Details</h3>
            <form className="modal-order-form">
              <label>Product Code: <input type="text" className="model-order-input" value={selectedOrder.orderProducts.productCode} disabled /></label>
              <label>Product Name: <input type="text" className="model-order-input"  value={selectedOrder.orderProducts.productName} disabled /></label>
              <label>Product Ref #: <input type="text" className="model-order-input"  value={selectedOrder.orderProducts.productRef} disabled /></label>
              <label>Brand Name: <input type="text" className="model-order-input"  value={selectedOrder.orderProducts.brandName} disabled /></label>
              <label>Pack Size: <input type="text" className="model-order-input"  value={selectedOrder.orderProducts.packSize} disabled /></label>
              <label>Unit/Tests Per Pack: <input type="text" className="model-order-input"  value={selectedOrder.orderProducts.unitPerPack} disabled /></label>
              <label>Pack Price: <input type="text" className="model-order-input"  value={selectedOrder.orderProducts.packPrice} disabled /></label>
              <label>Order Quantity: <input type="text" className="model-order-input"  value={selectedOrder.orderProducts.orderQuantity} disabled /></label>
              <label>GST %: <input type="text" className="model-order-input"  value={selectedOrder.orderProducts.gst} disabled /></label>
              <label>Total Price: <input type="text" className="model-order-input"  value={selectedOrder.orderProducts.totalPrice} disabled /></label>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedOrder;
