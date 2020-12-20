import {SET_FEEDS,SET_FEED, LIKE_FEED, UNLIKE_FEED, LOADING_DATA, DELETE_FEED, POST_FEED, SUBMIT_COMMENT,SET_USERS} from '../types';

const initialState = {
    feeds: [],
    feed: {},
    users:[],
    loading: false
};

export default function(state = initialState,action){
    switch(action.type){
        case LOADING_DATA:
            return{
                ...state,
                loading: true
            }
        case SET_FEEDS:
            return{
                ...state,
                feeds:action.payload,
                loading:false
            };
        case SET_FEED:
            return{
                ...state,
                feed:action.payload
            };            
        case SET_USERS:
            return{
                ...state,
                users:action.payload,
                loading:false
            }
        case LIKE_FEED:
        case UNLIKE_FEED:
            let index = state.feeds.findIndex((feed)=>feed.feedId === action.payload.feedId);
            state.feeds[index] = action.payload;
            if(state.feed.feedId === action.payload.feedId){
                let temp = state.feed.comments;
                state.feed = action.payload;
                state.feed.comments = temp;
            }
            return{
                ...state
            };
        case DELETE_FEED:
            index = state.feeds.findIndex((feed) => feed.feedId === action.payload);
            state.feeds.splice(index, 1);
            return {
             ...state
            };
        case POST_FEED:
           return{
               ...state,
               feeds:[
                   action.payload,
                   ...state.feeds
               ] 
           }
        case SUBMIT_COMMENT:
            return{
                ...state,
                feed:{
                    ...state.feed,
                    comments:[action.payload,...state.feed.comments]
                }
            }
        default:
            return state;
    }
}