import React from "react";
import { Fragment, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/esm/Spinner";

export default function Register() {
    const { authState } = useContext(AuthContext);
    const { authLoading, isAuthenticated } = authState;

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
                            <Form className="my-4">
                                <Form.Group className="my-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="my-3">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="my-3">
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        required
                                    />
                                </Form.Group>
                                <Button variant="success" type="submit">
                                    Register
                                </Button>
                            </Form>
                        )}

                        <p>
                            Already have an account?
                            <Link to="/login" className="ms-2">
                                <Button
                                    variant="info"
                                    size="sm"
                                    className="ml-2"
                                >
                                    Login
                                </Button>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
