import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

class Nav extends React.Component {

    render() {
        return (
            <ul className="navigation">
                <li><NavLink exact to="/" >Home</NavLink></li>
                <li><NavLink to="/battle" >Battle</NavLink></li>
                <li><NavLink to="/popular">Popular</NavLink></li>
            </ul>
        )
    }
}

export default Nav;