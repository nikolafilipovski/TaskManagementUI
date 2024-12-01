import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const TaskContext = createContext();

export function useTasks() {
    return useContext(TaskContext);
}

// eslint-disable-next-line react/prop-types
export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    const handleLogin = async (username, password) => {
        const user = { username, password };

        try {
            const response = await axios.post("http://localhost:44334/login", user);
            const token = response.data.token; 
            localStorage.setItem("jwtToken", token); 
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); 
            const response = await axios.get("http://localhost:44334/api/task/GetAllTasks", {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });

            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const addTask = async (task) => {
        try {
            const token = localStorage.getItem('jwtToken');
            await axios.post("http://localhost:44334/api/task/CreateTask", task, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            fetchTasks();
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const updateTask = async (task) => {
        try {
            const token = localStorage.getItem('jwtToken');
            await axios.put(`http://localhost:44334/api/task/UpdateTask/${task.id}`, task, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });

            fetchTasks();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const token = localStorage.getItem('jwtToken');
            await axios.delete(`http://localhost:44334/api/task/DeleteTask/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });

            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    useEffect(() => {
        handleLogin("admin", "password123");
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
}
