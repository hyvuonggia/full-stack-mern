import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Routes,
} from "react-router-dom";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AuthContextProvider from "./contexts/AuthContext";
import Dashboard from "./views/Dashboard";

function App() {
    return (
        <AuthContextProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                </Routes>
            </Router>
        </AuthContextProvider>
    );
}

export default App;
