import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import TertEduForm from '../../../components/cvBitForms/TertEduCreateEditForm'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const TertEduCreateScreen = () => {
  const renderContent = () => {
    return <TertEduForm formType="create" />
  }

  return renderContent()
}

TertEduCreateScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>add tertiary education</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="TertEdu" />
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

export default TertEduCreateScreen
