'use strict';

import React, {Component} from 'react';

import Login from './login';
import DriverReg from '../yard/driverReg';
import AppContainer from './appContainer';

console.disableYellowBox = true;

/*GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
global.FormData = global.originalFormData ? global.originalFormData : global.FormData;*/

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
            driver: {
                plateNo: 'AA1234AA',
                status: 'arrived',
                standing: 'n/a',
            }
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
                <DriverReg/>
            );
        }
    }
}

export default App;
