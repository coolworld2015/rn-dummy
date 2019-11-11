import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TextInput,
    Dimensions,
    ActivityIndicator,
    ScrollView,
    Alert,
    KeyboardAvoidingView
} from 'react-native';

import PushNotificationIOS from '@react-native-community/push-notification-ios';
import ListItem from './listItem';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            filteredItems: [],
            messageText: '',
            showProgress: false,
            plateNo: appConfig.driver.plateNo,
            status: appConfig.driver.status,
            standing: appConfig.driver.standing,
            width: Dimensions.get('window').width
        };

        if (!appConfig.socket.name) {
            appConfig.socket.name = 'Ed';
        }

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
            this.state.messages.unshift({
                id: +new Date(),
                name: messageObject.split('###')[1],
                date: messageObject.split('###')[2],
                message: messageObject.split('###')[0]
            });

            this.state.filteredItems.unshift({
                id: +new Date(),
                name: messageObject.split('###')[1],
                date: messageObject.split('###')[2],
                message: messageObject.split('###')[0]
            });

            if (messageObject.split('###')[0] !== 'still alive') {
                if (messageObject.split('###')[0] === this.state.plateNo) {
                    status = messageObject.split('###')[1];
                    standing = messageObject.split('###')[2];
                    let time = messageObject.split('###')[3].split('.')[0];
                    time = Date.parse(time);
                    //this.renderStatus(time);
                }
            }

            this.setState({
                status,
                standing,
                showProgress: false
            });

            if (messageObject.split('###')[0] !== 'still alive' && appConfig.socket.name !== messageObject.split('###')[1]) {
                let message = messageObject.split('###')[1] + ': ' + messageObject.split('###')[0];
                //Alert.alert('Message: ', message)
                /*PushNotificationIOS.presentLocalNotification({
                    alertBody: 'Hello notification'
                });
                PushNotificationIOS.localNotificationSchedule({
                    //message: "New Message", // (required)
                    message: messageObject.split('###')[1] + ': ' + messageObject.split('###')[0],
                    date: new Date(Date.now() + (0 * 1000)) // in 60 secs
                });*/
            }
        };
    }

    componentDidMount() {
        PushNotificationIOS.checkPermissions((token) => {
            if (token.alert == 0) {
                PushNotificationIOS.requestPermissions();
            }
        });

        PushNotificationIOS.addEventListener('register', (token) => {
            Alert.alert('You are registered and the device token is: ', token)
        });

        PushNotificationIOS.addEventListener('notification', (notification) => {
            Alert.alert('You have received a new notification!', notification);
        });

        PushNotificationIOS.addEventListener('localNotification', (notification) => {
            Alert.alert('You have received a new notification!', notification);
        });

        PushNotificationIOS.addEventListener('registrationError', (notification) => {
            Alert.alert('You have received a new notification!', notification);
        });

        //this.getItems();
    }

    componentWillUnmount() {
        PushNotificationIOS.removeEventListener('register', (token) => {
        });
        PushNotificationIOS.removeEventListener('notification', (token) => {
        });
        PushNotificationIOS.removeEventListener('localNotification', (token) => {
        });
        PushNotificationIOS.removeEventListener('registrationError', (token) => {
        });
    }

    getItems() {
        this.setState({
            showProgress: true,
            serverError: false,
            resultsCount: 0,
            recordsCount: 15,
            positionY: 0,
            searchQuery: ''
        });

        fetch(appConfig.url + 'api/messages/get', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': appConfig.access_token
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    //dataSource: this.state.dataSource.cloneWithRows(responseData.sort(this.sort).slice(0, 15)),
                    messages: responseData.sort(this.sort).slice(0, 15),
                    resultsCount: responseData.length,
                    responseData: responseData,
                    filteredItems: responseData.sort(this.sort),
                    refreshing: false
                });
            })
            .catch((error) => {
                this.setState({
                    serverError: true
                });
                //window.appConfig.onLogOut();
            })
            .finally(() => {
                this.setState({
                    showProgress: false
                });
            });
    }

    sort(a, b) {
        let nameA = +a.id, nameB = +b.id;
        if (nameA < nameB) {
            return 1
        }
        if (nameA > nameB) {
            return -1
        }
        return 0;
    }

    goSend() {
        window.appConfig.onLogOut();
    }

    refreshData(event) {
        if (this.state.showProgress === true) {
            return;
        }

        if (event.nativeEvent.contentOffset.y <= -100) {
            this.setState({
                showProgress: true,
                resultsCount: 0,
                recordsCount: 25,
                positionY: 0,
                searchQuery: ''
            });

            setTimeout(() => {
                this.getItems();
            }, 300);
        }

        if (this.state.filteredItems === undefined) {
            //return;
        }

        let items, positionY, recordsCount;
        recordsCount = this.state.recordsCount;
        positionY = this.state.positionY;
        items = this.state.filteredItems.slice(0, recordsCount);

        if (event.nativeEvent.contentOffset.y >= positionY) {
            this.setState({
                messages: items,
                recordsCount: recordsCount + 10,
                positionY: positionY + 400
            });
        }
    }

    onChangeText(text) {
        this.setState({
            messageText: text
        })
    }

    refreshDataAndroid() {
        this.setState({
            showProgress: true,
            resultsCount: 0
        });

        this.getItems();
    }

    showMessages() {
        return this.state.messages.map((item) => {
            return (
                <ListItem
                    key={item.id}
                    item={item}
                />
            )
        })
    }

    render() {
        var errorCtrl, loader;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        if (this.state.showProgress) {
            loader = <View style={styles.loader}>
                <ActivityIndicator
                    size="large"
                    color="darkblue"
                    animating={true}
                />
            </View>;
        }

        return (
            <View style={styles.container}>
                <View style={{
                    flex: 1,
                    backgroundColor: 'whitesmoke',
                    borderColor: '#48BBEC',
                }}>
                    <ScrollView onScroll={this.refreshData.bind(this)} scrollEventThrottle={16}>
                        {loader}
                        {this.showMessages()}
                    </ScrollView>
                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'whitesmoke',
                    borderColor: '#48BBEC',
                    height: 170
                }}>
                    <View style={{
                        margin: 10,
                        marginTop: 10,
                        backgroundColor: 'darkblue',
                        borderColor: 'darkblue',
                        //borderColor: '#48BBEC',
                        //backgroundColor: '#48BBEC',
                        borderRadius: 15,
                        borderWidth: 1
                    }}>
                        <Text style={{
                            fontSize: 20,
                            textAlign: 'center',
                            margin: 10,
                            marginTop: 0,
                            //backgroundColor: '#48BBEC',
                            backgroundColor: 'darkblue',
                            width: this.state.width * .85,
                            color: 'white',
                            fontWeight: 'bold'
                        }}>
                            {this.state.plateNo}
                        </Text>
{/*                    <View>
                        <Text style={styles.error}>
                            {this.state.plateNo}
                        </Text>

                        <Text style={styles.error}>
                            {this.state.status}
                        </Text>

                        <Text style={styles.error}>
                            {this.state.standing}
                        </Text>*/}

                    </View>

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
            </View>
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
        //borderRadius: 5,
        //borderWidth: 3
        marginTop: 50

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

export default Chat;
