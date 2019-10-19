'use strict';

import React, {Component} from 'react';

console.disableYellowBox = true;

import Login from './login';
import AppContainer from './appContainer';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: true,
        };

        window.appConfig = {
            access_token: '',
            url: 'http://jwt-chat.herokuapp.com/',
            onLogOut: this.onLogOut.bind(this),
            socket: {},
            phones: {
                refresh: true,
                items: [],
                item: {},
            },
            users: {
                refresh: true,
                items: [],
                item: {},
            },
            audit: {
                refresh: true,
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
