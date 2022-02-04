import React, { Fragment, useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Spinner from 'react-bootstrap/esm/Spinner';
import AlertMessage from '../layout/AlertMessage';

export default function Register() {
    const { authState } = useContext(AuthContext);
    const { authLoading, isAuthenticated } = authState;

    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [alert, setAlert] = useState(null);
    const navigate = useNavigate()

    //load registerUser from AuthContext
    const { registerUser } = useContext(AuthContext);

    const { username, password, confirmPassword } = registerForm;

    const onChangeRegisterForm = (event) => {
        const { name, value } = event.target;
        setRegisterForm({
            ...registerForm,
            [name]: value,
        });
    };

    const register = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setAlert({ type: 'danger', message: 'Password do not match' });
            setTimeout(() => {
                return setAlert(null);
            }, 5000);
            return;
        }

        try {
            const registerData = await registerUser(registerForm);
            // console.log(loginData);
            if (registerData.success) {
                navigate('/dashboard');
            } else {
                setAlert({ type: 'danger', message: registerData.message });
                setTimeout(() => {
                    return setAlert(null);
                }, 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            <div className='landing'>
                <div className='dark-overlay'>
                    <div className='landing-inner'>
                        <h1>LearnIt</h1>
                        <h4>Keep track of what you are learning</h4>
                        {authLoading ? (
                            <div className='d-flex justify-content-center mt-2'>
                                <Spinner animation='border' variant='info' />
                            </div>
                        ) : isAuthenticated ? (
                            <Navigate to='/dashboard' />
                        ) : (
                            <Form className='my-4' onSubmit={register}>
                                <AlertMessage info={alert} />
                                <Form.Group className='my-3'>
                                    <Form.Control
                                        type='text'
                                        placeholder='Username'
                                        name='username'
                                        required
                                        value={username}
                                        onChange={onChangeRegisterForm}
                                    />
                                </Form.Group>
                                <Form.Group className='my-3'>
                                    <Form.Control
                                        type='password'
                                        placeholder='Password'
                                        name='password'
                                        required
                                        value={password}
                                        onChange={onChangeRegisterForm}
                                    />
                                </Form.Group>
                                <Form.Group className='my-3'>
                                    <Form.Control
                                        type='password'
                                        placeholder='Confirm Password'
                                        name='confirmPassword'
                                        required
                                        value={confirmPassword}
                                        onChange={onChangeRegisterForm}
                                    />
                                </Form.Group>
                                <Button variant='success' type='submit'>
                                    Register
                                </Button>
                            </Form>
                        )}

                        <p>
                            Already have an account?
                            <Link to='/login' className='ms-2'>
                                <Button
                                    variant='info'
                                    size='sm'
                                    className='ml-2'
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
