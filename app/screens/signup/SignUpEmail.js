import React from "react";
import { View, Text, TextInput} from "react-native";
import { Icon, Button, FormLabel, CheckBox } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import BaseScreen from '../BaseScreen';
import { FormStyle } from '../../styles';
import { Title } from '../../components/Inputs';

class SignUpEmail extends React.Component {
  state = {
    checked: false,
    male: false,
    female: false,
    email:'',
    password:'',
    displayNextButton: false,
    displayBackButton: true
  };

  handleGenderSelect = (gender) => {
    if(gender === 'male') {
      this.setState({male: true, female: false})
    } else {
      this.setState({male: false, female: true})
    }
    this.setState({displayNextButton:true})
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

  handleSubmit = () => {
    console.log(this.state);
    const { email, password, male, female } = this.state;

    if(email.length === 0){
      alert('Please enter your email address!');
      return;
    } else if(!this.validateEmail(email)) {
      alert('Please enter a valid email address!');
      return;
    }

    if(password.length === 0){
      alert('Please enter your password!');
      return;
    }

    if(male === false && female === false) {
      alert('Please select a gender!');
      return;
    }

    let gender = (female === true) ? 'female' : 'male'

    this.props.navigation.navigate("SignUpSecond",
      {
        email: email.toLowerCase(),
        password: password,
        gender: gender
      }
    );
  }

  render() {
    return (
      <BaseScreen
        navigation={this.props.navigation}
        animateMain={true}
        handleNextNav={this.handleSubmit}
        displayBackButton={this.state.displayBackButton}
        displayNextButton={this.state.displayNextButton}>
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
            labelStyle={FormStyle.labelStyle}>Email</FormLabel>
          <TextInput
            secureTextEntry={false}
            value={this.state.email}
            onChangeText={(email) => {this.setState({email})}}
            keyboardType={this.props.keyboardType || 'email-address'}
            style={FormStyle.inputStyle}/>
          <FormLabel
            labelStyle={FormStyle.labelStyle}>Password</FormLabel>
          <TextInput
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => {this.setState({password})}}
            keyboardType={this.props.keyboardType || 'email-address'}
            style={FormStyle.inputStyle}/>
            <CheckBox
              center
              title='Female'
              textStyle={{color:'#fff'}}
              containerStyle={{backgroundColor: '#42b0f4', borderWidth:0}}
              checkedColor='#fff'
              uncheckedColor='#fff'
              checkedIcon='times-circle-o'
              uncheckedIcon='circle-o'
              checked={this.state.female}
              onPress={() => {this.handleGenderSelect('female')}}
            />
            <CheckBox
              center
              title='Male'
              textStyle={{color:'#fff'}}
              containerStyle={{backgroundColor: '#42b0f4', borderWidth:0}}
              checkedColor='#fff'
              uncheckedColor='#fff'
              checkedIcon='times-circle-o'
              uncheckedIcon='circle-o'
              checked={this.state.male}
              onPress={() => {this.handleGenderSelect('male')}}
              />
          </View>
          <View style={{flex:1}}/>
        </View>
      </BaseScreen>
    )
  }
}

export default SignUpEmail
