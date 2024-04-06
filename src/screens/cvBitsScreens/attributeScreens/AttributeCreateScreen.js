import React, { useContext } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import { Context as AttributeContext } from '../../../context/AttributeContext'
import AttributeCreateForm from '../../../components/cvBitForms/AttributeCreateForm'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const AttributeCreateScreen = () => {
  const {
    state: { loading }
  } = useContext(AttributeContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <AttributeCreateForm bit="attribute" />
  }

  return renderContent()
}

AttributeCreateScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>add attribute</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="Attribute" />
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

export default AttributeCreateScreen
