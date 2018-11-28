import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome'
import { Sae } from 'react-native-textinput-effects'


export default class BillFieldComponent extends Component {
  render () {
    return (
      <Sae
        label={this.props.label}
        labelStyle={styles.fieldLabelStyle}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'#e6e6e6'}
        inputStyle={styles.fieldStyle}
        borderColor={'white'}
        editable={false}
        autoCapitalize={'none'}
        autoCorrect={false}
        value={this.props.value} />
    )
  }
}


const styles = StyleSheet.create({
    fieldLabelStyle: {
      color: '#b3b3b3'
    },
    fieldStyle: {
      color: 'gray'
    }
  })
