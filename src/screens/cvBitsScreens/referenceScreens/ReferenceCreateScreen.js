import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import ReferenceForm from '../../../components/cvBitForms/ReferenceCreateEditForm'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const ReferenceCreateScreen = () => {
  const renderContent = () => {
    return <ReferenceForm formType="create" />
  }

  return renderContent()
}

ReferenceCreateScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>add reference</Text>,
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

export default ReferenceCreateScreen
