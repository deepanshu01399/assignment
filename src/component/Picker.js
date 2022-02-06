import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ModalPicker from 'react-native-modal-selector'

const Picker = (props) => {
  console.log("props:::",props)
  return (
    <ModalPicker
      data={props.data}
      cancelText="Cancel"
      backdropPressToClose={true}
      animationType="fade"
      //optionTextStyle={{backgroundColor:"red"}}
      //style={{backgroundColor:"white",color:'cyan'}}
      overlayStyle={{
        justifyContent: 'center',
        
      }}
      disabled={props?.disabled ?? false}
      onChange={option => {
        props.onChange(option);
      }}>
      {props.children}
    </ModalPicker>
  );
};

export default Picker;
