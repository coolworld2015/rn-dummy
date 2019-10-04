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
    //appConfig.onLogOut();
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
    Dummy: UsersTab,
    Quit: Logout,
  },
  {
    tabBarPosition: 'top',
    tabBarOptions,
  },
);

export default createAppContainer(TabNavigator);
