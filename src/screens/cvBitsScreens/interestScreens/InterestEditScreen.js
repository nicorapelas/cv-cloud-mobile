import React, { useContext, useState } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import InterestEditForm from '../../../components/cvBitForms/AttributeInterestPersonalSummaryEditForm'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import { Context as InterestContext } from '../../../context/InterestContext'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const InterestEditScreen = ({ navigation }) => {
  const [id, setId] = useState(navigation.getParam('id'))
  const [interest, setInterest] = useState(navigation.getParam('interest'))

  const {
    state: { loading },
  } = useContext(InterestContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <InterestEditForm bit="interest" id={id} incomingValue={interest} />
  }

  return renderContent()
}

InterestEditScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>edit interest</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="Interest" />,
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

export default InterestEditScreen
