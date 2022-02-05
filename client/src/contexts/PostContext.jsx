import axios from 'axios';
import { createContext, useReducer, useState } from 'react';
import { postReducer } from '../reducers/PostReducer.js';
import {
    ADD_POST,
    POSTS_LOADED_FAIL,
    POSTS_LOADED_SUCCESS,
} from '../reducers/types.js';
import { apiUrl } from './constants.js';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    // state
    const [postState, dispatch] = useReducer(postReducer, {
        posts: [],
        postsLoading: true,
    });
    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null,
    });

    // get all posts
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`);
            if (response.data.success) {
                dispatch({
                    type: POSTS_LOADED_SUCCESS,
                    payload: response.data.posts,
                });
            }
        } catch (error) {
            dispatch({
                type: POSTS_LOADED_FAIL,
            });
        }
    };

    // add post
    const addPost = async (newPost) => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost);
            if (response.data.success) {
                dispatch({
                    type: ADD_POST,
                    payload: response.data.post,
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' };
        }
    };

    const postContextData = {
        postState: postState,
        getPosts: getPosts,
        showAddPostModal: showAddPostModal,
        setShowAddPostModal: setShowAddPostModal,
        addPost: addPost,
        showToast: showToast,
        setShowToast: setShowToast,
    };

    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
