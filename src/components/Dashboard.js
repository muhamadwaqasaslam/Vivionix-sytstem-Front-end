import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { FaBars, FaTimes } from "react-icons/fa"; // Import only FaBars and FaTimes
import "./Dashboard.css"; // Make sure your CSS is linked

// Register the necessary components
Chart.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null); // Initialize selectedTask state

    const [tasks, setTasks] = useState([
        { title: "Task 1", status: "Pending", date: "2024-11-01" },
        { title: "Task 2", status: "Completed", date: "2024-11-02" },
    ]);

    const handleMenuClick = (index) => {
        setSelectedTask(tasks[index]); // Set the selected task
        setModalOpen(true); // Open the modal
    };

    const [employees, setEmployees] = useState([
        {
            id: 1,
            name: "John Doe",
            role: "Developer",
            timeAdded: "2024-11-01 10:00",
        },
        {
            id: 2,
            name: "Jane Smith",
            role: "Designer",
            timeAdded: "2024-11-01 10:15",
        },
        {
            id: 3,
            name: "Mike Johnson",
            role: "Manager",
            timeAdded: "2024-11-01 10:30",
        },
    ]);

    const pieChartData = {
        labels: ["Department A", "Department B", "Department C"],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
        ],
    };

    return (
        <div className="dashboard-container">
            <div className="chart-container">
                <div className="pie-chart">
                    <h2>Department Distribution</h2>
                    <Pie data={pieChartData} />
                </div>
                <div className="employee-list">
                    <h2>Recently Added Employees</h2>
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Time Added</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.role}</td>
                                    <td>{employee.timeAdded}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="task-container">
                <h2>Assigned Tasks</h2>
                <table className="task-table">
                    <thead>
                        <tr>
                            <th></th> {/* Updated to show FaBars */}
                            <th>Task Title</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={index}>
                                <td>
                                    <button onClick={() => handleMenuClick(index)}>
                                        <FaBars /> {/* Display FaBars icon */}
                                    </button>
                                </td>
                                <td>{task.title}</td>
                                <td>
                                    <button
                                        className={
                                            task.status === "Completed" ? "completed" : "pending"
                                        }
                                    >
                                        {task.status}
                                    </button>
                                </td>
                                <td>{task.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {modalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <button className="close-button" onClick={() => setModalOpen(false)}>
                                <FaTimes />
                            </button>
                            {selectedTask && (
                                <div>
                                    <h2>Task Details</h2>
                                    <p><strong>Title:</strong> {selectedTask.title}</p>
                                    <p><strong>Status:</strong> {selectedTask.status}</p>
                                    <p><strong>Date:</strong> {selectedTask.date}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="task-and-create-container">
                <div className="assigned-tasks-container">
                    <h2>Assigned Tasks by Me</h2>
                    <div className="create-task-buttons">
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                    <table className="assigned-task-table">
                        <thead>
                            <tr>
                                <th></th>  {/* Header icon */}
                                <th>Task Title</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={index}>
                                    <td>
                                        <button onClick={() => handleMenuClick(index)}>
                                            <FaBars /> {/* Display FaBars icon */}
                                        </button>
                                    </td>
                                    <td>{task.title}</td>
                                    <td>
                                        <button
                                            className={
                                                task.status === "Completed" ? "completed" : "pending"
                                            }
                                        >
                                            {task.status}
                                        </button>
                                    </td>
                                    <td>{task.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="create-task-container">
                    <h2>Create Task</h2>
                    <div className="create-task-buttons">
                        <button>Create Task</button>
                    </div>
                    <table className="create-task-table">
                        <thead>
                            <tr>
                                <th>Task Title</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sample Task 1</td>
                                <td>Pending</td>
                                <td>2024-11-01</td>
                            </tr>
                            <tr>
                                <td>Sample Task 2</td>
                                <td>Completed</td>
                                <td>2024-11-02</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
