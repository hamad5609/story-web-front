import * as api from '../../api/api.js';

export const signIn = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.SignIn(formData);
        dispatch({ type: 'AUTH', data });
        history('/');
    } catch (error) {
        console.log(error.message);
    }
}
export const signUp = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.SignUp(formData);
        dispatch({ type: 'AUTH', data });
        history('/');
    } catch (error) {
        console.log(error.message);
    }
}