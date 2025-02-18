import React, { useState, useEffect } from "react";
import "./ProductTable.css";
import axios from "axios";
import { BASE_URL } from "../config";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [searchQueries, setSearchQueries] = useState({
    product_id: "",
    product_name: "",
    reference_number: "",
    packsize: "",
    packprice: "",
    price_date: "",
    vendor_name: "",
    is_available: "",
    remarks: "",
    registered_by: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}products/list_all/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
          setProducts(response.data);
        }
      } catch (err) {
        setError("Failed to fetch product data. Please try again.");
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    return Object.keys(searchQueries).every((key) => {
      const query = searchQueries[key].toLowerCase();
      const productValue = product[key]
        ? product[key].toString().toLowerCase()
        : "";
      return productValue.includes(query);
    });
  });

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setSuccessMessage("");
    setFailureMessage("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestUrl = `${BASE_URL}products/update/${selectedProduct.product_id}/`;

      const updatedProductData = {
        ...selectedProduct,
      };

      const response = await axios.put(requestUrl, updatedProductData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.product_id === selectedProduct.product_id
              ? { ...product, ...updatedProductData }
              : product
          )
        );
        setSuccessMessage("Product updated successfully!");
        setIsModalOpen(false);
      } else {
        setFailureMessage("Failed to update product.");
      }
    } catch (err) {
      console.error("Error during the update:", err);
      setFailureMessage("Failed to update product. Please try again.");
    }
  };

  const handleInputChange = (field, value) => {
    setSelectedProduct({ ...selectedProduct, [field]: value });
  };

  const handleSearchChange = (e, key) => {
    setSearchQueries({
      ...searchQueries,
      [key]: e.target.value,
    });
  };

  return (
    <div className="product-table">
      <h2>Product List</h2>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {failureMessage && <div className="failure-message">{failureMessage}</div>}

      <table>
        <thead>
          <tr>
            {[
              "ID",
              "Name",
              "Reference",
              "Pack Size",
              "Pack Price",
              "Date",
              "Vendor",
              "Available",
              "Remarks",
              "Registered By",
              "Action",
            ].map((header) => (
              <th key={header}>{header}</th>
            ))}
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.product_id}>
              <td>{product.product_id}</td>
              <td>{product.product_name}</td>
              <td>{product.reference_number}</td>
              <td>{product.packsize}</td>
              <td>{product.packprice}</td>
              <td>{product.price_date}</td>
              <td>{product.vendor_name}</td>
              <td>{product.is_available ? "Yes" : "No"}</td>
              <td>{product.remarks}</td>
              <td>{product.registered_by}</td>
              <td>
                <button
                  onClick={() => handleUpdateClick(product)}
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
        <div className="product-modal">
          <div className="product-modal-content">
            <h3>Update Product</h3>
            <form onSubmit={handleFormSubmit}>
  <div className="form-group">
    <label>Product Name</label>
    <input
      type="text"
      value={selectedProduct.product_name || ""}
      onChange={(e) => handleInputChange("product_name", e.target.value)}
    />
  </div>
  <div className="form-group">
    <label>Reference Number</label>
    <input
      type="text"
      value={selectedProduct.reference_number || ""}
      onChange={(e) => handleInputChange("reference_number", e.target.value)}
    />
  </div>
  <div className="form-group">
    <label>Pack Size</label>
    <input
      type="text"
      value={selectedProduct.packsize || ""}
      onChange={(e) => handleInputChange("packsize", e.target.value)}
    />
  </div>
  <div className="form-group">
    <label>Pack Price</label>
    <input
      type="text"
      value={selectedProduct.packprice || ""}
      onChange={(e) => handleInputChange("packprice", e.target.value)}
    />
  </div>
  <div className="form-group">
    <label>Price Date</label>
    <input
      type="date"
      value={selectedProduct.price_date || ""}
      onChange={(e) => handleInputChange("price_date", e.target.value)}
    />
  </div>
  <div className="form-group">
    <label>Vendor Name</label>
    <input
      type="text"
      value={selectedProduct.vendor_name || ""}
      onChange={(e) => handleInputChange("vendor_name", e.target.value)}
    />
  </div>
  <div className="form-group">
    <label>Availability</label>
    <select
      value={selectedProduct.is_available ? "Yes" : "No"}
      onChange={(e) =>
        handleInputChange("is_available", e.target.value === "Yes")
      }
    >
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  </div>
  <div className="form-group">
    <label>Remarks</label>
    <textarea
      value={selectedProduct.remarks || ""}
      onChange={(e) => handleInputChange("remarks", e.target.value)}
    />
  </div>
  <div className="form-group">
    <label>Registered By</label>
    <input
      type="text"
      value={selectedProduct.registered_by || ""}
      onChange={(e) => handleInputChange("registered_by", e.target.value)}
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

export default ProductTable;
