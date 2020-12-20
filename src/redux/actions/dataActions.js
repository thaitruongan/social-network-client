import {SET_FEEDS, SET_FEED, LOADING_DATA,UNLIKE_FEED, LIKE_FEED, DELETE_FEED, SET_ERRORS,
     SUBMIT_COMMENT, CLEAR_ERRORS,LOADING_UI,POST_FEED,STOP_LOADING_UI,SET_USERS} from '../types';
import axios from 'axios';

export const getFeeds = () => dispatch => {
    dispatch({type:LOADING_DATA});
    axios.get('/feeds')
        .then(res=>{
            dispatch({
                type: SET_FEEDS,
                payload: res.data
            })
        })
        .catch(err=>{
            dispatch({
                type:SET_FEEDS,
                payload: []
            });
        });
};

export const getFeed = (feedId) => (dispatch) =>{
    dispatch({type:LOADING_UI});
    axios.get(`/feed/${feedId}`)
    .then(res=>{
        dispatch({
            type:SET_FEED,
            payload:res.data
        });
        dispatch({type:STOP_LOADING_UI})
    })
    .catch(err=>console.log(err))
}

export const postFeed = (formData) => (dispatch) =>{
    dispatch({type:LOADING_UI});
    axios.post('/feed',formData)
    .then(res=>{
        dispatch({
            type: POST_FEED,
            payload: res.data
        });
        dispatch({
            type: CLEAR_ERRORS
        });
    })
    .catch(err=>{
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
    })
}

export const likeFeed = (feedId) => (dispatch) =>{
    axios.get(`/feed/${feedId}/like`)
        .then(res=>{
            dispatch({
                type: LIKE_FEED,
                payload: res.data
            });
        })
        .catch(err=> console.log(err));
};

export const unlikeFeed = (feedId) => (dispatch) =>{
    axios.get(`/feed/${feedId}/unlike`)
        .then(res=>{
            dispatch({
                type: UNLIKE_FEED,
                payload: res.data
            })
        })
        .catch(err=> console.log(err));
};

export const submitComment = (feedId,commentData)=>(dispatch)=>{
    axios.post(`/feed/${feedId}/comment`,commentData)
    .then(res=>{
        dispatch({
            type: SUBMIT_COMMENT,
            payload: res.data
        });
        dispatch(clearErrors());
    })
    .catch(err=>{
        dispatch({
            type:SET_ERRORS,
            payload: err.response.data
        })
    })
}

export const deleteFeed = (feedId) => dispatch => {
    axios.delete(`/feed/${feedId}`)
    .then(()=>{
        dispatch({
            type: DELETE_FEED,
            payload: feedId 
        })
    })
    .catch(err=>console.log(err))
}

export const getUserData = (userHandle) => dispatch => {
    dispatch({type:LOADING_DATA});
    axios.get(`/user/${userHandle}`)
    .then(res=>{
        dispatch({
            type: SET_FEEDS,
            payload:res.data.feeds
        });

    })
    .catch(()=>{
        dispatch({
            type:SET_FEEDS,
            payload: null
        })
    })
}

export const clearErrors = () => (dispatch) =>{
    dispatch({type:CLEAR_ERRORS});
}

export const getAllUsers = () => dispatch =>{
    dispatch({type:LOADING_DATA});
    axios.get('/getAllUsers')
    .then(res=>{
        dispatch({
            type: SET_USERS,
            payload: res.data
        })
    })
    .catch(err=>{
        dispatch({
            type:SET_USERS,
            payload: []
        });
    });
}
