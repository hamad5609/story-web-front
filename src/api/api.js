import axios from "axios";

const url = "http://localhost:5000";
// const url = "https://story-web-back.herokuapp.com";
const Api = axios.create({ baseURL: url });
Api.interceptors.request.use((req) => {
    if (localStorage.getItem('UserProfile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('UserProfile')).token}`;
    }
    return req;
})

export const FetchApi = (page) => Api.get(`/?page=${page}`);
export const FetchPostById = (id) => Api.get(`/${id}`);
export const FetchPostBySearch = (searchQuery) => Api.get(`/post/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const CreateApi = (payload) => Api.post(`/post`, payload);
export const UpdatePost = (id, payload) => Api.patch(`/post/${id}`, payload);
export const DeletePost = (id) => Api.delete(`/post/${id}`);
export const LikePost = (id) => Api.patch(`/post/${id}/like`);
export const CommentPost = (id, payload) => Api.patch(`/post/${id}/comment`, payload);
export const DeleteComment = (id, payload) => Api.patch(`/post/${id}/deletecomment`, payload);
export const SignIn = (formData) => Api.post(`/user/signin`, formData);
export const SignUp = (formData) => Api.post(`/user/signup`, formData);