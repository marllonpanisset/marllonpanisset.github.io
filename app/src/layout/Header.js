import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: [],
        };
        this.getRoutes = this.getRoutes.bind(this);
    }
    getRoutes() {
        this.setState({
            routes: [
                {
                    url: '/',
                    component: 'Home',
                    title: 'Home'
                },
                {
                    url: '/sobre-mim',
                    component: 'Sobre Mim',
                    title: 'Sobre Mim'
                },
                {
                    url: '/contato',
                    component: 'Contato',
                    title: 'Contato'
                },
            ],
        });
    }
    componentWillMount() {
        if (this.state.routes.length === 0) {
            this.getRoutes();
        }
    }
    getLinks() {
        const menu = this.state.routes.map((item, index) => {
            return (<li key={index}><Link to={item.url}>{item.title}</Link></li>)
        });
        return menu;
    }
    render() {
        return (
            <header className="App-header">
                <h1 className="App-title">Marllon Panisset</h1>
                {this.state.routes.length > 0 && <ul className="App-menu">
                    {this.getLinks()}
                </ul>}
            </header>
        );
    }
}

export default Header;