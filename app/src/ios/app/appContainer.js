import React from 'react';
import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation';

import Users from '../users/users';
import UserDetails from '../users/userDetails';
import UserAdd from '../users/userAdd';

import Chat from '../chat/chat';
//import Chat from '../chat/test';

import {Image} from 'react-native';

import {StackViewStyleInterpolator} from 'react-navigation-stack';

const ChatTab = createStackNavigator({
        Chat,
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

class Quit extends React.Component {
    render() {
        window.appConfig.onLogOut();
        return null;
    }
}

const TabNavigator = createBottomTabNavigator({
        Chat: ChatTab,
        Dummy: UsersTab,
        Quit: Quit
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;

                if (routeName === 'Chat') {
                    iconName = <Image
                        source={require('../../../img/users.png')}
                        style={{
                            height: 20,
                            width: 20,
                            margin: 0,
                        }}
                    />;
                }
                if (routeName === 'Dummy') {
                    iconName = <Image
                        source={require('../../../img/clock.png')}
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
