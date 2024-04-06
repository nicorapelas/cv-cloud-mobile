import React, { useState } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import ReferenceEditForm from '../../../components/cvBitForms/ReferenceCreateEditForm'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const ReferenceEditScreen = ({ navigation }) => {
  const [id] = useState(navigation.getParam('id'))
  const [name] = useState(navigation.getParam('name'))
  const [company] = useState(navigation.getParam('company'))
  const [phone] = useState(navigation.getParam('phone'))
  const [email] = useState(navigation.getParam('email'))

  const renderContent = () => {
    return (
      <ReferenceEditForm
        formType="edit"
        id={id}
        incomingName={name}
        incomingCompany={company}
        incomingPhone={phone}
        incomingEmail={email}
      />
    )
  }

  return renderContent()
}

ReferenceEditScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>edit reference</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="Reference" />
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

export default ReferenceEditScreen
