import { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { AddTask } from "./AddTask";

export function TaskList() {
    const { tasks, deleteTask, updateTask } = useTasks();

    return (
        <div className="container mt-5">
            <h1>Tasks table</h1>

            <div className="mt-4">
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
                                            onClick={() => updateTask(task)}
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
            {<AddTask />}
        </div>
    );
}