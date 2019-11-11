import React, {Component} from 'react';

import {
    createStackNavigator,
    createAppContainer,
    createMaterialTopTabNavigator,
} from 'react-navigation';

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

class Logout extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.didFocusListener = this.props.navigation.addListener(
            'didFocus',
            () => {
                this.quitComponent();
            },
        );
    }

    quitComponent() {
        appConfig.onLogOut();
    }

    render() {
        return null;
    }
}

const tabBarOptions = {
    style: {
        backgroundColor: 'white',
    },
    labelStyle: {
        color: 'darkblue',
        fontWeight: 'bold',
    },
    upperCaseLabel: false,
    indicatorStyle: {backgroundColor: 'darkblue'},
};

const TabNavigator = createMaterialTopTabNavigator({
        Driver: DriverTab,
        Map: MapTab,
        Demo: UsersTab,
        Chat: ChatTab,
        Quit: Logout,
    },
    {
        tabBarPosition: 'top',
        tabBarOptions,
    },
);

export default createAppContainer(TabNavigator);
