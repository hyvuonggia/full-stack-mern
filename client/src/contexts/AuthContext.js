import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios'
import { authReducer } from '../reducers/AuthReducer'
import { apiUrl, LOCAL_STORATE_TOKEN_NAME } from './constants'
import setAuthToken from '../utils/SetAuthToken.js'
import { SET_AUTH } from '../reducers/types';

export const AuthContext = createContext()


const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    })

    // authenticate user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORATE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORATE_TOKEN_NAME])
        }

        try {
            const response = await axios.get(`${apiUrl}/auth`)
            if (response.data.success) {
                dispatch({
                    type: SET_AUTH,
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user
                    }
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORATE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: SET_AUTH,
                payload: {
                    isAuthenticated: false,
                    user: null
                }
            })
        }
    }

    useEffect(() => loadUser(), [])



    // login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORATE_TOKEN_NAME, response.data.accessToken)
                return response.data
            }
        } catch (error) {
            if (error.response.data) {
                // console.log(error.response.data);
                return error.response.data
            } else {
                return {
                    success: false,
                    message: error.message
                }
            }
        }
    }

    // context data
    const authContextData = {
        loginUser: loginUser,
        authState: authState
    }

    // return provider
    return (
        <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>
    )
}

export default AuthContextProvider;

