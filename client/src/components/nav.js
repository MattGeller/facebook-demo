import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
    render(){
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo">Chatty App</Link>
                    <ul className="right">
                        <li><a href="/auth/facebook">Login</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Nav;
