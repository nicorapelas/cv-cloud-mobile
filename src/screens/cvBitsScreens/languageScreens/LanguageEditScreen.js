import React, { useContext, useState } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import LanguageEditForm from '../../../components/cvBitForms/LanguageCreateEditForm'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import { Context as LanguageContext } from '../../../context/LanguageContext'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const LanguageEditScreen = ({ navigation }) => {
  const [id, setId] = useState(navigation.getParam('id'))
  const [language, setLanguage] = useState(navigation.getParam('language'))

  const {
    state: { loading }
  } = useContext(LanguageContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return (
      <LanguageEditForm bit="language" id={id} incomingLanguage={language} />
    )
  }

  return renderContent()
}

LanguageEditScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>edit language</Text>,
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

export default LanguageEditScreen
