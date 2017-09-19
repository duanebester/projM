import React from 'react';
import { View, Text } from 'react-native';
export const Title = (props) => (
  <View style={{flex: 1, alignItems:'center'}}>
    <Text style={{color:'#fff', fontSize:28}}>
      {props.children}
    </Text>
  </View>
)
