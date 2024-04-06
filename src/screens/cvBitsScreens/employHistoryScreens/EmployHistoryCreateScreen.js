import React from 'react'
import { StyleSheet, Text, Platform } from 'react-native'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'
import EmployHistoryCreateForm from '../../../components/cvBitForms/EmployHistoryCreateEditForm'

const EmployHistoryCreateScreen = () => {
  const renderContent = () => {
    return <EmployHistoryCreateForm formType="ceate" />
  }

  return renderContent()
}

EmployHistoryCreateScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>add emplyment history</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="EmployHistory" />
  }
}

const styles = StyleSheet.create({
  heading: {
    color: '#ffff',
    fontSize: 22
  }
})

export default EmployHistoryCreateScreen
