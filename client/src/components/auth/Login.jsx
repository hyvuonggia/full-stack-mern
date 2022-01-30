import React from "react";
import { Fragment } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <Fragment>
            <div className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <h1>LearnIt</h1>
                        <h4>Keep track of what you are learning</h4>
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
                            <Button variant="success" type="submit">
                                Login
                            </Button>
                        </Form>
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
