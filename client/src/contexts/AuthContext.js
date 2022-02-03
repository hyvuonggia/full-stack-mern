import { createContext, useReducer } from 'react';
import axios from 'axios'
import { authReducer } from '../reducers/AuthReducer'
import { apiUrl, LOCAL_STORATE_TOKEN_NAME } from './constants'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    })

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
        loginUser: loginUser
    }

    // return provider
    return (
        <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>
    )
}

export default AuthContextProvider;

