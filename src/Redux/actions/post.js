import * as api from '../../api/api.js';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.FetchApi();
        dispatch({ type: 'SHOW_LOADER', payload: true });
        dispatch({ type: 'Fetch_POST', payload: data });
        dispatch({ type: 'SHOW_LOADER', payload: false });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: 'SHOW_LOADER', payload: true });
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.CreateApi(post);
        dispatch({ type: 'SHOW_LOADER', payload: true });
        dispatch({ type: 'CREATE_POST', payload: data });
        dispatch({ type: 'SHOW_LOADER', payload: false });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: 'SHOW_LOADER', payload: true });
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.UpdatePost(id, post);
        dispatch({ type: 'SHOW_LOADER', payload: true });
        dispatch({ type: 'UPDATE_POST', payload: data });
        dispatch({ type: 'SHOW_LOADER', payload: false });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: 'SHOW_LOADER', payload: true });
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.DeletePost(id);
        dispatch({ type: 'DELETE_POST', payload: id });
    } catch (error) {
        console.log(error.message);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.LikePost(id);
        dispatch({ type: 'LIKE_POST', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}