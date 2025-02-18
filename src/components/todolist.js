import React, { useState } from "react";
import axios from "axios";
import "./ToDoList.css";
import { BASE_URL } from "../config";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Avatar,
  Chip,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

// Example tasks
const tasks = [
  { id: 1, title: "Task 1", description: "Description 1", status: "To do", assignee: { name: "John Doe", verified: true }, created_by: "Admin" },
  { id: 2, title: "Task 2", description: "Description 2", status: "Completed", assignee: { name: "Jane Smith", verified: false }, created_by: "Manager" },
  { id: 3, title: "Task 3", description: "Description 3", status: "To do", assignee: { name: "Alice Brown", verified: true }, created_by: "Admin" },
];

const TaskList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    assigned_to: null,
    created_by: null,
  }); // State for form data
  const [activeTab, setActiveTab] = useState("All"); // State for active tab

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}dashboard/tasks/create/`,
        taskData
      );
      if (response.status === 201) {
        alert("Task created successfully!");
        setIsModalOpen(false);
        setTaskData({
          title: "",
          description: "",
          assigned_to: null,
          created_by: null,
        });
      }
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    }
  };

  const handleInputChange = (field, value) => {
    setTaskData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "All") return true;
    return task.status === activeTab;
  });

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" gap={2}>
          <Button
            variant={activeTab === "To do" ? "contained" : "text"}
            onClick={() => setActiveTab("To do")}
          >
            To do
          </Button>
          <Button
            variant={activeTab === "Completed" ? "contained" : "text"}
            onClick={() => setActiveTab("Completed")}
          >
            Completed
          </Button>
          <Button
            variant={activeTab === "All" ? "contained" : "text"}
            onClick={() => setActiveTab("All")}
          >
            All
          </Button>
        </Box>
        <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
          Create Task
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Assigned to</TableCell>
              <TableCell>Created by</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar>{task.assignee.name[0]}</Avatar>
                    {task.assignee.name}
                    {task.assignee.verified && <DoneIcon color="primary" />}
                  </Box>
                </TableCell>
                <TableCell>{task.created_by}</TableCell>
                <TableCell>
                  <Chip
                    label={task.status}
                    color={task.status === "Completed" ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isModalOpen && (
        <div className="createTask-modal">
          <div className="createTask-modal-content">
            <h3>Create Task</h3>
            <form onSubmit={handleFormSubmit} className="createTask-modal-form">
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={taskData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  rows="5"
                  value={taskData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Assigned To:</label>
                <input
                  type="text"
                  value={taskData.assigned_to || ""}
                  onChange={(e) => handleInputChange("assigned_to", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Created By:</label>
                <input
                  type="text"
                  value={taskData.created_by || ""}
                  onChange={(e) => handleInputChange("created_by", e.target.value)}
                />
              </div>
              <div className="createTask-modal-buttons">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="createTask-cancel-button"
                >
                  Cancel
                </button>
                <button type="submit" className="createTask-save-button">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Box>
  );
};

export default TaskList;
