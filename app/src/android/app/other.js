'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';

import ListView from 'deprecated-react-native-listview';

class Other extends Component {
    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: ds.cloneWithRows([
                {name: 'Driver', id: 1},
                {name: 'Map', id: 2},
                {name: 'Quit', id: 3},
            ]),
            showProgress: true,
            resultsCount: 9,
            recordsCount: 25,
            positionY: 0
        };
    }

    showDetails(rowData) {
        switch (rowData.id) {
            case 1:
                this.props.navigation.navigate('Driver');
                break;

            case 2:
                this.props.navigation.navigate('Map');
                break;

            case 3:
                window.appConfig.onLogOut();
                return null;
                break;
        }
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight
                onPress={() => this.showDetails(rowData)}
                underlayColor='#ddd'
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 20,
                    alignItems: 'center',
                    borderColor: '#D7D7D7',
                    borderBottomWidth: 1,
                    backgroundColor: '#fff'
                }}>
                    <Text style={{
                        backgroundColor: '#fff',
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 20
                    }}>
                        {rowData.name}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <TouchableWithoutFeedback>
                            <View>
                                <Text style={styles.textSmall}>
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        <TouchableWithoutFeedback>
                            <View>
                                <Text style={styles.textLarge}>
                                    Other
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        <TouchableWithoutFeedback>
                            <View>
                                <Text style={styles.textSmall}>
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <ScrollView>
                    <ListView
                        enableEmptySections={true}
                        style={{marginTop: 0, marginBottom: 0}}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </ScrollView>

                <View style={{marginBottom: 0}}>
                    <Text style={styles.countFooter}>
                        Records: {this.state.resultsCount}
                    </Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'darkblue',
        borderTopWidth: 1,
        borderColor: 'white',
        marginTop: 0,
        height: 53,
    },
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        //backgroundColor: '#48BBEC',
        backgroundColor: 'darkblue',
        color: 'white',
        fontWeight: 'bold'
    },
    textSmall: {
        fontSize: 16,
        textAlign: 'center',
        margin: 14,
        marginBottom: 10,
        fontWeight: 'bold',
        color: 'white'
    },
    textLarge: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
        paddingTop: 3,
        marginBottom: 13,
        marginRight: 0,
        fontWeight: 'bold',
        color: 'white'
    }
});

export default Other;
