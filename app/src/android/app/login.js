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
    KeyboardAvoidingView
} from 'react-native';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false,
            username: '1',
            password: '1',
            bugANDROID: '',
            width: Dimensions.get('window').width
        }
    }

	componentDidMount() {
		appConfig.socket.name = this.state.username;
		this.setState({
			width: Dimensions.get('window').width
        });
	}

    onLogin() {
        if (this.state.username === undefined || this.state.username === '' ||
            this.state.password === undefined || this.state.password === '') {
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

        fetch(appConfig.url + 'api/login', {
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
                That username and password combination did not work
            </Text>;
        }

        return (
            <ScrollView style={{backgroundColor: 'whitesmoke'}} keyboardShouldPersistTaps='always'>
                <KeyboardAvoidingView behavior="padding" enabled>
                <View style={styles.container}>

                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>
                            RN-CHAT
                        </Text>
                    </View>

					<Image style={styles.logo}
                           source={require('../../../img/logo.jpg')}
                    />

                    <TextInput
                        underlineColorAndroid='rgba(0,0,0,0)'
                        onChangeText={(text) => this.setState({
                            username: text,
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
                        placeholder='Login'>
                    </TextInput>

                    <TextInput
                        underlineColorAndroid='rgba(0,0,0,0)'
                        onChangeText={(text) => this.setState({
                            password: text,
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
                        value={this.state.password}
                        placeholder='Password'
                        secureTextEntry={true}>
                    </TextInput>

                    <TouchableHighlight
                        onPress={() => this.onLogin()}
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

                    <Text>{this.state.bugANDROID}</Text>
                </View>
                </KeyboardAvoidingView>
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
        //marginTop: 100
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
		marginTop: -10
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
        marginTop: 20,
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
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default Login;
