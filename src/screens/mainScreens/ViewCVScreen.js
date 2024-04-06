import React, { useEffect, useContext, useState } from 'react'
import { View, StyleSheet, Platform, Image, Text } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { NavigationEvents } from 'react-navigation'
import { AntDesign } from '@expo/vector-icons'

import LoaderWithText from '../../components/loadingModals/LoaderWithText'
import logo from '../../../assets/images/logo-h79.png'
import ViewBitPhoto from '../../components/cvViewBits/ViewBitPhoto'
import ViewBitHeading from '../../components/cvViewBits/ViewBitHeading'
import ViewBitPersonalSummary from '../../components/cvViewBits/ViewBitPersonalSummary'
import ViewBitContactInfo from '../../components/cvViewBits/ViewBitContactInfo'
import ViewBitPersonalInfo from '../../components/cvViewBits/ViewBitPersonalInfo'
import ViewBitLanguages from '../../components/cvViewBits/ViewBitLanguage'
import ViewBitEmployHistory from '../../components/cvViewBits/ViewBitEmployHistory'
import ViewBitAttribute from '../../components/cvViewBits/ViewBitAttribute'
import ViewBitExperience from '../../components/cvViewBits/ViewBitExperience'
import ViewBitSkill from '../../components/cvViewBits/ViewBitSkill'
import ViewBitSecondEdu from '../../components/cvViewBits/ViewBitSecondEdu'
import ViewBitTertEdu from '../../components/cvViewBits/ViewBitTertEdu'
import ViewBitReference from '../../components/cvViewBits/ViewBitReference'
import ViewBitInterest from '../../components/cvViewBits/ViewBitInterest'

import { Context as AttributeContext } from '../../context/AttributeContext'
import { Context as ContactInfoContext } from '../../context/ContactInfoContext'
import { Context as EmployHistoryContext } from '../../context/EmployHistoryContext'
import { Context as ExperienceContext } from '../../context/ExperienceContext'
import { Context as InterestContext } from '../../context/InterestContext'
import { Context as LanguageContext } from '../../context/LanguageContext'
import { Context as PersonalInfoContext } from '../../context/PersonalInfoContext'
import { Context as PersonalSummaryContext } from '../../context/PersonalSummaryContext'
import { Context as PhotoContext } from '../../context/PhotoContext'
import { Context as ReferenceContext } from '../../context/ReferenceContext'
import { Context as SecondEduContext } from '../../context/SecondEduContext'
import { Context as SkillContext } from '../../context/SkillContext'
import { Context as TertEduContext } from '../../context/TertEduContext'

const ViewCVScreen = ({ navigation }) => {
  const [zoom, setZoom] = useState('zoomedOut')
  const [showSample, setShowSample] = useState(false)
  const [showSampleButton, setShowSampleButton] = useState(true)

  const {
    state: { loading: loadingAttribute, attributes, attributeSample },
    fetchAttributes,
    fetchAttributeSample,
  } = useContext(AttributeContext)

  const {
    state: { loading: loadingContactInfo, contactInfo, contactInfoSample },
    fetchContactInfo,
    fetchContactInfoSample,
  } = useContext(ContactInfoContext)

  const {
    state: {
      loading: loadingEmployHistory,
      employHistorys,
      employHistorySample,
    },
    fetchEmployHistorys,
    fetchEmployHistorySample,
  } = useContext(EmployHistoryContext)

  const {
    state: { loading: loadingExperience, experiences, experienceSample },
    fetchExperiences,
    fetchExperienceSample,
  } = useContext(ExperienceContext)

  const {
    state: { loading: loadingInterest, interests, interestSample },
    fetchInterests,
    fetchInterestSample,
  } = useContext(InterestContext)

  const {
    state: { loading: loadingLanguage, languages, languageSample },
    fetchLanguages,
    fetchLanguageSample,
  } = useContext(LanguageContext)

  const {
    state: {
      loading: loadingPersonalInfo,
      personalInfo,
      viewHeading,
      personalInfoSample,
      viewHeadingSample,
    },
    fetchPersonalInfo,
    fetchViewHeading,
    fetchPersonalInfoSample,
    fetchViewHeadingSample,
  } = useContext(PersonalInfoContext)

  const {
    state: {
      loading: loadingPersonalSummary,
      personalSummary,
      personalSummarySample,
    },
    fetchPersonalSummary,
    fetchPersonalSummarySample,
  } = useContext(PersonalSummaryContext)

  const {
    state: { loading: loadingPhoto, assignedPhotoUrl, assignedPhotoUrlSample },
    fetchAssignedPhoto,
    fetchPhotoSample,
  } = useContext(PhotoContext)

  const {
    state: { loading: loadingReference, references, referenceSample },
    fetchReferences,
    fetchReferenceSample,
  } = useContext(ReferenceContext)

  const {
    state: { loading: loadingSecondEdu, secondEdus, secondEduSample },
    fetchSecondEdus,
    fetchSecondEduSample,
  } = useContext(SecondEduContext)

  const {
    state: { loading: loadingSkill, skills, skillSample },
    fetchSkills,
    fetchSkillSample,
  } = useContext(SkillContext)

  const {
    state: { loading: loadingTertEdu, tertEdus, tertEduSample },
    fetchTertEdus,
    fetchTertEduSample,
  } = useContext(TertEduContext)

  useEffect(() => {
    userRedirect()
  }, [contactInfo, personalInfo])

  const userRedirect = () => {
    if (personalInfo === null || contactInfo === null) return null
    if (personalInfo.length < 1 && contactInfo.length < 1) {
      navigation.navigate('StartUpCreate')
    }
  }

  const headerWithZoom = () => {
    return (
      <View style={styles.bed}>
        <Image style={styles.logo} source={logo} resizeMode="contain" />
        <View style={styles.zoomButtonsBed}>
          <TouchableOpacity onPress={() => setZoom('zoomedOut')}>
            <Text
              style={
                zoom === 'zoomedOut'
                  ? styles.zoomedButtonTextActive
                  : styles.zoomedButtonText
              }
            >
              -
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setZoom('zoomedIn')}>
            <Text
              style={
                zoom === 'zoomedIn'
                  ? styles.zoomedButtonTextActive
                  : styles.zoomedButtonText
              }
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderZoomedOut = () => {
    return (
      <View style={stylesZoomedOut.bed}>
        {headerWithZoom()}
        <ScrollView>
          <ScrollView horizontal>
            <View style={stylesZoomedOut.cvBed}>
              <View style={stylesZoomedOut.leftColumn}>
                <ViewBitPhoto
                  assignedPhotoUrl={assignedPhotoUrl}
                  assignedPhotoUrlSample={assignedPhotoUrlSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitContactInfo
                  contactInfo={contactInfo}
                  contactInfoSample={contactInfoSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitPersonalInfo
                  personalInfo={personalInfo}
                  personalInfoSample={personalInfoSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitLanguages
                  languages={languages}
                  languageSample={languageSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitAttribute
                  attributes={attributes}
                  attributeSample={attributeSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitInterest
                  interests={interests}
                  interestSample={interestSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitSkill
                  skills={skills}
                  skillSample={skillSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitReference
                  references={references}
                  referenceSample={referenceSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <View style={stylesZoomedOut.leftFooter}></View>
              </View>
              <View style={stylesZoomedOut.rightColumn}>
                <ViewBitHeading
                  viewHeading={viewHeading}
                  viewHeadingSample={viewHeadingSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitPersonalSummary
                  personalSummary={personalSummary}
                  personalSummarySample={personalSummarySample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitEmployHistory
                  employHistorys={employHistorys}
                  employHistorySample={employHistorySample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitExperience
                  experiences={experiences}
                  experienceSample={experienceSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitSecondEdu
                  secondEdus={secondEdus}
                  secondEduSample={secondEduSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitTertEdu
                  tertEdus={tertEdus}
                  tertEduSample={tertEduSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <View style={stylesZoomedOut.rightFooter}></View>
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    )
  }

  const renderZoomedIn = () => {
    return (
      <View style={stylesZoomedIn.bed}>
        {headerWithZoom()}
        <ScrollView>
          <ScrollView horizontal>
            <View style={stylesZoomedIn.cvBed}>
              <View style={stylesZoomedIn.leftColumn}>
                <ViewBitPhoto
                  assignedPhotoUrl={assignedPhotoUrl}
                  assignedPhotoUrlSample={assignedPhotoUrlSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitContactInfo
                  contactInfo={contactInfo}
                  contactInfoSample={contactInfoSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitPersonalInfo
                  personalInfo={personalInfo}
                  personalInfoSample={personalInfoSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitLanguages
                  languages={languages}
                  languageSample={languageSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitAttribute
                  attributes={attributes}
                  attributeSample={attributeSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitInterest
                  interests={interests}
                  interestSample={interestSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitSkill
                  skills={skills}
                  skillSample={skillSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitReference
                  references={references}
                  referenceSample={referenceSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <View style={stylesZoomedIn.leftFooter}></View>
              </View>
              <View style={stylesZoomedIn.rightColumn}>
                <ViewBitHeading
                  viewHeading={viewHeading}
                  viewHeadingSample={viewHeadingSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitPersonalSummary
                  personalSummary={personalSummary}
                  personalSummarySample={personalSummarySample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitEmployHistory
                  employHistorys={employHistorys}
                  employHistorySample={employHistorySample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitExperience
                  experiences={experiences}
                  experienceSample={experienceSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitSecondEdu
                  secondEdus={secondEdus}
                  secondEduSample={secondEduSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <ViewBitTertEdu
                  tertEdus={tertEdus}
                  tertEduSample={tertEduSample}
                  showSample={showSample}
                  zoom={zoom}
                />
                <View style={stylesZoomedIn.rightFooter}></View>
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    )
  }

  const renderContent = () => {
    if (
      loadingAttribute ||
      loadingContactInfo ||
      loadingEmployHistory ||
      loadingExperience ||
      loadingInterest ||
      loadingLanguage ||
      loadingPersonalInfo ||
      loadingPersonalSummary ||
      loadingPhoto ||
      loadingReference ||
      loadingSkill ||
      loadingSecondEdu ||
      loadingTertEdu ||
      personalInfo === null ||
      contactInfo === null
    ) {
      return <LoaderWithText mainText="Building your CV" />
    }
    return zoom === 'zoomedOut' ? renderZoomedOut() : renderZoomedIn()
  }

  const cvSampleButton = () => {
    if (
      !showSampleButton ||
      loadingAttribute ||
      loadingContactInfo ||
      loadingEmployHistory ||
      loadingExperience ||
      loadingInterest ||
      loadingLanguage ||
      loadingPersonalInfo ||
      loadingPersonalSummary ||
      loadingPhoto ||
      loadingReference ||
      loadingSkill ||
      loadingSecondEdu ||
      loadingTertEdu
    )
      return null
    return (
      <View style={styles.viewCvSampleButtonBed}>
        <TouchableOpacity
          style={styles.viewCvSampleCloseButton}
          onPress={() => {
            setShowSampleButton(false)
            setShowSample(false)
          }}
        >
          <AntDesign style={styles.viewCvSampleCloseButtonIcon} name="close" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.viewCvSampleButton}
          onPress={() => setShowSample(!showSample)}
        >
          <Text style={styles.viewCvSampleButtonText}>
            {!showSample ? 'View' : 'Hide'}
          </Text>
          <Text style={styles.viewCvSampleButtonText}>Sample</Text>
          <Text style={styles.viewCvSampleButtonText}>CV</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <>
      <NavigationEvents
        onWillBlur={() => {
          fetchAttributes()
          fetchContactInfo()
          fetchEmployHistorys()
          fetchExperiences()
          fetchInterests()
          fetchLanguages()
          fetchPersonalInfo()
          fetchPersonalSummary()
          fetchAssignedPhoto()
          fetchReferences()
          fetchSecondEdus()
          fetchSkills()
          fetchTertEdus()
          fetchViewHeading()
          setShowSampleButton(true)
          fetchAttributeSample()
          fetchContactInfoSample()
          fetchEmployHistorySample()
          fetchExperienceSample()
          fetchInterestSample()
          fetchLanguageSample()
          fetchPersonalInfoSample()
          fetchViewHeadingSample()
          fetchPersonalSummarySample()
          fetchPhotoSample()
          fetchReferenceSample()
          fetchSecondEduSample()
          fetchSkillSample()
          fetchTertEduSample()
        }}
        onWillFocus={() => {
          fetchAttributes()
          fetchContactInfo()
          fetchEmployHistorys()
          fetchExperiences()
          fetchInterests()
          fetchLanguages()
          fetchPersonalInfo()
          fetchPersonalSummary()
          fetchAssignedPhoto()
          fetchReferences()
          fetchSecondEdus()
          fetchSkills()
          fetchTertEdus()
          fetchViewHeading()
          setShowSampleButton(true)
          fetchAttributeSample()
          fetchContactInfoSample()
          fetchEmployHistorySample()
          fetchExperienceSample()
          fetchInterestSample()
          fetchLanguageSample()
          fetchPersonalInfoSample()
          fetchViewHeadingSample()
          fetchPersonalSummarySample()
          fetchPhotoSample()
          fetchReferenceSample()
          fetchSecondEduSample()
          fetchSkillSample()
          fetchTertEduSample()
        }}
      />
      {renderContent()}
      {cvSampleButton()}
    </>
  )
}

ViewCVScreen.navigationOptions = () => {
  return {
    headerShown: false,
    tabBarOptions: {
      style: {
        backgroundColor: '#232936',
      },
      tabStyle: {
        backgroundColor: '#232936',
      },
      labelStyle: {
        fontSize: 16,
        paddingBottom: Platform.OS === 'android' ? 13 : 5,
      },
      inactiveTintColor: '#278ACD',
      activeTintColor: '#F9B321',
    },
  }
}

const stylesZoomedOut = StyleSheet.create({
  bed: {
    backgroundColor: '#232936',
    paddingTop: Platform.OS === 'ios' ? 12 : 0,
    flex: 1,
    width: '100%',
  },
  cvBed: {
    backgroundColor: '#ffff',
    marginTop: 5,
    marginLeft: 10,
    width: 380,
    flexDirection: 'row',
  },
  leftColumn: {
    backgroundColor: '#278ACD',
    width: '30%',
    paddingRight: 1,
  },
  rightColumn: {
    backgroundColor: '#ffff',
    width: '70%',
  },
  leftFooter: {
    backgroundColor: '#278ACD',
    height: 20,
  },
  rightFooter: {
    backgroundColor: '#ffff',
    height: 20,
  },
})

const stylesZoomedIn = StyleSheet.create({
  bed: {
    backgroundColor: '#232936',
    paddingTop: Platform.OS === 'ios' ? 12 : 0,
    flex: 1,
    width: '100%',
  },
  cvBed: {
    backgroundColor: '#ffff',
    marginTop: 5,
    width: 793,
    flexDirection: 'row',
  },
  leftColumn: {
    backgroundColor: '#278ACD',
    width: '30%',
  },
  rightColumn: {
    backgroundColor: '#ffff',
    width: '70%',
  },
  leftFooter: {
    backgroundColor: '#278ACD',
    height: 20,
  },
  rightFooter: {
    backgroundColor: '#ffff',
    height: 20,
  },
})

const styles = StyleSheet.create({
  bed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 150,
    marginBottom: -23,
    marginLeft: 10,
  },
  zoomButtonsBed: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  zoomedButtonText: {
    color: '#ffff',
    fontSize: 30,
    paddingRight: 30,
  },
  zoomedButtonTextActive: {
    color: '#808080',
    fontSize: 30,
    paddingRight: 30,
  },
  viewCvSampleCloseButton: {
    alignSelf: 'flex-end',
  },
  viewCvSampleCloseButtonIcon: {
    fontSize: 16,
  },
  viewCvSampleButtonBed: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  viewCvSampleButton: {
    backgroundColor: '#065b948c',
    borderRadius: 25,
    padding: 10,
    textAlign: 'center',
  },
  viewCvSampleButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
})

export default ViewCVScreen
