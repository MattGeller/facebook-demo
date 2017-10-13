export default ({dispatch}) => next => action => {
    //if it's not a function, we don't care
    if(typeof action !== 'function'){
        return next(action);
    }

    //if it is a function, we invoke it
    action(dispatch);
}