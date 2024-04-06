import React, { useState } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import SecondEduEditForm from '../../../components/cvBitForms/SecondEduCreateEditForm'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const SecondEduEditScreen = ({ navigation }) => {
  const [id] = useState(navigation.getParam('id'))
  const [additionalInfo] = useState(navigation.getParam('additionalInfo'))
  const [endDate] = useState(navigation.getParam('endDate'))
  const [startDate] = useState(navigation.getParam('startDate'))
  const [schoolName] = useState(navigation.getParam('schoolName'))
  const [subjects] = useState(navigation.getParam('subjects'))

  const renderContent = () => {
    return (
      <SecondEduEditForm
        formType="edit"
        id={id}
        incomingAdditionalInfo={additionalInfo}
        incomingEndDate={endDate}
        incomingStartDate={startDate}
        incomingSchoolName={schoolName}
        incomingSubjects={subjects}
      />
    )
  }

  return renderContent()
}

SecondEduEditScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>edit secondary education</Text>,
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

export default SecondEduEditScreen
