'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Dimensions,
    Alert
} from 'react-native';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false,
            badCredentials: '',
            plateNo: '',
            width: Dimensions.get('window').width
        }
    }

    componentDidMount() {
    }

    getToken() {
        if (this.state.plateNo === '') {
            this.invalidValue = true;
        }

        if (this.invalidValue) {
            return;
        }

        this.setState({
            showProgress: true,
            badCredentials: false,
        });

        var plateNo = this.state.plateNo;

        fetch('https://jwt-yard.herokuapp.com/api/auth', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                appConfig.access_token = responseData.token;

                fetch('https://jwt-yard.herokuapp.com/api/vehicles/get', {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': appConfig.access_token
                    },
                })
                    .then((response) => response.json())
                    .then((items) => {
                        var arr = items.filter((el) => el.plateNo.toLowerCase() === plateNo.toLowerCase());
                        if (arr[0]) {
                            if (arr[0].plateNo.toLowerCase() === this.state.plateNo.toLowerCase()) {
                                appConfig.driver = arr[0];
                                appConfig.driver.reg = new Date(+new Date() - (new Date()).getTimezoneOffset() * 60000).toISOString();

                                this.props.navigation.navigate('Driver');
                            } else {
                                this.setState({
                                    badCredentials: true,
                                    showProgress: false
                                });
                            }
                            /*this.setState({
                                badCredentials: true,
                                showProgress: false
                            });*/
                        }
                        /*this.setState({
                            badCredentials: true,
                            showProgress: false
                        });*/
                    })
                    .catch(error => {
                        this.setState({
                            badCredentials: true,
                            showProgress: false
                        });
                    });
            })
            .catch(error => {
                this.setState({
                    badCredentials: true,
                    showProgress: false
                });
            });
    }

    onLogin() {
        if (this.state.plateNo === '') {
            this.invalidValue = true;
        }

        if (this.invalidValue) {
            return;
        }

        appConfig.getAccessToken();

        if (!appConfig.access_token) {
            this.getToken();
            return;
        }

        if (this.state.username === undefined || this.state.username === '') {
            this.setState({
                badCredentials: true
            });
            return;
        }

        this.setState({
            showProgress: true,
            badCredentials: false,
            bugANDROID: ' '
        });

        var url = appConfig.url;

        fetch('https://jwt-yard.herokuapp.com/api/login', {
            method: 'post',
            body: JSON.stringify({
                name: this.state.username,
                pass: this.state.password,
                description: 'Android'
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if (responseData.token) {
                    appConfig.access_token = responseData.token;
                    appConfig.socket.name = this.state.username;
                    this.setState({
                        badCredentials: false
                    });
                    this.props.onLogin();
                } else {
                    this.setState({
                        badCredentials: true,
                        showProgress: false
                    });
                }
            })
            .catch((error) => {
                console.log(responseData);
                this.setState({
                    badCredentials: true,
                    showProgress: false
                });
            })
    }

    render() {
        let errorCtrl;

        if (this.state.badCredentials) {
            errorCtrl = <Text style={styles.error}>
                Can't register this PlateNo - try another one
            </Text>;
        }

        return (
            <ScrollView style={{backgroundColor: 'whitesmoke'}} keyboardShouldPersistTaps='always'>
                <View style={styles.container}>

                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>
                            RN-Yard
                        </Text>
                    </View>

                    <Image style={styles.logo}
                           source={require('../../../img/yard.png')}
                    />

                    <TextInput
                        underlineColorAndroid='rgba(0,0,0,0)'
                        onChangeText={(text) => this.setState({
                            plateNo: text,
                            badCredentials: false
                        })}
                        style={{
                            height: 50,
                            width: this.state.width * .90,
                            marginTop: 10,
                            padding: 4,
                            fontSize: 18,
                            borderWidth: 1,
                            borderColor: 'lightgray',
                            borderRadius: 5,
                            color: 'black',
                            backgroundColor: 'white'
                        }}
                        value={this.state.username}
                        placeholder='PlateNo'>
                    </TextInput>

                    <TouchableHighlight
                        onPress={() => this.getToken()}
                        style={styles.button}>
                        <Text style={styles.buttonText}>
                            Log in
                        </Text>
                    </TouchableHighlight>

                    {errorCtrl}

                    <ActivityIndicator
                        animating={this.state.showProgress}
                        size="large"
                        color="darkblue"
                        style={styles.loader}
                    />

                </View>
            </ScrollView>
        )
    }

    onLoginPressed() {
        this.props.onLogin();
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        padding: 10,
        alignItems: 'center',
        flex: 1,
        marginTop: 50
    },
    logo: {
        width: 150,
        height: 150,
        paddingTop: 140,
        borderRadius: 20,
        marginBottom: 10
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20
    },
    heading: {
        fontSize: 30,
        marginTop: 10,
        color: 'navy',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    button: {
        height: 50,
        //backgroundColor: '#48BBEC',
        backgroundColor: 'darkblue',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 30,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    loader: {
        marginTop: 30
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default Login;
