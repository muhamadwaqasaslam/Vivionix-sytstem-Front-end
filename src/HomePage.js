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
  FaUserCircle,
  FaSignOutAlt,
  FaBuilding,
  FaThLarge,
  FaChevronDown,
  FaChevronRight,
  FaUser,
  FaStore,
  FaShoppingCart,
} from "react-icons/fa";

import { AlignLeft, Search } from "lucide-react";

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

  const toggleUserDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);


  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarVisible((prev) => !prev);
    } else {
      setIsSidebarCollapsed((prev) => !prev);
    }
  };
  
  

  const handleMouseEnter = () => {
    setIsSidebarCollapsed(false);
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

  const [searchValue, setSearchValue] = useState("");

  return (
    <div
  className={`homepage-container ${isSidebarCollapsed ? "collapsed" : ""} ${
    isSidebarVisible ? "sidebar-open" : ""
  }`}
>
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""} ${isSidebarVisible ? "show" : ""}`} onMouseEnter={handleMouseEnter}>
        <div className="sidebar-header">
          <a href="/home">
            {" "}
            <img src={logo} alt="Logo" className="logo" />
            {!isSidebarCollapsed && <h2>Vivionix</h2>}
          </a>
        </div>
        <div className="sidebar-content">
        {!isSidebarCollapsed &&  <h4 className="main-items">MAIN</h4>}
          <div className="sidebar-item" onClick={() => setSelectedItem("Home")}>
            <FaHome size={14} />{" "}
            {!isSidebarCollapsed && <span className="items">Home</span>}
          </div>
          <div
            className="sidebar-item"
            onClick={() => setSelectedItem("Dashboard")}
          >
            <FaTachometerAlt size={14} />{" "}
            {!isSidebarCollapsed && <span className="items">Dashboard</span>}
          </div>

          {!isSidebarCollapsed &&  <h4 className="main-items">GENERAL</h4>}

          {/* Employee Dropdown */}
          <div
            className="sidebar-item"
            onClick={() => toggleDropdown("Employee")}
          >
            {/* Conditionally render the Chevron icon based on the dropdown state */}
            <FaUser size={14} />
            {!isSidebarCollapsed && <span className="items">Employee</span>}
            {!isSidebarCollapsed && (
              <span style={{ marginLeft: "50px" }}>
                {activeDropdown === "Employee" ? (
                  <FaChevronDown className="dropdown-icon" />
                ) : (
                  <FaChevronRight className="dropdown-icon" />
                )}
              </span>
            )}
          </div>
          {activeDropdown === "Employee" && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => setSelectedItem("Employee Registration")}
              >
                Employee Registration
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => setSelectedItem("Employee Table")}
              >
                Employees List
              </div>
            </div>
          )}

          {/* Category Dropdown */}
          <div
            className="sidebar-item"
            onClick={() => toggleDropdown("category")}
          >
            <FaThLarge className="icon" />{" "}
            {!isSidebarCollapsed && (
              <>
                <span className="items">Category</span>
                <span style={{ marginLeft: "55px" }}>
                  {activeDropdown === "category" ? (
                    <FaChevronDown className="dropdown-icon" />
                  ) : (
                    <FaChevronRight className="dropdown-icon" />
                  )}
                </span>
              </>
            )}
          </div>

          {activeDropdown === "category" && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => setSelectedItem("CustomerCategory Form")}
              >
                Category Registration
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => setSelectedItem("Customer Category Table")}
              >
                Category List
              </div>
            </div>
          )}

          {/* Department Dropdown */}
          <div
            className="sidebar-item"
            onClick={() => toggleDropdown("Department")}
          >
            <FaBuilding size={14} />
            {!isSidebarCollapsed && <span className="items">Department</span>}
            {!isSidebarCollapsed && (
              <span style={{ marginLeft: "45px" }}>
                {activeDropdown === "Department" ? (
                  <FaChevronDown className="dropdown-icon" />
                ) : (
                  <FaChevronRight className="dropdown-icon" />
                )}
              </span>
            )}
          </div>
          {!isSidebarCollapsed && activeDropdown === "Department" && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => setSelectedItem("Department Registration")}
              >
                Department Registration
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => setSelectedItem("Department Table")}
              >
                Department Table
              </div>
            </div>
          )}

          {/* Role Dropdown */}
          <div className="sidebar-item" onClick={() => toggleDropdown("Role")}>
            <FaUserTie size={14} />
            {!isSidebarCollapsed && <span className="items">Role</span>}
            {!isSidebarCollapsed && (
              <span style={{ marginLeft: "85px" }}>
                {activeDropdown === "Role" ? (
                  <FaChevronDown className="dropdown-icon" />
                ) : (
                  <FaChevronRight className="dropdown-icon" />
                )}
              </span>
            )}
          </div>
          {!isSidebarCollapsed && activeDropdown === "Role" && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => setSelectedItem("Role Registration")}
              >
                Role Registration
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => setSelectedItem("Role Table")}
              >
                Role Table
              </div>
            </div>
          )}

          {/* Other Sidebar Items */}
          <div
            className="sidebar-item"
            onClick={() => setSelectedItem("Schedules")}
          >
            <FaCalendarAlt size={14} />
            {!isSidebarCollapsed && <span className="items">Schedules</span>}
          </div>

          {/* Vendor Dropdown */}
          <div
            className="sidebar-item"
            onClick={() => toggleDropdown("Vendor")}
          >
            <FaStore size={14} />
            {!isSidebarCollapsed && <span className="items">Vendor</span>}
            {!isSidebarCollapsed && (
              <span style={{ marginLeft: "70px" }}>
                {activeDropdown === "Vendor" ? (
                  <FaChevronDown className="dropdown-icon" />
                ) : (
                  <FaChevronRight className="dropdown-icon" />
                )}
              </span>
            )}
          </div>
          {!isSidebarCollapsed && activeDropdown === "Vendor" && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => setSelectedItem("vendor Registration")}
              >
                Vendor Registration
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => setSelectedItem("Vendor List")}
              >
                Vendor List
              </div>
            </div>
          )}

          {/* Representative Dropdown */}
          <div
            className="sidebar-item"
            onClick={() => toggleDropdown("Representative")}
          >
            <FaStore size={14} />
            {!isSidebarCollapsed && (
              <span className="items">Representative</span>
            )}
            {!isSidebarCollapsed && (
              <span style={{ marginLeft: "20px" }}>
                {activeDropdown === "Representative" ? (
                  <FaChevronDown className="dropdown-icon" />
                ) : (
                  <FaChevronRight className="dropdown-icon" />
                )}
              </span>
            )}
          </div>
          {!isSidebarCollapsed && activeDropdown === "Representative" && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => setSelectedItem("Vendor Representative Form")}
              >
                Vendor Representative Registration
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => setSelectedItem("Vendor Representative List")}
              >
                Vendor Representative List
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => setSelectedItem("Customer Representative Form")}
              >
                Customer Representative Registration
              </div>
            </div>
          )}

          {/* Customer Dropdown */}
          <div
            className="sidebar-item"
            onClick={() => toggleDropdown("Customer")}
          >
            <FaUser size={14} />
            {!isSidebarCollapsed && <span className="items">Customer</span>}
            {!isSidebarCollapsed && (
              <span style={{ marginLeft: "52px" }}>
                {activeDropdown === "Customer" ? (
                  <FaChevronDown className="dropdown-icon" />
                ) : (
                  <FaChevronRight className="dropdown-icon" />
                )}
              </span>
            )}
          </div>
          {!isSidebarCollapsed && activeDropdown === "Customer" && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => setSelectedItem("Customer Contact Form")}
              >
                Customer Registration
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => setSelectedItem("Customer Table")}
              >
                Customer List
              </div>
            </div>
          )}

          {/* Product Dropdown */}
          <div
            className="sidebar-item"
            onClick={() => toggleDropdown("Product")}
          >
            <FaBox size={14} />
            {!isSidebarCollapsed && <span className="items">Product</span>}
            {!isSidebarCollapsed && (
              <span style={{ marginLeft: "62px" }}>
                {activeDropdown === "Product" ? (
                  <FaChevronDown className="dropdown-icon" />
                ) : (
                  <FaChevronRight className="dropdown-icon" />
                )}
              </span>
            )}
          </div>
          {!isSidebarCollapsed && activeDropdown === "Product" && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => setSelectedItem("Product Form")}
              >
                Product Registration
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => setSelectedItem("Product List")}
              >
                Product List
              </div>
            </div>
          )}

          {/* Order Dropdown */}
          <div className="sidebar-item" onClick={() => toggleDropdown("Form")}>
            <FaShoppingCart size={14} />
            {!isSidebarCollapsed && <span className="items">Order</span>}
            {!isSidebarCollapsed && (
              <span style={{ marginLeft: "70px" }}>
                {activeDropdown === "Form" ? (
                  <FaChevronDown className="dropdown-icon" />
                ) : (
                  <FaChevronRight className="dropdown-icon" />
                )}
              </span>
            )}
          </div>
          {!isSidebarCollapsed && activeDropdown === "Form" && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => setSelectedItem("Order Registration")}
              >
                Order Registration
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => setSelectedItem("Order Details Registration")}
              >
                Order Detail Registration
              </div>
              <div
                className="sidebar-subitem"
                onClick={() => setSelectedItem("Pending")}
              >
                Order List
              </div>
            </div>
          )}

          <div
            className="sidebar-item"
            onClick={() => setSelectedItem("Sales")}
          >
            <FaDollarSign size={14} /> {!isSidebarCollapsed && <span className="items">Sales</span>}
          </div>

          <div
            className="sidebar-item"
            onClick={() => setSelectedItem("Notifications")}
          >
            <FaBell size={14} />  {!isSidebarCollapsed &&  <span className="items">Notifications</span>}
          </div>
          <div
            className="sidebar-item"
            onClick={() => setSelectedItem("Messages")}
          >
            <FaEnvelope size={14} />  {!isSidebarCollapsed &&  <span className="items">Messages</span>}
          </div>
          <div
            className="sidebar-item"
            onClick={() => setSelectedItem("History")}
          >
            <FaHistory size={14} />  {!isSidebarCollapsed &&  <span className="items">History</span>}
          </div>
          <div
            className="sidebar-item"
            onClick={() => setSelectedItem("Settings")}
          >
            <FaCog size={14} /> {!isSidebarCollapsed &&  <span className="items">Settings</span>}
          </div>
        </div>
      </div>

      <div className={`main-content ${isSidebarVisible ? "overlay" : ""}`}>
      <nav className={`navbar ${isSidebarCollapsed ? "collapsed-navbar" : ""}`}>
          <div className="navbar-left">
            <div>
              <button  className="leftalign">
                <AlignLeft size={20} onClick={toggleSidebar} />
              </button>
            </div>

            <div className="main-header-center d-none d-lg-block">
              <input
                className="search-input"
                type="search"
                placeholder="Search for anything..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button className="btn">
                <Search className="d-none d-md-block" />
              </button>
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
