import "./App.css";
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AuthContextProvider from "./contexts/AuthContext";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";

function App() {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        </AuthContextProvider>
    );
}

export default App;
