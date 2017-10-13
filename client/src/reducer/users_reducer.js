import types from '../actions/types';

const DEFAULT_STATE= {auth: null};

export default function(state = DEFAULT_STATE, action){
    switch(action.type){
        case types.GET_USER:
            console.log('Action:', action);
            return {auth: action.payload};
        default:
            return state;
    }
}