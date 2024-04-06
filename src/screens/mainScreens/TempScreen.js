import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'

import OptionsPicker from '../../components/optionsPicker/OptionsPicker'

const TempScreen = ({ navigation }) => {
  const renderContent = () => {
    return (
      <View>
        <Text>Temp Screeen</Text>
        <OptionsPicker
          incomingOption={null}
          buttonText="province"
          bit="province"
        />
      </View>
    )
  }

  return renderContent()
}

TempScreen.navigationOptions = () => {
  return {
    title: 'Temp',
    tabBarOptions: {
      style: {
        backgroundColor: '#232936',
      },
      tabStyle: {
        backgroundColor: '#232936',
      },
      labelStyle: {
        fontSize: 16,
        paddingBottom: Platform.OS === 'android' ? 13 : 5,
      },
      inactiveTintColor: '#278ACD',
      activeTintColor: '#F9B321',
    },
  }
}

const styles = StyleSheet.create({
  bed: {
    backgroundColor: '#232936',
    paddingTop: Platform.OS === 'ios' ? 12 : 0,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
  },
  header: {
    color: '#ffff',
    alignSelf: 'center',
    marginTop: 20,
  },
  yearPickerHeader: {
    color: '#ffff',
    alignSelf: 'center',
    fontSize: 22,
    fontFamily: 'sourceSansProExtraLight',
  },
})

export default TempScreen
