import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Nav extends Component {
    renderList(){
        //3 options
        switch(this.props.auth){
            //if request to server is still in progress (trying and waiting to log in)
            case null:
                return null;
            //user is not logged in cause our app to refresh, resetting the state
            case "":
                return <li><a href="/auth/facebook">Login</a></li>;

            default:
                return [
                    <li key="0"><a href="/chat-lobby">Chat Lobby</a></li>,
                    <li key="1"><a href="/api/logout">Logout</a></li>
                    ];

        }
    }

    render(){
        return (
            <nav>
                <div className="nav-wrapper teal">
                    <Link to="/" className="brand-logo">Chatty App</Link>
                    <ul className="right">
                        {this.renderList()}
                    </ul>
                </div>
            </nav>
        )
    }
}

//get information about whether or not the user is logged in
function mapStateToProps(state){
    return {
        auth: state.user.auth
    }
}

//connect allows us to take our redux store state and add it to the component's props
export default connect(mapStateToProps)(Nav);
