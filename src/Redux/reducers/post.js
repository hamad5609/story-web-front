
export default (state = { post: [], isLoading: false, postById: null }, action) => {
    switch (action.type) {
        case 'Fetch_POST':
            return {
                ...state,
                post: action.payload,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case 'Fetch_POST_BY_ID':
            return { ...state, postById: action.payload };
        case 'Fetch_POST_BY_SEARCH':
            return { ...state, post: action.payload };
        case 'SHOW_LOADING':
            return { ...state, isLoading: true };
        case 'HIDE_LOADING':
            return { ...state, isLoading: false };
        case 'CREATE_POST':
            return { ...state, post: [...state.post, action.payload] };
        case 'UPDATE_POST':
            return { ...state, post: state.post.map((p) => p._id === action.payload._id ? action.payload : p) }
        case 'LIKE_POST':
            return { ...state, post: state.post.map((p) => p._id === action.payload._id ? action.payload : p) }
        case 'DELETE_POST':
            return { ...state, post: state.post.filter((p) => p._id !== action.payload) };
        default:
            return state;
    }
}