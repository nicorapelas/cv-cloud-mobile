import React, { useContext, useState } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import TertEduEditForm from '../../../components/cvBitForms/TertEduCreateEditForm'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import { Context as TertEduContext } from '../../../context/TertEduContext'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const TertEduEditScreen = ({ navigation }) => {
  const [id] = useState(navigation.getParam('id'))
  const [additionalInfo] = useState(navigation.getParam('additionalInfo'))
  const [endDate] = useState(navigation.getParam('endDate'))
  const [startDate] = useState(navigation.getParam('startDate'))
  const [instituteName] = useState(navigation.getParam('instituteName'))
  const [certificationType] = useState(navigation.getParam('certificationType'))
  const [description] = useState(navigation.getParam('description'))

  const {
    state: { loading }
  } = useContext(TertEduContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return (
      <TertEduEditForm
        formType="edit"
        id={id}
        incomingAdditionalInfo={additionalInfo}
        incomingEndDate={endDate}
        incomingStartDate={startDate}
        incomingInstituteName={instituteName}
        incomingCertificationType={certificationType}
        incomingDescription={description}
      />
    )
  }

  return renderContent()
}

TertEduEditScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>edit tertiary education</Text>,
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

export default TertEduEditScreen
