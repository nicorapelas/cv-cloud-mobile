import React, { useContext } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import { Context as PersonalSummaryContext } from '../../../context/PersonalSummaryContext'
import PersonalSummaryCreateForm from '../../../components/cvBitForms/PersonalSummaryCreateForm'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const PersonalSummaryCreateScreen = () => {
  const { state } = useContext(PersonalSummaryContext)

  const renderContent = () => {
    const { loading } = state
    if (loading || loading === null) return <LoaderFullScreen />
    return <PersonalSummaryCreateForm bit="personalSummary" />
  }

  return renderContent()
}

PersonalSummaryCreateScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>add personal summary</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="PersonalSummary" />
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

export default PersonalSummaryCreateScreen
