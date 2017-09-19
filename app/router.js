import React from "react";
import { Platform, StatusBar } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import SignIn from "./screens/signup/SignIn";
import Welcome from './screens/signup/Welcome';
import SignUpEmail from "./screens/signup/SignUpEmail";
import SignUpNameGender from "./screens/signup/SignUpNameGender";
import Home from "./screens/Home";
import Profile from "./screens/Profile";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = StackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      headerStyle
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      headerStyle
    }
  },
  SignUp: {
    screen: SignUpEmail,
    navigationOptions: {
      headerStyle
    }
  },
  SignUpSecond: {
    screen: SignUpNameGender,
    navigationOptions: {
      headerStyle
    }
  }
}, {
  headerMode: 'none',
  mode: 'float'
});

export const SignedIn = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome name="home" size={30} color={tintColor} />
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome name="user" size={30} color={tintColor} />
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }
    }
  }
);


export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "float",
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
