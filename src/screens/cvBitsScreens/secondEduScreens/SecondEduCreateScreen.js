import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import SecondEduForm from '../../../components/cvBitForms/SecondEduCreateEditForm'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const SeconEduCreateScreen = () => {
  const renderContent = () => {
    return <SecondEduForm formType="create" />
  }

  return renderContent()
}

SeconEduCreateScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>add secondary education</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="SecondEdu" />
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

export default SeconEduCreateScreen
