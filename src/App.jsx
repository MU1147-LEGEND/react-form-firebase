// src/App.js
import Form from "./components/Form";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
    return (
        <div className="w-4/5 mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Feedback Form</h1>
            <Form />
            <Dashboard />
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
}
