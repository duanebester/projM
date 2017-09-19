import React from "react";
import { View, Text, TextInput } from "react-native";
import { Card, Button, FormLabel } from "react-native-elements";
import { onSignIn } from "../../auth";
import BaseScreen from '../BaseScreen';
import { FormStyle } from '../../styles';
import { Title } from '../../components/Inputs';

class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
    displayNextButton: false,
    displayBackButton: true
  };

  handleEmailUpdate = email => {
    this.setState({email: email});
  }

  handlePasswordUpdate = password => {
    this.setState({password: password});
  }

  handleSubmit = () => {
    const { email, password } = this.state;
    if(email.length === 0) {
      alert('Please enter an email!')
      return;
    }
    if(password.length === 0) {
      alert('Please enter a password!')
      return;
    }
    onSignIn(email.toLowerCase(), password)
    .then((e) => {
      if(e) {
        this.props.navigation.navigate("SignedIn")
      } else {
        alert('Could not login!');
      }
    }).catch((e) => {
      alert('Could not login!');
    });
  }

  render() {
    const { email, password } = this.state;
    const enableSubmit = email.length > 0 && password.length > 0;
    return (
      <BaseScreen
        navigation={this.props.navigation}
        animateMain={true}
        handleNextNav={this.handleSubmit}
        displayBackButton={this.state.displayBackButton}
        displayNextButton={enableSubmit}>
        <View style={{flex:1}}>
          <View style={{flex:2,
            flexDirection:'row',
            alignItems:'flex-end',
            justifyContent:'center'}}>
            <Title>Sign In</Title>
          </View>
          <View style={{flex: 4,
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center'}}>
          <FormLabel
            labelStyle={FormStyle.labelStyle}>Email</FormLabel>
          <TextInput
            value={this.state.email}
            onChangeText={(email) => {this.handleEmailUpdate(email)}}
            secureTextEntry={false}
            keyboardType={this.props.keyboardType || 'email-address'}
            style={FormStyle.inputStyle}/>
          <FormLabel
            labelStyle={FormStyle.labelStyle}>Password</FormLabel>
          <TextInput
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(pw) => {this.handlePasswordUpdate(pw)}}
            keyboardType={this.props.keyboardType || 'email-address'}
            style={FormStyle.inputStyle}/>
          </View>
          <View style={{flex:3}}/>
        </View>
      </BaseScreen>
    )
  }
};

export default SignIn
