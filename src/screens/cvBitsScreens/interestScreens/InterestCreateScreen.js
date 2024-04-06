import React, { useContext } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import { Context as InterestContext } from '../../../context/InterestContext'
import InterestCreateForm from '../../../components/cvBitForms/InterestCreateForm'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const InterestCreateScreen = () => {
  const {
    state: { loading }
  } = useContext(InterestContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <InterestCreateForm bit="interest" />
  }

  return renderContent()
}

InterestCreateScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>add interest</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="Interest" />
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

export default InterestCreateScreen
