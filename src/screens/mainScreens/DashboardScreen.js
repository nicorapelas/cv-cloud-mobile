import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'

import Header from '../../components/Header'
import TermsAndConditionsModal from '../../components/termsAndConditions/TermsAndConditionsModal'
import AttributeBitButton from '../../components/bitButtons/AttributeBitButton'
import ContactInfoBitButton from '../../components/bitButtons/ContactInfoBitButton'
import EmployHistoryBitButton from '../../components/bitButtons/EmployHistoryBitButton'
import ExperienceBitButton from '../../components/bitButtons/ExperienceBitButton'
import FirstImpressionBitButton from '../../components/bitButtons/FirstImpressionBitButton'
import InterestBitButton from '../../components/bitButtons/InterestBitButton'
import LanguageBitButton from '../../components/bitButtons/LanguageBitButton'
import PersonalInfoBitButton from '../../components/bitButtons/PersonalInfoBitButton'
import PersonalSummaryBitButton from '../../components/bitButtons/PersonalSummaryBitButton'
import ReferenceBitButton from '../../components/bitButtons/ReferenceBitButton'
import SecondEduBitButton from '../../components/bitButtons/SecondEduBitButton'
import SkillBitButton from '../../components/bitButtons/SkillBitButton'
import TertEduBitButton from '../../components/bitButtons/TertEduBitButton'
import PhotoBitButton from '../../components/bitButtons/PhotoBitButton'
import CertificateBitButton from '../../components/bitButtons/CertificateBitButton'

const DashboardScreen = () => {
  return (
    <View style={styles.bed}>
      <TermsAndConditionsModal />
      <Header />
      <ScrollView>
        <FirstImpressionBitButton />
        <PhotoBitButton />
        <PersonalInfoBitButton />
        <ContactInfoBitButton />
        <PersonalSummaryBitButton />
        <SecondEduBitButton />
        <TertEduBitButton />
        <LanguageBitButton />
        <AttributeBitButton />
        <EmployHistoryBitButton />
        <ExperienceBitButton />
        <SkillBitButton />
        <InterestBitButton />
        <ReferenceBitButton />
        <CertificateBitButton />
      </ScrollView>
    </View>
  )
}

DashboardScreen.navigationOptions = () => {
  return {
    headerShown: false,
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

export default DashboardScreen
