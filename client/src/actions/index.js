import types from './types';
import axios from 'axios';

export function get_user() {
    //take advantage of redux thunk
    //when we return an object, what we return goes through the middleware and reducer.
    //in this case, we're directly returning a function.
    //this function will hit the redux thunk middleware. the middleware sees it's a function, stops it from going though, calls that function, and passes us the dispatch method.
    //we write the stuff we want to do inside dispatch
    //action will be the returned value of get_user()
    return (dispatch) => {
        axios.get('/api/current_user').then( resp => {
            console.log('Server Resp:', resp);
        });
    };
}