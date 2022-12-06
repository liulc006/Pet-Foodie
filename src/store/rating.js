//redux store for rating 
import axios from "axios";

const ratings = (state=[], action) => {
    if(action.type === 'FETCH_RATINGS'){
        return action.ratings;
    }
    if(action.type === 'FETCH_PRODUCT_RATINGS'){
        return [...action.ratings];
    }
    if(action.type === 'ADD_RATING'){
        return [...state, action.rating];
    }
    return state;
};

export const submitRating = ( productId, star, comment, navigate) => {
    return async(dispatch)=>{
        const token = window.localStorage.getItem('token');
        const response = await axios.post('/api/ratings/addRating', {
             productId: productId,
             star: star,
             comment: comment
        },
        {
            headers: {
                authorization: token
            }
        });
        console.log(response)
        dispatch({type: 'ADD_RATING', rating: response.data});
        navigate(`/products/${productId}`);
    };
};

export const fetchProductRatings = (id) => {
    return async(dispatch)=> {
        const response = await axios.get(`/api/ratings/product/${id}`);
        dispatch({type: 'FETCH_PRODUCT_RATINGS', ratings: response.data});
    };  
};

export const fetchRatings = () => {
    return async(dispatch) => {
        const response = await axios.get( '/api/ratings');
        dispatch({type: 'FETCH_RATINGS', ratings: response.data});
    };
};

export default ratings;