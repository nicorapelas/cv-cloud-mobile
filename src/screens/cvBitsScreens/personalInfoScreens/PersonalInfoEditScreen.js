import React, { useContext, useState } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import PersonalInfoForm from '../../../components/cvBitForms/PersonalInfoCreateEditForm'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import { Context as PersonalInfoContext } from '../../../context/PersonalInfoContext'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const PersonalInfoEditScreen = ({ navigation }) => {
  const [id] = useState(navigation.getParam('id'))
  const [dateOfBirth] = useState(navigation.getParam('dateOfBirth'))
  const [driversLicense] = useState(navigation.getParam('driversLicense'))
  const [fullName] = useState(navigation.getParam('fullName'))
  const [gender] = useState(navigation.getParam('gender'))
  const [idNumber] = useState(navigation.getParam('idNumber'))
  const [licenseCode] = useState(navigation.getParam('licenseCode'))
  const [nationality] = useState(navigation.getParam('nationality'))
  const [ppNumber] = useState(navigation.getParam('ppNumber'))
  const [saCitizen] = useState(navigation.getParam('saCitizen'))

  const {
    state: { loading }
  } = useContext(PersonalInfoContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return (
      <PersonalInfoForm
        formType="edit"
        id={id}
        incomingDateOfBirth={dateOfBirth}
        incomingDriversLicense={driversLicense}
        incomingFullName={fullName}
        incomingGender={gender}
        incomingIdNumber={idNumber}
        incomingLicenseCode={licenseCode}
        incomingNationality={nationality}
        incomingPpNumber={ppNumber}
        incomingSaCitizen={saCitizen}
      />
    )
  }

  return renderContent()
}

PersonalInfoEditScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>edit personal information</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="PersonalInfo" />
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

export default PersonalInfoEditScreen
