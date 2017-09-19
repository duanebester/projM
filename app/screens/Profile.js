import React from "react";
import { View } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { onSignOut, getUserInfo } from "../auth";

class Profile extends React.Component {

  state = {
    userInfo: {
      firstName: '',
      lastName:''
    }
  }

  componentWillMount() {
    getUserInfo().then(res => {
      console.log(`User Info ${res}`);
      this.setState({userInfo:res})
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    let { navigation } = this.props;
    const { userInfo } = this.state;
    const name = userInfo.firstName + ' ' + userInfo.lastName;
    const initials = userInfo.firstName.substring(0,1)+userInfo.lastName.substring(0,1)
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card title={name}>
          <View
            style={{
              backgroundColor: "#bcbec1",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: 40,
              alignSelf: "center",
              marginBottom: 20
            }}
          >
            <Text style={{ color: "white", fontSize: 28 }}>{initials}</Text>
          </View>
          <Button
            backgroundColor="#03A9F4"
            title="SIGN OUT"
            onPress={() => onSignOut().then(() => this.props.navigation.navigate("SignedOut"))}
          />
        </Card>
      </View>
    );
  }
}

export default Profile
