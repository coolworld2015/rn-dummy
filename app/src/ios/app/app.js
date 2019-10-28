'use strict';

import React, {Component} from 'react';

import Login from './login';
import AppContainer from './appContainer';

console.disableYellowBox = true;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
        };

        window.appConfig = {
            access_token: '',
            url: 'http://jwt-chat.herokuapp.com/',
            onLogOut: this.onLogOut.bind(this),
            socket: {},
            phones: {
                items: [],
                item: {},
            },
            users: {
                items: [],
                item: {},
            },
            audit: {
                items: [],
                item: {},
            },
        };
    }

    onLogin() {
        this.setState({isLoggedIn: true});
    }

    onLogOut() {
        this.setState({isLoggedIn: false});
    }

    render() {
        if (this.state.isLoggedIn) {
            return (
                <AppContainer/>
            );
        } else {
            return (
                <Login onLogin={this.onLogin.bind(this)}/>
            );
        }
    }
}

export default App;
