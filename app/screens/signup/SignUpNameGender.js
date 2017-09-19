import React from "react";
import { View, TextInput } from "react-native";
import { Card, Button, FormLabel, FormInput, Icon, CheckBox } from "react-native-elements";
import { onSignUp } from "../../auth";
import BaseScreen from '../BaseScreen';
import { FormStyle } from '../../styles';
import { Title } from '../../components/Inputs';

class SignUpNameGender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName:'',
      age: null,
      email: props.navigation.state.params.email,
      password: props.navigation.state.params.password,
      gender: props.navigation.state.params.gender,
      displayBackButton: true
    };
  }

  handleAgeChange = (age) => {
    if(age.length > 2) {
      age = age.substring(0,2);
    }
    if(age.length > 0) {
      let ageInt = parseInt(age);
      if(isNaN(ageInt)) {
        alert('Age needs to be a number!');
        return;
      } else {
        this.setState({age: age})
      }
    } else {
      this.setState({age: age})
    }
  }

  handleSubmit = () => {
    let { firstName, lastName, age, email, password, gender } = this.state;

    if(firstName.length === 0){
      alert('Please enter your first name!');
      return;
    }

    if(lastName.length === 0){
      alert('Please enter your last name!');
      return;
    }

    if(age === (0 || null || undefined)){
      alert('Please enter your age!');
      return;
    } else if(age < 10) {
      alert('You are not old enough!');
      return;
    }

    onSignUp(firstName, lastName, age, email, password, gender)
    .then((e) => {
      if(e) {
        this.props.navigation.navigate("SignedIn")
      } else {
        alert('Could not sign up!');
      }
    }).catch((e) => {
      alert('Could not sign up!');
    });
  }

  render() {
    const { firstName, lastName, age } = this.state;
    const enableSubmit = firstName.length > 0 && lastName.length > 0 && age && age.length > 0;
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
            alignItems:'center',
            justifyContent:'center'}}>
            <Title>Sign Up</Title>
          </View>
          <View style={{flex: 6,
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'flex-start'}}>
            <FormLabel
              labelStyle={FormStyle.labelStyle}>First Name</FormLabel>
            <TextInput
              secureTextEntry={false}
              value={this.state.firstName}
              onChangeText={(firstName) => {this.setState({firstName})}}
              keyboardType={this.props.keyboardType || 'email-address'}
              style={FormStyle.inputStyle}/>
            <FormLabel
              labelStyle={FormStyle.labelStyle}>Last Name</FormLabel>
            <TextInput
              secureTextEntry={false}
              value={this.state.lastName}
              onChangeText={(lastName) => {this.setState({lastName})}}
              keyboardType={this.props.keyboardType || 'email-address'}
              style={FormStyle.inputStyle}/>
            <FormLabel
              labelStyle={FormStyle.labelStyle}>Age</FormLabel>
            <TextInput
              value={this.state.age}
              onChangeText={this.handleAgeChange}
              keyboardType='numeric'
              style={FormStyle.inputStyle}/>
          </View>
          <View style={{flex:1}}/>
        </View>
      </BaseScreen>
    )
  }
}

export default SignUpNameGender
