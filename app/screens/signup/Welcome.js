import React from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import { Icon, Button, FormLabel, CheckBox } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import BaseScreen from '../BaseScreen';
import { Title } from '../../components/Inputs';

class Welcome extends React.Component {
  state = {
    displayNextButton: false,
    displayBackButton: false
  }
  render() {
    return (
      <BaseScreen
        navigation={this.props.navigation}
        animateMain={true}
        nextButtonNavigate={this.props.next}
        displayBackButton={this.state.displayBackButton}
        displayNextButton={this.state.displayNextButton}>
        <View style={{flex:1}}>
          <View style={{flex:2,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center'}}>
            <Title>Welcome</Title>
          </View>
          <View style={{flex: 6}}>
            <View
              style={{
                flex: 2,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center'
              }}>
              <Button
                large
                onPress={() => {this.props.navigation.navigate("SignIn")}}
                buttonStyle={{backgroundColor:'#42b0f4',borderBottomWidth: 1,borderBottomColor:'white'}}
                title='Sign In' />
            </View>
            <View
              style={{
                flex: 2,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center'
              }}>
              <Button
                large
                onPress={() => {this.props.navigation.navigate("SignUp")}}
                buttonStyle={{backgroundColor:'#42b0f4',borderBottomWidth: 1,borderBottomColor:'white'}}
                title='Sign Up' />
            </View>
            <View style={{flex: 1}}/>
          </View>
        </View>
      </BaseScreen>
    )
  }
}

export default Welcome
