import React, { useEffect, useContext } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { NavigationEvents } from 'react-navigation'

import { Context as ContactInfoContext } from '../../context/ContactInfoContext'
import { Context as PersonalInfoContext } from '../../context/PersonalInfoContext'
import Header from '../../components/Header'
import LoaderFullScreen from '../../components/loadingModals/LoaderFullScreen'
import ShareCVForm from '../../components/cvBitForms/ShareCVForm'

const ShareCVScreen = ({ navigation }) => {
  const {
    state: { loading: loadingContactInfo, contactInfo },
    fetchContactInfo
  } = useContext(ContactInfoContext)

  const {
    state: { loading: loadingPersonalInfo, personalInfo },
    fetchPersonalInfo
  } = useContext(PersonalInfoContext)

  useEffect(() => {
    userRedirect()
  }, [contactInfo, personalInfo])

  const userRedirect = () => {
    if (personalInfo === null || contactInfo === null) return null
    if (personalInfo.length < 1 && contactInfo.length < 1) {
      navigation.navigate('StartUpCreate')
    }
  }

  const renderContent = () => {
    if (loadingContactInfo || loadingPersonalInfo) return <LoaderFullScreen />
    return (
      <View style={styles.bed}>
        <Header />
        <ShareCVForm />
      </View>
    )
  }

  return (
    <>
      <NavigationEvents
        onWillBlur={() => {
          fetchPersonalInfo()
          fetchContactInfo()
        }}
        onWillFocus={() => {
          fetchPersonalInfo()
          fetchContactInfo()
        }}
      />
      {renderContent()}
    </>
  )
}

ShareCVScreen.navigationOptions = () => {
  return {
    title: 'Share CV',
    tabBarOptions: {
      style: {
        backgroundColor: '#232936'
      },
      tabStyle: {
        backgroundColor: '#232936'
      },
      labelStyle: {
        fontSize: 16,
        paddingBottom: Platform.OS === 'android' ? 13 : 5
      },
      inactiveTintColor: '#278ACD',
      activeTintColor: '#F9B321'
    }
  }
}

const styles = StyleSheet.create({
  bed: {
    backgroundColor: '#232936',
    paddingTop: Platform.OS === 'ios' ? 12 : 0,
    flex: 1,
    width: '100%'
  }
})

export default ShareCVScreen
