'use strict';

import React, {Component} from 'react';
import {
    ActivityIndicator,
    Text, View, StyleSheet
} from 'react-native';

console.disableYellowBox = true;

import Login from './login';
import DriverReg from '../yard/driverReg';
import SheriffReg from '../sheriff/login';
import AppContainer from './appContainer';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: true,
            isLoggedIn: false,
        };

        window.appConfig = {
            access_token: '',
            url: 'http://jwt-yard.herokuapp.com/',
            onLogOut: this.onLogOut.bind(this),
            onLogin: this.onLogin.bind(this),
            socket: {},
            item: {},
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
            driver: {
                plateNo: 'AA1234AA',
                status: 'arrived',
                standing: 'n/a',
            }
        };

        this.getToken();
    }

    getToken() {
        fetch(appConfig.url + 'api/auth', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                appConfig.access_token = responseData.token;
                this.setState({
                    showProgress: false
                });
            })
            .catch(() => {
                this.setState({
                    serverError: true
                });
            })
    }

    onLogin() {
        this.setState({isLoggedIn: true});
    }

    onLogOut() {
        this.setState({isLoggedIn: false});
    }

    render() {


        if (!this.state.showProgress) {
            if (this.state.isLoggedIn) {
                return (
                    <AppContainer/>
                );

            } else {
                return (
                    <SheriffReg/>
                );
            }
        } else {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator
                        size="large"
                        color="darkblue"
                        animating={true}
                    />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    loader: {
        marginTop: 200,
        justifyContent: 'center',
        height: 100
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    },
});

export default App;
