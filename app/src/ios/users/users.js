'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Dimensions,
    Image,
    Alert
} from 'react-native';

import ListView from 'deprecated-react-native-listview';
import MenuDrawer from 'react-native-side-drawer';

/*GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
global.FormData = global.originalFormData ? global.originalFormData : global.FormData;*/

import UserDetails from './userDetails';

class Users extends Component {
    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            dataSource: ds.cloneWithRows([]),
            showProgress: true,
            serverError: false,
            resultsCount: 0,
            recordsCount: 25,
            positionY: 0,
            searchQuery: '',
            open: false
        };

        //this.getToken();
        this.getItems();
    }

    componentDidMount() {
        this.didFocusListener = this.props.navigation.addListener(
            'didFocus',
            () => {
                this.refreshComponent();
            },
        );
    }

    refreshComponent() {
        if (appConfig.users.refresh) {
            appConfig.users.refresh = false;

            this.setState({
                showProgress: true,
            });

            setTimeout(() => {
                this.getItems();
            }, 500);
        }
    }

    getToken() {
        console.log('xxxxxxxxxxxxx')
        var request = new XMLHttpRequest();
        var FD = new URLSearchParams();
        FD.append('grant_type', 'password');
        FD.append('username', 'manyvehicles@abona-erp.com');
        FD.append('password', '1234qwerQWER,.-');
        console.log(FD.toString())
        request.open('POST', 'https://213.144.11.162:10380/authentication', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');

        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                appConfig.access_token = JSON.parse(this.responseText).access_token;
                console.dir(JSON.parse(this.responseText).access_token);
                Alert.alert(JSON.parse(this.responseText).access_token);
                // If successful
            } else {
                // If fail
                //console.log(this.response);
            }
        };
        request.onerror = function (error) {
            console.log(error);
        };
        request.send(FD.toString());

        /*        $.ajax({
                    url: 'https://213.144.11.162:10380/authentication',
                    type: "POST",
                    data: 'grant_type=password&username=manyvehicles@abona-erp.com&password=1234qwerQWER,.-',
                    headers: {
                        'Accept': 'application/x-www-form-urlencoded',
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    success: function (data, textStatus) {
                        window.access_token = 'Bearer ' + data.access_token;
                    },
                    error: function () {
                        /!*appConfig.$emit('loaded', {});
                        appConfig.$emit('error', {});*!/
                    }
                });*/

        /*        var details = {
                    'username': 'manyvehicles@abona-erp.com',
                    'password': '1234qwerQWER,.-',
                    'grant_type': 'password'
                };

                var FD  = new URLSearchParams();
                FD.append('grant_type','password');
                FD.append('username','manyvehicles@abona-erp.com');
                FD.append('password','1234qwerQWER,.-');

                fetch('https://213.144.11.162:10380/authentication', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    body: FD

                })
                    .then(response => response.json())
                    .then((responseData) => {
                        Alert.alert(responseData)
                        console.log(responseData)
                    })
                    .catch(() => {
                        Alert.alert('errr')
                        this.setState({
                            serverError: true,
                        });
                    })*/
    }

    getItems0() {
        fetch('https://213.144.11.162:10380/api/Positions/GetAllPositions', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer AQAAANCMnd8BFdERjHoAwE_Cl-sBAAAAUI8WpvRhK0OYDreqtcd9ywAAAAACAAAAAAAQZgAAAAEAACAAAAC5a-zO5yMD022PaUWJ1fFWQ6OXdAOHJxj3c261VqcfzQAAAAAOgAAAAAIAACAAAACkBC5fMiH9I1uGT_8Ua1xq2BjuonftT7q6NsdBQxPXqSABAABqiVMqXS6qTZz9P7QAyiZCedUak-EsblsAdmYkLmg-jGtG4uw6Xh_MYzhX-w0EABpgPvd3st1GzuBBeEmKqhDdbAghhMKqjTiF9n-qSnzYAKf5kdjXDcx6s05fi7ytUNWKj-j8SJBZyE-SNCs8-5EAReyskZXJ8Aa9dbPKeK3aqt2LDS-TgwfKLB0YyjUU8DvAeJ6HPvUYNvoXduIEjEGpOQtqVPdFLSLnkqxw06KFaB42YvXLJ7ELA4v31r7c5-y-b5RaU2EqxTalywI-i56UJQ6ZMJL1mmE_VqY5EjwcoIoQdzIRkjGcG_tc-OMwUUOE9NRt5dDCk2VgZZOC6MqaN_bEA9x2y7vMvSaY9MVCvN1-nL5J8rwjo7PisbTNXJ1AAAAADe5DcHisok4EVrKP-9EPr14ama1jnCqioUV3h_Gmpffco6AwLLYiJSsHAgwuDxt8Wa_IX-Pyf2QNP0-j8JHFrw'
            }
        })
            .then((responseData) => {
                Alert.alert('cool')
                /*this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.data.slice(0, 25)),
                    resultsCount: responseData.data.length,
                    responseData: responseData.data,
                    filteredItems: responseData.data,
                });*/
            })
            .catch((err) => {
                Alert.alert('xxxx')
                this.setState({
                    serverError: true,
                });
            })
            .finally(() => {
                this.setState({
                    showProgress: false,
                });
            });
    }

    getItems() {
        fetch('http://dummy.restapiexample.com/api/v1/employees', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': appConfig.access_token,
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.slice(0, 25)),
                    resultsCount: responseData.length,
                    responseData: responseData,
                    filteredItems: responseData,
                });
            })
            .catch(() => {
                this.setState({
                    serverError: true,
                });
            })
            .finally(() => {
                this.setState({
                    showProgress: false,
                });
            });
    }

    sort(a, b) {
        let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }

    showDetails(rowData) {
        appConfig.item = rowData;
        this.props.navigation.navigate('UserDetails');
    }

    addItem() {
        this.props.navigation.navigate('UserAdd');
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight
                onPress={() => this.showDetails(rowData)}
                underlayColor='#ddd'>
                <View style={styles.row}>
                    <Text style={styles.rowText}>
                        {rowData.id} - {rowData.employee_name} - {rowData.employee_age} - {rowData.employee_salary}
                    </Text>
                </View>
            </TouchableHighlight>
        );
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
                searchQuery: '',
            });

            setTimeout(() => {
                this.getItems();
            }, 300);
        }

        if (this.state.filteredItems === undefined) {
            return;
        }

        let items, positionY, recordsCount;
        recordsCount = this.state.recordsCount;
        positionY = this.state.positionY;
        items = this.state.filteredItems.slice(0, recordsCount);

        if (event.nativeEvent.contentOffset.y >= positionY - 10) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                recordsCount: recordsCount + 10,
                positionY: positionY + 500,
            });
        }
    }

    onChangeText(text) {
        if (this.state.dataSource === undefined) {
            return;
        }

        let arr = [].concat(this.state.responseData);
        let items = arr.filter((el) => el.employee_name.toLowerCase().indexOf(text.toLowerCase()) !== -1);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items),
            resultsCount: items.length,
            filteredItems: items,
            searchQuery: text,
        });
    }

    clearSearchQuery() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.responseData.slice(0, 25)),
            resultsCount: this.state.responseData.length,
            filteredItems: this.state.responseData,
            positionY: 0,
            recordsCount: 25,
            searchQuery: '',
        });
    }

    onMenu() {
        this.setState({open: true});
    }

    menuClose() {
        this.setState({open: false});
    }

    menuAddItem() {
        this.setState({open: false});
        this.addItem();
    }

    getItemsMenu() {
        this.setState({
            showProgress: true,
            resultsCount: 0,
        });
        this.getItems();
        this.setState({open: false});
    }

    drawerContent() {
        return (
            <View style={{flex: 1, backgroundColor: 'black', marginTop: 50}}>
                <Text style={styles.layoutText} onPress={() => this.menuClose()}>
                    Rest API Demo
                </Text>

                <TouchableHighlight
                    onPress={() => this.getItemsMenu()}
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                        Reload
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => this.menuAddItem()}
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                        New
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => this.menuClose()}
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                        Close
                    </Text>
                </TouchableHighlight>

            </View>
        );
    }

    render() {
        let errorCtrl, loader, image;

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

        if (this.state.searchQuery.length > 0) {
            image = <Image
                source={require('../../../img/cancel.png')}
                style={{
                    height: 20,
                    width: 20,
                    marginTop: 10,
                }}
            />;
        }

        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <MenuDrawer
                        open={this.state.open}
                        drawerContent={this.drawerContent()}
                        drawerPercentage={50}
                        animationTime={50}
                        overlay={true}
                        opacity={0.3}>

                        <View style={styles.header}>
                            <View>
                                <TouchableWithoutFeedback onPress={this.onMenu.bind(this)}>
                                    <View>
                                        <Image
                                            style={styles.menu}
                                            source={require('../../../img/menu.png')}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback>
                                    <View>
                                        <Text style={styles.textLarge}>
                                            Rest API Demo
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableHighlight
                                    onPress={() => this.addItem()}
                                    underlayColor='darkblue'>
                                    <View>
                                        <Text style={styles.textSmall}>
                                            New
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>

                        <View style={styles.iconForm}>
                            <View>
                                <TextInput
                                    onChangeText={this.onChangeText.bind(this)}
                                    style={styles.searchLarge}
                                    value={this.state.searchQuery}
                                    placeholder="Search here">
                                </TextInput>
                            </View>
                            <View style={styles.searchSmall}>
                                <TouchableWithoutFeedback
                                    onPress={() => this.clearSearchQuery()}>
                                    <View>
                                        {image}
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>

                        {errorCtrl}

                        {loader}

                        <ScrollView
                            onScroll={this.refreshData.bind(this)} scrollEventThrottle={16}>
                            <ListView
                                style={styles.scroll}
                                enableEmptySections={true}
                                dataSource={this.state.dataSource}
                                renderRow={this.renderRow.bind(this)}
                            />
                        </ScrollView>
                    </MenuDrawer>
                </View>

                <View>
                    <TouchableWithoutFeedback
                        onPress={() => this.clearSearchQuery()}>
                        <View>
                            <Text style={styles.countFooter}>
                                Records: {this.state.resultsCount}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    iconForm: {
        flexDirection: 'row',
        borderColor: 'darkblue',
        borderWidth: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'darkblue',
        borderWidth: 0,
        borderColor: 'whitesmoke',
        marginTop: 50,
    },
    searchLarge: {
        height: 45,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 0,
        width: Dimensions.get('window').width * .90,
    },
    searchSmall: {
        height: 45,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'white',
        marginLeft: -5,
        paddingLeft: 5,
        width: Dimensions.get('window').width * .10,
    },
    textSmall: {
        fontSize: 16,
        textAlign: 'center',
        margin: 14,
        fontWeight: 'bold',
        color: 'white',
    },
    textLarge: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        marginTop: 12,
        paddingLeft: 0,
        fontWeight: 'bold',
        color: 'white',
    },
    textInput: {
        height: 45,
        marginTop: 0,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'lightgray',
        borderRadius: 0,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
    },
    rowText: {
        backgroundColor: '#fff',
        color: 'black',
        fontWeight: 'bold',
    },
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        backgroundColor: 'darkblue',
        color: 'white',
        fontWeight: 'bold',
        //marginTop: 15
    },
    loader: {
        justifyContent: 'center',
        height: 100,
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center',
    },
    menu: {
        alignItems: 'center',
        margin: 14,
        marginTop: 16,
    },
    layoutText: {
        color: 'white',
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        padding: 15,
        marginTop: 20,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'darkblue'
    },
});

export default Users;
