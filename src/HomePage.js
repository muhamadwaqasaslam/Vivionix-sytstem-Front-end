import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaTachometerAlt,
  FaBox,
  FaCalendarAlt,
  FaHistory,
  FaDollarSign,
  FaEnvelope,
  FaBell,
  FaCog,
  FaUserTie,
  FaCaretDown,
  FaClock,
  FaSync,
  FaUserCircle,
  FaSignOutAlt,
  FaUserPlus,
  FaBuilding,
  FaThLarge,
  FaChevronDown,
  FaChevronRight,
  FaUser,
  FaStore,
  FaList,
  FaRegAddressBook,
  FaShoppingCart,
} from "react-icons/fa";

import "./HomePage.css";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import Schedules from "./components/Schedules";
import History from "./components/History";
import Sales from "./components/Sales";
import Messages from "./components/Messages";
import Notifications from "./components/Notifications";
import Pending from "./components/Pending";
import Outstanding from "./components/Outstanding";
import Completed from "./components/Completed";
import AddUser from "./components/AddUser";
import CompanyRegistration from "./components/CompanyRegistration";
import Settings from "./components/Settings";
import ToDoList from "./components/todolist";
import EmployeeRegistration from "./components/EmployeeRegistration";
import EmployeeTable from "./components/EmployeeTable";
import VendorRegistration from "./components/VendorRegistration";
import VendorList from "./components/VendorList";
import RepresentativeForm from "./components/RepresentativeForm";
import RepresentativeTable from "./components/RepresentativeTable";
import CustomerRepresentativeForm from "./components/CustomerRepresentative";
import CustomerContactForm from "./components/CustomerRegistration";
import CustomerTable from "./components/CustomerTable";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductList";
import logo from "./logo.png";
import DepartmentForm from "./components/DepartmentRegistration";
import DepartmentTable from "./components/DepartmentTable";
import RoleForm from "./components/RoleRegistration";
import RoleTable from "./components/RoleTable";
import OrderForm from "./components/OrderRegistration";
import OrderDetailForm from "./components/OrderdetailsRegistration";
import CustomerCategoryForm from "./components/CategoryRegistration";
import CustomerCategoryTable from "./components/CategoryTable";

const HomePage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown((prevDropdown) =>
      prevDropdown === dropdown ? null : dropdown
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString();

  const toggleUserDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const renderContent = () => {
    switch (selectedItem) {
      case "Dashboard":
        return <Dashboard />;
      case "Analytics":
        return <Analytics />;
      case "Schedules":
        return <Schedules />;
      case "History":
        return <History />;
      case "Sales":
        return <Sales />;
      case "Messages":
        return <Messages />;
      case "Notifications":
        return <Notifications />;
      case "Department Registration":
        return <DepartmentForm />;
      case "Department Table":
        return <DepartmentTable />;
      case "Role Registration":
        return <RoleForm />;
      case "Role Table":
        return <RoleTable />;
      case "Employee Registration":
        return <EmployeeRegistration />;
      case "Employee Table":
        return <EmployeeTable />;
      case "CustomerCategory Form":
        return <CustomerCategoryForm />;
      case "Customer Category Table":
        return <CustomerCategoryTable />;
      case "vendor Registration":
        return <VendorRegistration />;
      case "Vendor List":
        return <VendorList />;
      case "Vendor Representative Form":
        return <RepresentativeForm />;
      case "Vendor Representative List":
        return <RepresentativeTable />;
      case "Customer Representative Form":
        return <CustomerRepresentativeForm />;
      case "Customer Contact Form":
        return <CustomerContactForm />;
      case "Customer Table":
        return <CustomerTable />;
      case "Product Form":
        return <ProductForm />;
      case "Product List":
        return <ProductTable />;
      case "order Registration":
        return <OrderForm />;
      case "Order Details Registration":
        return <OrderDetailForm />;
      case "Pending":
        return <Pending />;
      case "Outstanding":
        return <Outstanding />;
      case "Completed":
        return <Completed />;
      case "Add User":
        return <AddUser />;
      case "Company Registration":
        return <CompanyRegistration />;
      case "Settings":
        return <Settings />;
      case "Home":
        return <Home />;
      default:
        return <ToDoList />;
    }
  };

  return (
    <div className="homepage-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="logo" />
          <h2>Vivionix</h2>
        </div>
        <div className="sidebar-item" onClick={() => setSelectedItem("Home")}>
          <FaHome /> <span>Home</span>
        </div>
        <div
          className="sidebar-item"
          onClick={() => setSelectedItem("Dashboard")}
        >
          <FaTachometerAlt /> <span>Dashboard</span>
        </div>

        {/* Employee Dropdown */}
        <div
          className="sidebar-item"
          onClick={() => toggleDropdown("Employee")}
        >
          {/* Conditionally render the Chevron icon based on the dropdown state */}
          <FaUser /> <span>Employee</span>
          <span style={{ marginLeft: "30px" }}></span>
          {activeDropdown === "Employee" ? (
            <FaChevronDown />
          ) : (
            <FaChevronRight />
          )}
        </div>
        {activeDropdown === "Employee" && (
          <div className="sidebar-submenu">
            <div
              className="sidebar-subitem"
              onClick={() => setSelectedItem("Employee Registration")}
            >
              <FaUserPlus /> <span>Employee Registration</span>
            </div>
            <div
              className="sidebar-subitem"
              onClick={() => setSelectedItem("Employee Table")}
            >
              <FaList /> <span>Employees List</span>
            </div>
          </div>
        )}

<div
          className="sidebar-item"
          onClick={() => toggleDropdown("category")}
        >
          <FaThLarge /> <span>Category</span>
          <span style={{ marginLeft: "45px" }}>
            {activeDropdown === "category" ? (
              <FaChevronDown />
            ) : (
              <FaChevronRight />
            )}
          </span>
        </div>

        {activeDropdown === "category" && (
          <div className="sidebar-submenu">
            <div
              className="dropdown-item"
              onClick={() => setSelectedItem("CustomerCategory Form")}
            >
              <FaUserPlus style={{ marginRight: "8px" }} />
              Category Registration
            </div>
            <div
              className="dropdown-item"
              onClick={() => setSelectedItem("Customer Category Table")}
            >
              <FaList style={{ marginRight: "8px" }} />
              Category List
            </div>
          </div>
        )}




        {/* Department Dropdown */}

        <div
          className="sidebar-item"
          onClick={() => toggleDropdown("Department")}
        >
          <FaBuilding /> <span>Department</span>
          <span style={{ marginLeft: "18px" }}></span>
          {activeDropdown === "Department" ? (
            <FaChevronDown />
          ) : (
            <FaChevronRight />
          )}
        </div>
        {activeDropdown === "Department" && (
          <div className="sidebar-submenu">
            <div
              className="sidebar-subitem"
              onClick={() => setSelectedItem("Department Registration")}
            >
              <FaUserPlus /> <span>Department Registration</span>
            </div>
            <div
              className="sidebar-subitem"
              onClick={() => setSelectedItem("Department Table")}
            >
              <FaList /> <span>Department Table</span>
            </div>
          </div>
        )}

        {/* Role Dropdown */}

        <div
          className="sidebar-item"
          onClick={() => toggleDropdown("Role")}
        >
          <FaUserTie /> <span>Role</span>
          <span style={{ marginLeft: "18px" }}></span>
          {activeDropdown === "Role" ? (
            <FaChevronDown />
          ) : (
            <FaChevronRight />
          )}
        </div>
        {activeDropdown === "Role" && (
          <div className="sidebar-submenu">
            <div
              className="sidebar-subitem"
              onClick={() => setSelectedItem("Role Registration")}
            >
              <FaUserPlus /> <span>Role Registration</span>
            </div>
            <div
              className="sidebar-subitem"
              onClick={() => setSelectedItem("Role Table")}
            >
              <FaList /> <span>Role Table</span>
            </div>
          </div>
        )}

        {/* Other Sidebar Items */}
        <div
          className="sidebar-item"
          onClick={() => setSelectedItem("Schedules")}
        >
          <FaCalendarAlt /> <span>Schedules</span>
        </div>

        <div className="sidebar-item" onClick={() => toggleDropdown("Vendor")}>
          <FaStore /> <span>Vendor</span>
          <span style={{ marginLeft: "45px" }}>
            {activeDropdown === "Vendor" ? (
              <FaChevronDown />
            ) : (
              <FaChevronRight />
            )}
          </span>
        </div>

        {/* Vendor Dropdown Menu */}
        {activeDropdown === "Vendor" && (
          <div className="vendor-dropdown">
            <div
              className="dropdown-item"
              onClick={() => setSelectedItem("vendor Registration")}
            >
              <FaUserPlus style={{ marginRight: "8px" }} />
              Vendor Registration
            </div>
            <div
              className="dropdown-item"
              onClick={() => setSelectedItem("Vendor List")}
            >
              <FaList style={{ marginRight: "8px" }} />
              Vendor List
            </div>
          </div>
        )}
        <div
          className="sidebar-item"
          onClick={() => toggleDropdown("representative")}
        >
          <FaStore /> <span>Representative</span>
          <span style={{ marginLeft: "45px" }}>
            {activeDropdown === "representative" ? (
              <FaChevronDown />
            ) : (
              <FaChevronRight />
            )}
          </span>
        </div>

        {activeDropdown === "representative" && (
          <div className="vendor-dropdown">
            <div
              className="dropdown-item"
              onClick={() => setSelectedItem("Vendor Representative Form")}
            >
              <FaUserPlus style={{ marginRight: "8px" }} />
              Vendor Representative Registration
            </div>
            <div
              className="dropdown-item"
              onClick={() => setSelectedItem("Vendor Representative List")}
            >
              <FaList style={{ marginRight: "8px" }} />
              Vendor Representative List
            </div>
            <div
              className="dropdown-item"
              onClick={() => setSelectedItem("Customer Representative Form")}
            >
              <FaUserPlus style={{ marginRight: "8px" }} />
              Customer Representative Registration
            </div>
          </div>
        )}

        <div
          className="sidebar-item"
          onClick={() => toggleDropdown("customer")}
        >
          <FaUser /> <span>Customer</span>
          <span style={{ marginLeft: "45px" }}>
            {activeDropdown === "customer" ? (
              <FaChevronDown />
            ) : (
              <FaChevronRight />
            )}
          </span>
        </div>

        {activeDropdown === "customer" && (
          <div className="customer-dropdown">
            <div
              className="dropdown-item"
              onClick={() => setSelectedItem("Customer Contact Form")}
            >
              <FaRegAddressBook style={{ marginRight: "8px" }} />
              Customer Registration
            </div>
            <div
              className="dropdown-item"
              onClick={() => setSelectedItem("Customer Table")}
            >
              <FaList style={{ marginRight: "8px" }} />
              Customer List
            </div>
          </div>
        )}

        <div className="sidebar-item" onClick={() => toggleDropdown("product")}>
          <FaBox /> <span>Product</span>
          <span style={{ marginLeft: "45px" }}>
            {activeDropdown === "product" ? (
              <FaChevronDown />
            ) : (
              <FaChevronRight />
            )}
          </span>
        </div>

        {/* Vendor Dropdown Menu */}
        {activeDropdown === "product" && (
          <div className="vendor-dropdown">
            <div
              className="dropdown-item"
              onClick={() => setSelectedItem("Product Form")}
            >
              <FaUserPlus style={{ marginRight: "8px" }} />
              Product Registration
            </div>
            <div
              className="dropdown-item"
              onClick={() => setSelectedItem("Product List")}
            >
              <FaList style={{ marginRight: "8px" }} />
              Product List
            </div>
          </div>
        )}

        <div
          className="sidebar-item"
          onClick={() => setSelectedItem("History")}
        >
          <FaHistory /> <span>History</span>
        </div>
        <div className="sidebar-item" onClick={() => setSelectedItem("Sales")}>
          <FaDollarSign /> <span>Sales</span>
        </div>
        <div
          className="sidebar-item"
          onClick={() => setSelectedItem("Messages")}
        >
          <FaEnvelope /> <span>Messages</span>
        </div>
        <div
          className="sidebar-item"
          onClick={() => setSelectedItem("Notifications")}
        >
          <FaBell /> <span>Notifications</span>
        </div>
        <div className="sidebar-item" onClick={() => toggleDropdown("Form")}>
          {/* Form icon, label, and chevron */}
          <FaShoppingCart /> {/* Space between icon and text */}
          <span>Order</span>
          <span style={{ marginLeft: "60px" }}>
            {activeDropdown === "Form" ? <FaChevronDown /> : <FaChevronRight />}
          </span>
        </div>
        {activeDropdown === "Form" && (
          <div className="sidebar-submenu">
            <div
              className="sidebar-subitem"
              onClick={() => setSelectedItem("order Registration")}
            >
              <FaUserPlus />{" "}
              <span className="light-text">Order Registration</span>
            </div>
            <div
              className="sidebar-subitem"
              onClick={() => setSelectedItem("Order Details Registration")}
            >
              <FaUserPlus />{" "}
              <span className="light-text">Order Detail Registration</span>
            </div>
            <div
              className="sidebar-subitem"
              onClick={() => setSelectedItem("Pending")}
            >
              <FaList /> <span className="light-text">Order List</span>
            </div>
          </div>
        )}
        <div
          className="sidebar-item"
          onClick={() => setSelectedItem("Settings")}
        >
          <FaCog /> <span>Settings</span>
        </div>
      </div>

      <div className="main-content">
        <nav className="navbar">
          <div className="navbar-left">
            <div className="timezone">
              <FaClock />{" "}
              <span>
                {formattedDate} {formattedTime}
              </span>
            </div>
            <div
              className="refresh-icon"
              onClick={() => window.location.reload()}
            >
              <FaSync />
            </div>
          </div>
          <div className="navbar-right">
            <div className="navbar-item" onClick={() => {}}>
              Pricing
            </div>
            <div className="navbar-item" onClick={() => {}}>
              Support
            </div>
            <div className="navbar-item" onClick={() => {}}>
              Services
            </div>
            <div className="session-details" onClick={toggleUserDropdown}>
              <FaUserCircle size={24} />
              <FaCaretDown />
            </div>
          </div>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <div
                className="dropdown-item"
                onClick={() => setSelectedItem("Account Settings")}
              >
                Account Settings
              </div>
              <div
                className="dropdown-item"
                onClick={() => setSelectedItem("My Orders")}
              >
                My Orders
              </div>
              <div className="dropdown-separator"></div>
              <div className="dropdown-item">Public snippets</div>
              <div className="dropdown-item">Private snippets</div>
              <div className="dropdown-separator"></div>
              <div className="dropdown-item">
                <FaSignOutAlt /> Sign Out
              </div>
            </div>
          )}
        </nav>
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default HomePage;
