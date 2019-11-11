import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Dimensions,
    ScrollView,
} from 'react-native';

class Driver extends Component {
    constructor(props) {
        super(props);
        var date = new Date().toJSON().slice(0, 10);
        var time = new Date().toTimeString().slice(0, 8);

        this.state = {
            messages: [],
            filteredItems: [],
            time: date + ' ' + time,
            command: 'Go to yard right now',
            showProgress: false,
            plateNo: appConfig.driver.plateNo,
            status: appConfig.driver.status,
            standing: appConfig.driver.standing,
            width: Dimensions.get('window').width
        };

        this.renderStatus(appConfig.driver.status, appConfig.driver.standing);

        var status = '';
        var standing = '';

        ws = new WebSocket('wss://jwt-yard.herokuapp.com');

        ws.onerror = (e) => {
            this.message = 'error';
            window.appConfig.onLogOut();
        };

        ws.onmessage = (e) => {
            let d = new Date;
            let messageObject = e.data;
            let time;

            if (messageObject !== 'still alive') {
                if (messageObject.split('###')[0] === this.state.plateNo) {
                    status = messageObject.split('###')[1];
                    standing = messageObject.split('###')[2];
                    time = messageObject.split('###')[3].split('.')[0];
                    this.renderStatus(status, standing);
                }
                this.setState({
                    status,
                    standing,
                    time,
                    showProgress: false
                });
            }
        };
    }

    componentDidMount() {
        this.renderStatus(appConfig.driver.status, appConfig.driver.standing);
    }

    renderStatus(status, standing) {
        var command;
        switch (status) {
            case 'created':
                command = 'Go to yard right now';
                break;
            case 'arrived':
                command = 'Wait for destination';
                break;
            case 'booked':
                command = 'Go to ' + standing + ' right now';
                break;
            case 'docked':
                command = 'Wait for undocking';
                break;
            case 'undocked':
                command = 'Go from yard, now';
                break;
            case 'departed':
                command = 'You left the yard';
                break;
        }
        this.setState({
            command: command
        });
    }

    goSend() {
        window.appConfig.onLogOut();
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: 'whitesmoke'}} keyboardShouldPersistTaps='always'>
                <View style={styles.container}>
                    <Text style={{
                        fontSize: 40,
                        textAlign: 'center',
                        margin: 10,
                        paddingTop: 3,
                        height: 60,
                        backgroundColor: 'darkblue',
                        width: this.state.width * .85,
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: 10
                    }}>
                        {this.state.plateNo}
                    </Text>

                    <Text style={{
                        fontSize: 50,
                        textAlign: 'center',
                        margin: 10,
                        paddingTop: 30,
                        height: 200,
                        backgroundColor: 'red',
                        width: this.state.width * .85,
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: 10
                    }}>
                        {this.state.command}
                    </Text>

                    <Text style={{
                        fontSize: 25,
                        textAlign: 'center',
                        margin: 10,
                        paddingTop: 7,
                        height: 50,
                        backgroundColor: 'darkblue',
                        width: this.state.width * .85,
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: 5,
                    }}>
                        {this.state.time}
                    </Text>

                    <View>
                        <TouchableHighlight
                            onPress={() => this.goSend()}
                            style={{
                                height: 50,
                                width: this.state.width * .95,
                                backgroundColor: 'darkblue',
                                borderColor: '#48BBEC',
                                alignSelf: 'stretch',
                                marginTop: 20,
                                margin: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 5
                            }}>
                            <Text style={styles.buttonText}>
                                Quit
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
        borderColor: '#48BBEC',
        marginTop: 0,
        textAlign: 'center'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'white'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    },
    loader: {
        justifyContent: 'center',
        height: 100
    },
});

export default Driver;
