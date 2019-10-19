'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ListView,
    ScrollView,
    ActivityIndicator,
    TabBarIOS,
    NavigatorIOS,
    TextInput,
    Switch,
    MapView,

} from 'react-native';

import { WebView } from 'react-native-webview';

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            html: 'https://www.google.com.ua/maps/place/%D0%9F%D0%B5%D1%80%D0%BB%D0%B8%D0%BD%D0%B0+%D0%A0%D0%B5%D0%B7%D0%BE%D1%80%D1%82/@49.5443458,31.8516129,14z/data=!4m5!3m4!1s0x0:0xef0027af01f2c984!8m2!3d49.5443458!4d31.8691224?hl=ru'
        };

        //window.navigator.geolocation.requestAuthorization();
    }

    render() {
         var html = `
        <!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <title>Google Maps Multiple Markers</title>
    <script src="http://maps.google.com/maps/api/js?sensor=false"
            type="text/javascript"></script>
</head>
<body style="background-color: black; color: white">
<div>
    <center>
        <h5>PERLYNA RESORT</h5>

        <!--   — новый культурно-оздоровительный комплекс
            с гостиницей и ресторанами в пос. Сокирна, Черкасский район. -->
        </h5>
        <img src="resort2_1.jpg" style="width: 100%; height: 100px;">

        <hr>
        <button onClick="getPos()" style="width: 300px; height: 55px; font-size: 20px; font-weight: bold">Get current
            position
        </button>
        <hr>
        <button onClick="showRoutes()" style="width: 300px; height: 55px; font-size: 20px; font-weight: bold">Draw lines
        </button>
    </center>
</div>
<hr>

<div id="map" style="width: 100%; height: 350px; float: left; margin-right: 25px; color: black">
</div>

<script type="text/javascript">

    var locations = [
        ['<div style1="margin: 0px; background: #00FFFF; "><img src="resort2_1.jpg" style="margin: 15px; width: 200px"><br><b>Перлина Резорт</b></div>', 49.5443047, 31.8691583, 1],
        ['А это - ЛЕС', 49.5444189, 31.8661804, 2],
        ['А это - <b>ПЛАВНИ</b>', 49.5489871, 31.8649385, 3]
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: new google.maps.LatLng(49.5443047, 31.8691583),
        mapTypeId: google.maps.MapTypeId.ROADMAP
        //mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, marker1, i;

    var goldStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'yellow',
        fillOpacity: 0.8,
        scale: 2,
        strokeColor: 'gold',
        strokeWeight: 14
    };

    var symbolOne = {
        path: 'M -2,0 0,-2 2,0 0,2 z',
        strokeColor: 'gold',
        fillColor: 'gold',
        fillOpacity: 1,
        scale: 3,
    };

    var image = 'no-img.png';

    var flightPlanCoordinates = [
        {lat: 49.5443047, lng: 31.8691583},
        {lat: 49.5444189, lng: 31.8661804},
        {lat: 49.5489871, lng: 31.8649385}
    ];

    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    var flightPath1 = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 0,
        strokeWeight: 2
    });

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            //icon: {
                //path: google.maps.SymbolPath.CIRCLE,
                //path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                //path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                //scale: 3
            //},
            //draggable: true,
            //animation: google.maps.Animation.BOUNCE,
            //icon: image,
            //icon: symbolOne,
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
        if (marker1) {
            marker1.setMap(null);
        }

        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        map.setCenter(new google.maps.LatLng(lat, lng));
        marker1 = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            draggable: true,
            animation: google.maps.Animation.BOUNCE,
            icon: symbolOne,
            map: map
        });
    }

    function showRoutes() {
        flightPath.setMap(map);
        //flightPath1.setMap(map);
    }
</script>
         `

        return (
            <WebView
                source={{html: html}}
                //style={{marginTop: 100}}
                //geolocationEnabled={true}
                //onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest.bind(this)}
                //renderLoading={this.onShouldStartLoadWithRequest.bind(this)}
                //source={{html:'<div>Cool<div>'}}
                //source={{html:html}}
            />
        )
    }
}

const styles = StyleSheet.create({});

export default Map;
