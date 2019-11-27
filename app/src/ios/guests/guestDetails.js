'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    ActivityIndicator,
    TextInput,
    TouchableWithoutFeedback,
    Alert, Image
} from 'react-native';

class GuestDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: appConfig.item.id,
            title: appConfig.item.name,
            name: appConfig.item.name,
            date: appConfig.item.date,
            photo: appConfig.item.photo,
            host: appConfig.item.host,
            showProgress: false
        }
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        let pic;

        if (this.state.photo !== 'blank') {
            pic = <Image
                source={{uri: this.state.photo}}
                resizeMode='stretch'
                style={styles.img}
            />
        } else {
            pic = <Image
                source={require('../../../img/no-img.png')}
                resizeMode='stretch'
                style={styles.img1}
            />
        }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <TouchableHighlight
                            onPress={() => this.goBack()}
                            underlayColor='darkblue'>
                            <View>
                                <Text style={styles.textSmall}>
                                    Back
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableWithoutFeedback underlayColor='#ddd'>
                            <View>
                                <Text style={styles.textLarge}>
                                    {this.state.title}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        <TouchableHighlight
                            underlayColor='darkblue'>
                            <View>
                                <Text style={styles.textSmall}>
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>

                <ScrollView keyboardShouldPersistTaps='always'>
                    <View style={styles.inputBlock}>
                        <View style={{alignItems: 'center'}}>
                            {pic}
                        </View>

                        <TextInput
                            onChangeText={(text) => this.setState({
                                name: text,
                                invalidValue: false
                            })}
                            style={styles.formInputBold}
                            value={this.state.name}
                            placeholder="Login">
                        </TextInput>

                        <TextInput
                            onChangeText={(text) => this.setState({
                                pass: text,
                                invalidValue: false
                            })}
                            style={styles.loginInput}
                            value={this.state.date}
                            placeholder="Password">
                        </TextInput>

                        <TextInput
                            onChangeText={(text) => this.setState({
                                pass: text,
                                invalidValue: false
                            })}
                            style={styles.loginInput}
                            value={this.state.host}
                            placeholder="Password">
                        </TextInput>

                        <TouchableHighlight
                            onPress={() => this.goBack()}
                            style={styles.button}>
                            <Text style={styles.buttonText}>
                                Back
                            </Text>
                        </TouchableHighlight>

                        <ActivityIndicator
                            animating={this.state.showProgress}
                            size="large"
                            color="darkblue"
                            style={styles.loader}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'darkblue',
        borderWidth: 0,
        borderColor: 'whitesmoke',
        marginTop: 35
    },
    textSmall: {
        fontSize: 16,
        textAlign: 'center',
        margin: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    textLarge: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        marginTop: 12,
        marginRight: 40,
        fontWeight: 'bold',
        color: 'white'
    },
    formInputBold: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        color: 'black',
        fontWeight: 'bold'
    },
    loginInput: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        color: 'black'
    },
    formInputArea: {
        height: 100,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        color: 'black'
    },
    inputBlock: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-start'
    },
    button: {
        height: 50,
        backgroundColor: 'darkblue',
        alignSelf: 'stretch',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 20,
        textAlign: 'center'
    },
    img: {
        height: 250,
        width: 300,
        borderRadius: 10,
        margin: 10
    },
    img1: {
        height: 200,
        width: 200,
        borderRadius: 10,
        margin: 10
    },
});

export default GuestDetails;
