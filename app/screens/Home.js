import React from "react";
import { ScrollView, Text, Linking, View } from "react-native";
import { Card, Button } from "react-native-elements";
import { getUsers } from '../auth';

class Home extends React.Component {

  state = {
    users:[]
  }

  componentWillMount() {
    getUsers().then(res => {
      this.setState({users: res})
    })
  }

  render() {
    const { users } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          {users.map(({ firstName, picUrl, id, key }) => (
            <Card title={`CARD ${id}`} image={{uri:picUrl}} key={id}>
              <Text style={{ marginBottom: 10 }}>
                Photo by {firstName}.
              </Text>
            </Card>
          ))}
        </ScrollView>
      </View>
    )
  }
}

export default Home
