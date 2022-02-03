import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { Fragment } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/esm/Spinner";

export default function Login() {
    // local state
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });

    const { authState } = useContext(AuthContext);
    const { authLoading, isAuthenticated } = authState;

    //load loginUser from AuthContext
    const { loginUser } = useContext(AuthContext);

    // router
    const navigate = useNavigate();

    const onChangeLoginForm = (event) => {
        const { name, value } = event.target;
        setLoginForm({
            ...loginForm,
            [name]: value,
        });
    };

    const { username, password } = loginForm;

    const login = async (event) => {
        // event.preventDefault();
        try {
            const loginData = await loginUser(loginForm);
            // console.log(loginData);
            if (loginData.success) {
                navigate("/dashboard");
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            <div className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <h1>LearnIt</h1>
                        <h4>Keep track of what you are learning</h4>
                        {authLoading ? (
                            <div className="d-flex justify-content-center mt-2">
                                <Spinner animation="border" variant="info" />
                            </div>
                        ) : isAuthenticated ? (
                            <Navigate to="/dashboard" />
                        ) : (
                            <Form className="my-4" onSubmit={login}>
                                <Form.Group className="my-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                        value={username}
                                        onChange={onChangeLoginForm}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="my-3">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={onChangeLoginForm}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="success" type="submit">
                                    Login
                                </Button>
                            </Form>
                        )}

                        <p>
                            Don't have an account?
                            <Link to="/register" className="ms-2">
                                <Button
                                    variant="info"
                                    size="sm"
                                    className="ml-2"
                                >
                                    Register
                                </Button>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
