import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import StartUpForm from '../../../components/cvBitForms/StartUpForm'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const StartUpCreate = () => {
  const renderContent = () => {
    return <StartUpForm />
  }

  return renderContent()
}

StartUpCreate.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}></Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="Dashboard" />
  }
}

const styles = StyleSheet.create({
  heading: {
    color: '#ffff',
    fontSize: 22
  },
  bed: {
    backgroundColor: '#232936',
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  }
})

export default StartUpCreate
