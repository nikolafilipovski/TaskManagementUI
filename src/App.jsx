import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TaskList } from "./components/TaskList";
//import { TaskModal } from "./components/TaskModal";
import { TaskProvider } from "./context/TaskContext";

function App() {
    return (
        <Router>
            <TaskProvider>
                <Routes>
                    <Route path="/" element={<TaskList />} />
                    {/*<Route path="/" element={<TaskModal />} />*/}
                </Routes>
            </TaskProvider>
        </Router>
    );
}

export default App;

