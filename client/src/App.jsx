import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AuthContextProvider from './contexts/AuthContext';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './components/routing/ProtectedRoute';
import About from './components/views/About';
import PostContextProvider from './contexts/PostContext';

function App() {
    return (
        <AuthContextProvider>
            <PostContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Landing />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route path='/about' element={<About />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </PostContextProvider>
        </AuthContextProvider>
    );
}

export default App;
