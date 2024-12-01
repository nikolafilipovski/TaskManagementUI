import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { TaskModal } from "./TaskModal"; 

export function TaskList() {
    const { tasks, deleteTask } = useTasks();
    const [showModal, setShowModal] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null); 

    const handleEditClick = (task) => {
        setTaskToEdit(task);  
        setShowModal(true);    
    };

    const handleAddClick = () => {
        setTaskToEdit(null);   
        setShowModal(true);    
    };

    const handleCloseModal = () => {
        setShowModal(false);  
        setTaskToEdit(null);   
    };

    return (
        <div className="container pt-5">
            <h1 className="text-center">Tasks table</h1>

            <div className="mt-4">
                <button className="btn btn-primary mb-3" onClick={handleAddClick}>Add New Task</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No tasks available
                                </td>
                            </tr>
                        ) : (
                            tasks.map((task, index) => (
                                <tr key={task.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>
                                        <span className={`badge bg-primary`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm mx-1"
                                            onClick={() => handleEditClick(task)} 
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm mx-1"
                                            onClick={() => deleteTask(task.id)} 
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && <TaskModal task={taskToEdit} onClose={handleCloseModal} />}
        </div>
    );
}
