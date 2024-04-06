import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import ExperienceForm from '../../../components/cvBitForms/ExperienceCreateEditForm'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const ExperienceCreateScreen = () => {
  const renderContent = () => {
    return <ExperienceForm />
  }

  return renderContent()
}

ExperienceCreateScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>add work experience</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="Experience" />
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

export default ExperienceCreateScreen
