const initialState = {
    post: [],
}


export default (post = [], action) => {
    switch (action.type) {
        case 'Fetch_POST':
            return action.payload;
        case 'CREATE_POST':
            return [...post, action.payload];
        case 'UPDATE_POST':
            return post.map((p) => p._id === action.payload._id ? action.payload : p);
        case 'LIKE_POST':
            return post.map((p) => p._id === action.payload._id ? action.payload : p);
        case 'DELETE_POST':
            return post.filter((p) => p._id !== action.payload);
        default:
            return post;
    }
}