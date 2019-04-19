import React, { Component } from 'react';
import '../layout/Contato.css';

export default class Contato extends Component {
    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.state = {
            name: '',
            email: '',
            users: [],
        };
    }
    sendMessage (e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
        };
        var users = this.state.users;
        users.push(user);
        this.setState({
            users: users,
            name: '',
            email: '',
        });
    }
    changeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    changeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    render() {
        return (
            <div className="wrapper">
                <h2>Contato</h2>
                {this.state.users.length > 0 && <ul>{this.state.users.map((item, index) => <li key={index}>{item.name} - {item.email}</li>)}</ul>}
                <div className="form-contato">
                    <form onSubmit={this.sendMessage}>
                        <fieldset>
                            <label htmlFor="name">Nome:</label>
                            <input id="name" ref="name" value={this.state.name} onChange={this.changeName} name="name" />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="email">E-mail:</label>
                            <input id="email" ref="email" value={this.state.email} onChange={this.changeEmail} name="email" />
                        </fieldset>
                        <fieldset>
                            <input type="submit" value="Enviar"/>
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }
}