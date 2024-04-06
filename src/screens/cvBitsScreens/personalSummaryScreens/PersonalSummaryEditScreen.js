import React, { useContext, useState } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import PersonalSummaryEditForm from '../../../components/cvBitForms/AttributeInterestPersonalSummaryEditForm'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import { Context as PersonalSummaryContext } from '../../../context/PersonalSummaryContext'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const PersonalSummaryEditScreen = ({ navigation }) => {
  const [id, setId] = useState(navigation.getParam('id'))
  const [content, setContent] = useState(navigation.getParam('content'))

  const {
    state: { loading },
  } = useContext(PersonalSummaryContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return (
      <PersonalSummaryEditForm
        bit="personalSummary"
        id={id}
        incomingValue={content}
      />
    )
  }

  return renderContent()
}

PersonalSummaryEditScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>edit personal summary</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="PersonalSummary" />,
  }
}

const styles = StyleSheet.create({
  heading: {
    color: '#ffff',
    fontSize: 22,
  },
  bed: {
    backgroundColor: '#232936',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
})

export default PersonalSummaryEditScreen
