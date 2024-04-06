import React from 'react'
import { StyleSheet, Text, Platform } from 'react-native'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'
import ContactInfoCreateForm from '../../../components/cvBitForms/ContactInfoCreateEditForm'

const ContactInfoCreateScreen = () => {
  const renderContent = () => {
    return <ContactInfoCreateForm formType="create" />
  }

  return renderContent()
}

ContactInfoCreateScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>add contact information</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="ContactInfo" />
  }
}

const styles = StyleSheet.create({
  heading: {
    color: '#ffff',
    fontSize: 22
  }
})

export default ContactInfoCreateScreen
