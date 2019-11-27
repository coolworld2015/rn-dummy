import React from 'react';
import {Image} from 'react-native';

import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import {StackViewStyleInterpolator} from 'react-navigation-stack';

import Users from '../users/users';
import UserDetails from '../users/userDetails';
import UserAdd from '../users/userAdd';

import Chat from '../chat/chat';

import Driver from '../yard/driver';

import Map from '../map/map';

const DriverTab = createStackNavigator({
        Driver,
    }, {
        headerMode: 'none',
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                return StackViewStyleInterpolator.forHorizontal(sceneProps);
            },
        }),
    },
);

const ChatTab = createStackNavigator({
        Chat,
    }, {
        headerMode: 'none',
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                return StackViewStyleInterpolator.forHorizontal(sceneProps);
            },
        }),
    },
);

const UsersTab = createStackNavigator({
        Users,
        UserDetails,
        UserAdd,
    }, {
        headerMode: 'none',
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                return StackViewStyleInterpolator.forHorizontal(sceneProps);
            },
        }),
    },
);

const MapTab = createStackNavigator({
        Map
    }, {
        headerMode: 'none',
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                return StackViewStyleInterpolator.forHorizontal(sceneProps);
            },
        }),
    },
);

class Quit extends React.Component {
    render() {
        window.appConfig.onLogOut();
        return null;
    }
}

const TabNavigator = createBottomTabNavigator({
        Users: UsersTab,
        //Driver: DriverTab,
        Demo: UsersTab,
        Map: MapTab,
        Quit: Quit
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;

                if (routeName === 'Driver') {
                    iconName = <Image
                        source={require('../../../img/yard.png')}
                        style={{
                            height: 25,
                            width: 25,
                            margin: 0,
                        }}
                    />;
                }
                if (routeName === 'Users') {
                    iconName = <Image
                        source={require('../../../img/users.png')}
                        style={{
                            height: 20,
                            width: 20,
                            margin: 0,
                        }}
                    />;
                }
                if (routeName === 'Demo') {
                    iconName = <Image
                        source={require('../../../img/clock.png')}
                        style={{
                            height: 20,
                            width: 20,
                            margin: 0,
                        }}
                    />;
                }
                if (routeName === 'Map') {
                    iconName = <Image
                        source={require('../../../img/images.png')}
                        style={{
                            height: 20,
                            width: 20,
                            margin: 0,
                        }}
                    />;
                }
                if (routeName === 'Quit') {
                    iconName = <Image
                        source={require('../../../img/log-out.png')}
                        style={{
                            height: 20,
                            width: 20,
                            margin: 0,
                        }}
                    />;
                }

                return iconName;
            },
        }),
    },
);

export default createAppContainer(TabNavigator);
