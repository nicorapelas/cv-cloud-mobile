import React, { useContext, useState } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import ContactInfoEditForm from '../../../components/cvBitForms/ContactInfoCreateEditForm'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import { Context as PersonalInfoContext } from '../../../context/PersonalInfoContext'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const ContactInfoEditScreen = ({ navigation }) => {
  const [id] = useState(navigation.getParam('id'))
  const [unit] = useState(navigation.getParam('unit'))
  const [complex] = useState(navigation.getParam('complex'))
  const [address] = useState(navigation.getParam('address'))
  const [suburb] = useState(navigation.getParam('suburb'))
  const [city] = useState(navigation.getParam('city'))
  const [country] = useState(navigation.getParam('country'))
  const [email] = useState(navigation.getParam('email'))
  const [phone] = useState(navigation.getParam('phone'))
  const [postalCode] = useState(navigation.getParam('postalCode'))
  const [province] = useState(navigation.getParam('province'))

  const {
    state: { loading }
  } = useContext(PersonalInfoContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return (
      <ContactInfoEditForm
        formType="edit"
        id={id}
        incomingUnit={unit}
        incomingComplex={complex}
        incomingAddress={address}
        incomingSuburb={suburb}
        incomingCity={city}
        incomingCountry={country}
        incomingEmail={email}
        incomingPhone={phone}
        incomingPostalCode={postalCode}
        incomingProvince={province}
      />
    )
  }

  return renderContent()
}

ContactInfoEditScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>edit contact information</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="ContactInfo" />
  }
}

const styles = StyleSheet.create({
  heading: {
    color: '#ffff',
    fontSize: 22
  }
})

export default ContactInfoEditScreen
