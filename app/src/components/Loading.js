import React, { Component } from 'react';
import logo from '../logo.svg';

export default class Loading extends Component {
    render(){
        return (
            <img src={logo} className="App-logo-loading" alt="logo" />
        );
    }
}