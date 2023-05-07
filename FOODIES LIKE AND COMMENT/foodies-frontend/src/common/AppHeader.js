import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './AppHeader.css';
import logo from '../../src/img/logo.png';

class AppHeader extends Component {
    render() {
        return (
            
            <header className="app-header">
                <div className="container container-app-header">
                
                    <div className="app-branding">
                        <Link to="/" className="app-title">
                        <img src={logo} alt="logo" className='logo' />
                        </Link>
                    </div>


                    <div className="app-options">
                        <nav className="app-nav">
                                
                                    <ul>
                                        <li>
                                            <NavLink to="/profile">Profile</NavLink>
                                        </li>
                                        <li>
                                            <a onClick={this.props.onLogout}>Logout</a>
                                        </li>
                                    </ul>
                               
                        </nav>
                    </div>
                </div>
            </header>
            
        )
    }
}

export default AppHeader;