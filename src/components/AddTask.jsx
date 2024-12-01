import { useState } from "react";
import { useTasks } from "../context/TaskContext";

export function AddTask() {
    const { addTask } = useTasks();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = { title, description, status };
        addTask(newTask);
        setTitle("");
        setDescription("");
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="m-5 border rounded shadow-sm">
                <div className="m-4">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        placeholder="Enter task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="m-4">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id="description"
                        className="form-control"
                        placeholder="Enter task description"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="m-4">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                        id="status"
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary m-4">Add Task</button>
            </form>
        </>
    );
}
