import React from "react";
import { View, Text, TextInput} from "react-native";
import { Icon, Button, FormLabel } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

class BaseScreen extends React.Component {

  render() {
    let mainView =
      <View style={{flex:8}}>
        {this.props.children}
      </View>;
    if(this.props.animateMain) {
      mainView =
      <Animatable.View
        style={{flex:8}}
        delay={300}
        duration={1700}
        animation="fadeIn">
          {this.props.children}
      </Animatable.View>
    }
    return (
      <View style={{flex: 1, backgroundColor: '#42b0f4'}}>
        <View style={{flex: 12}}>
          <View style={{
            flex:1,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'flex-start',
            marginLeft:20,
            marginTop:20}}>
            {this.props.displayBackButton &&
              <Icon
                color='#fff'
                underlayColor='#42b0f4'
                size={18}
                name='arrow-left'
                type='simple-line-icon'
                onPress={() => this.props.navigation.goBack()}
              ></Icon>
            }
          </View>
          {mainView}
          <View style={{flex:1,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'flex-end',
            marginRight:20,
            marginBottom:20}}>
            {this.props.displayNextButton &&
              <Animatable.View
                animation="fadeInRight">
                <Animatable.View
                  delay={1000}
                  duration={8000}
                  animation="flash"
                  iterationCount="infinite">
                  <Icon
                    color='#42b0f4'
                    raised
                    size={18}
                    name='arrow-right'
                    type='simple-line-icon'
                    onPress={this.props.handleNextNav}
                  ></Icon>
                </Animatable.View>
              </Animatable.View>
            }
          </View>
        </View>
      </View>
    );
  }
}

export default BaseScreen
