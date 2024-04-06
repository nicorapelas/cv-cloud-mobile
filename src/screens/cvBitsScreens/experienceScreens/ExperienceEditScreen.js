import React, { useState } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import ExperienceEditForm from '../../../components/cvBitForms/ExperienceCreateEditForm'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const ExperienceEditScreen = ({ navigation }) => {
  const [id] = useState(navigation.getParam('id'))
  const [title] = useState(navigation.getParam('title'))
  const [description] = useState(navigation.getParam('description'))

  const renderContent = () => {
    return (
      <ExperienceEditForm
        formType="edit"
        id={id}
        incomingDescription={description}
        incomingTitle={title}
      />
    )
  }

  return renderContent()
}

ExperienceEditScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>edit work experience</Text>,
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

export default ExperienceEditScreen
