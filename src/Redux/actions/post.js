import * as api from '../../api/api.js';

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: 'SHOW_LOADING' })
        const { data } = await api.FetchApi(page);
        dispatch({ type: 'Fetch_POST', payload: data });
        dispatch({ type: 'HIDE_LOADING' })
    } catch (error) {
        console.log(error.message);
    }
}
export const getPostById = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'SHOW_LOADING' })
        const { data } = await api.FetchPostById(id);
        dispatch({ type: 'Fetch_POST_BY_ID', payload: data });
        dispatch({ type: 'HIDE_LOADING' })
    } catch (error) {
        console.log(error.message);
    }
}
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: 'SHOW_LOADING' })
        const { data: data } = await api.FetchPostBySearch(searchQuery);
        dispatch({ type: 'Fetch_POST_BY_SEARCH', payload: data });
        dispatch({ type: 'HIDE_LOADING' })
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post, currentPage, history) => async (dispatch) => {
    try {
        dispatch({ type: 'SHOW_LOADING' })
        const { data } = await api.CreateApi(post);

        // dispatch(getPosts(currentPage));
        history(`/${data._id}`)
        dispatch({ type: 'CREATE_POST', payload: data });

        dispatch({ type: 'HIDE_LOADING' })

    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (id, post, currentPage) => async (dispatch) => {
    try {
        dispatch({ type: 'SHOW_LOADING' })
        const { data } = await api.UpdatePost(id, post);
        dispatch(getPosts(currentPage));
        dispatch({ type: 'UPDATE_POST', payload: data });
        dispatch({ type: 'HIDE_LOADING' })

    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id, currentPage) => async (dispatch) => {
    try {
        dispatch({ type: 'SHOW_LOADING' })
        await api.DeletePost(id);
        dispatch(getPosts(currentPage));
        dispatch({ type: 'DELETE_POST', payload: id });
        dispatch({ type: 'HIDE_LOADING' })

    } catch (error) {
        console.log(error.message);
    }
}

export const likePost = (id, currentPage) => async (dispatch) => {
    try {
        dispatch({ type: 'SHOW_LOADING' })
        const { data } = await api.LikePost(id);
        dispatch(getPosts(currentPage));
        dispatch({ type: 'LIKE_POST', payload: data })
        dispatch({ type: 'HIDE_LOADING' })

    } catch (error) {
        console.log(error.message);
    }
}