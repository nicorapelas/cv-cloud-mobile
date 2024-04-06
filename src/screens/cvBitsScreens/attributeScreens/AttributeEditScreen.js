import React, { useContext, useState } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import AttributeEditForm from '../../../components/cvBitForms/AttributeInterestPersonalSummaryEditForm'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import { Context as AttributeContext } from '../../../context/AttributeContext'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const AttributeEditScreen = ({ navigation }) => {
  const [id] = useState(navigation.getParam('id'))
  const [attribute] = useState(navigation.getParam('attribute'))

  const {
    state: { loading }
  } = useContext(AttributeContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return (
      <AttributeEditForm bit="attribute" id={id} incomingValue={attribute} />
    )
  }

  return renderContent()
}

AttributeEditScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>edit attribute</Text>,
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

export default AttributeEditScreen
