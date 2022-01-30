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
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
