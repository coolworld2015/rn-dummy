'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Dimensions,
    Image, ScrollView, ActivityIndicator,
} from 'react-native';

import {WebView} from 'react-native-webview';
import MenuDrawer from 'react-native-side-drawer';

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            key: 0,
            showProgress: true,
            locationsList: '',
            position: '',
            open: false
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                showProgress: false,
            });
        }, 300);
    }

    refreshData(event) {
        if (this.state.showProgress === true) {
            return;
        }

        if (event.nativeEvent.contentOffset.y <= -50) {
            this.setState({
                showProgress: true,
                resultsCount: 0,
                recordsCount: 25,
                positionY: 0,
                searchQuery: '',
            });

            setTimeout(() => {
                this.mapReload();
            }, 300);
        }
    }

    mapReload() {
        this.setState({
            showProgress: true,
            key: this.state.key + 1,
            locationsList: `
            ['Point1', 49.093086, 8.533068, 1],
            ['Point2', 49.147995, 8.559998, 2],
            ['Point3', 49.116544, 8.551161, 3],
            ['Point4', 49.166744, 8.551161, 4],
            ['Point5', 49.176844, 8.551161, 5]`
        });

        setTimeout(() => {
            this.setState({
                showProgress: false,
            });
        }, 1000);
    }

    onMenu() {
        this.setState({open: true});
    }

    menuClose() {
        this.setState({open: false});
    }

    getItemsMenu() {
        this.mapReload();
        this.setState({open: false});
    }

    drawerContent() {
        return (
            <View style={{flex: 1, backgroundColor: 'black', marginTop: 0}}>
                <Text style={styles.layoutText} onPress={() => this.menuClose()}>
                    Google Maps API Demo
                </Text>

                <TouchableHighlight
                    onPress={() => this.getItemsMenu()}
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                        Reload
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

        var html = `
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <title>Google Maps Multiple Markers - ${this.state.locationsList}</title>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDcEkMFV_WyhNdZrr8VLaCYOw4FP75u748"></script>
</head>
<div>
        <button onClick="getPos()" style="border-radius: 10px; width: 70px; height: 45px; font-size: 12px; font-weight: bold; position: absolute; top: 10px; right: 5px; z-index: 100">Get 
        </button>

        <button onClick="showRoutes()" style="border-radius: 10px; width: 70px; height: 45px; font-size: 12px; font-weight: bold; position: absolute; top: 10px; right: 75px; z-index: 100">Set
        </button>
</div>


<div id="map" style="width: 100%; height: 600px;">
    ${this.state.key}
</div>

<script type="text/javascript">
    var locations = [${this.state.locationsList}];
    
    var symbolOne = {
                    path: 'M -2,0 0,-2 2,0 0,2 z',
                    strokeColor: 'gold',
                    fillColor: 'gold',
                    fillOpacity: 1,
                    scale: 3,
                };
    
    var image = 'data:image/png;base64,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';
    
    var flightPath = new google.maps.Polyline({
        path: [
            {lat: 49.093086, lng: 8.533068},
            {lat: 49.106580, lng: 8.544306},
            {lat: 49.116544, lng: 8.551161},
            {lat: 49.128808, lng: 8.550718},
            {lat: 49.133488, lng: 8.551667},
            {lat: 49.147995, lng: 8.559998},
        ],
        geodesic: true,
        strokeColor: '#01579B',
        strokeOpacity: 1.0,
        strokeWeight: 6
    });      
    
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: new google.maps.LatLng(49.124966, 8.552490),
        mapTypeId: google.maps.MapTypeId.ROADMAP
        //mapTypeId: google.maps.MapTypeId.SATELLITE
    });
    
     marker = new google.maps.Marker({
        position: new google.maps.LatLng(49.124966, 8.552490),
        draggable: true,
        animation: google.maps.Animation.BOUNCE,
        icon: symbolOne,
        map: map
    });    
    
     marker = new google.maps.Marker({
        position: new google.maps.LatLng(49.124888, 8.552490),
        draggable: true,
        icon: image,
        map: map
    });
    
    var infowindow = new google.maps.InfoWindow();

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }

    function getPos() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, onMapError, {
                    maximumAge: 300000,
                    timeout: 5000,
                    enableHighAccuracy: true
                });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }
    
    function onMapError(error) {
        alert('code: ' + error.code + '\\n' +
            'message: ' + error.message + '\\n');
    }
    
    function showPosition(position) {
        if (marker) {
            marker.setMap(null);
        }

        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        map.setCenter(new google.maps.LatLng(lat, lng));
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            draggable: true,
            //animation: google.maps.Animation.BOUNCE,
            icon: image,
            map: map
        });
    }

    function showRoutes() {
        flightPath.setMap(map);
    }
</script>`;

        let loader;

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
                                        Google Maps API Demo
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

                    {loader}

                    <WebView
                        source={{html: html}}
                        style={{
                            backgroundColor: 'white'
                        }}
                        geolocationEnabled={true}
                    />
                </MenuDrawer>
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
    iconForm: {
        flexDirection: 'row',
        borderColor: 'darkblue',
        borderWidth: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'darkblue',
        //borderTopWidth: 1,
        borderColor: 'white',
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

export default Map;
