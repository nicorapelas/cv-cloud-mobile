import React, { useState } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import EmployHistoryEditForm from '../../../components/cvBitForms/EmployHistoryCreateEditForm'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const EmployHistoryEditScreen = ({ navigation }) => {
  const [id] = useState(navigation.getParam('id'))
  const [description] = useState(navigation.getParam('description'))
  const [endDate] = useState(navigation.getParam('endDate'))
  const [startDate] = useState(navigation.getParam('startDate'))
  const [company] = useState(navigation.getParam('company'))
  const [position] = useState(navigation.getParam('position'))

  const renderContent = () => {
    return (
      <EmployHistoryEditForm
        formType="edit"
        id={id}
        incomingDescription={description}
        incomingEndDate={endDate}
        incomingStartDate={startDate}
        incomingCompany={company}
        incomingPosition={position}
      />
    )
  }

  return renderContent()
}

EmployHistoryEditScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>edit employment history</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="EmployHistory" />
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

export default EmployHistoryEditScreen
