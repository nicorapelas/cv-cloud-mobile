import React, { useContext } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import { Context as LanguageContext } from '../../../context/LanguageContext'
import LanguageCreateForm from '../../../components/cvBitForms/LanguageCreateEditForm'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const LanguageCreateScreen = () => {
  const {
    state: { loading }
  } = useContext(LanguageContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <LanguageCreateForm bit="language" formType="create" />
  }

  return renderContent()
}

LanguageCreateScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>add languge</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="Language" />
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

export default LanguageCreateScreen
