import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';

import {get_user} from "../actions";

import Nav from './nav';
import Home from './home';
import ChatLobby from './chat-lobby';

class App extends Component{

    componentDidMount(){
        this.props.get_user();
    }

    render(){
        return (
        <div>
            <div className="container">
                <Nav/>
                <h1>This will be our app</h1>
                <Route exact path="/" component={Home}/>
                <Route path="/chat-lobby" component={ChatLobby}/>
            </div>
        </div>
        )
    }
}

export default connect(null, {get_user})(App);
