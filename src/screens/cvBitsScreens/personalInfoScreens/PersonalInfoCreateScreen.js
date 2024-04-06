import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import PersonalInfoCreateForm from '../../../components/cvBitForms/PersonalInfoCreateEditForm'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const PersonalInfoCreateScreen = () => {
  const renderContent = () => {
    return <PersonalInfoCreateForm formType="create" />
  }

  return renderContent()
}

PersonalInfoCreateScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>add personal information</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="PersonalInfo" />
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

export default PersonalInfoCreateScreen
