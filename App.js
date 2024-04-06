import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { useFonts } from '@use-expo/font'
import AppLoading from 'expo-app-loading'
import LoaderFullScreen from './src/components/loadingModals/LoaderFullScreen'

import { Provider as AuthProvider } from './src/context/AuthContext'
import { Provider as UniversalProvider } from './src/context/UniversalContext'
import { Provider as AttributeProvider } from './src/context/AttributeContext'
import { Provider as ContactInfoProvider } from './src/context/ContactInfoContext'
import { Provider as EmployHistoryProvider } from './src/context/EmployHistoryContext'
import { Provider as ExperienceProvider } from './src/context/ExperienceContext'
import { Provider as FirstImpressionProvider } from './src/context/FirstImpressionContext'
import { Provider as InterestProvider } from './src/context/InterestContext'
import { Provider as LanguageProvider } from './src/context/LanguageContext'
import { Provider as PersonalInfoProvider } from './src/context/PersonalInfoContext'
import { Provider as PersonalSummaryProvider } from './src/context/PersonalSummaryContext'
import { Provider as ReferenceProvider } from './src/context/ReferenceContext'
import { Provider as SecondEduProvider } from './src/context/SecondEduContext'
import { Provider as SkillProvider } from './src/context/SkillContext'
import { Provider as TertEduProvider } from './src/context/TertEduContext'
import { Provider as PhotoProvider } from './src/context/PhotoContext'
import { Provider as CertificateProvider } from './src/context/CertificateContext'
import { Provider as ShareCVProvider } from './src/context/ShareCVContext'
import { Provider as BurgerMenuProvider } from './src/context/BurgerMenuContext'
import { Provider as AffiliateProvider } from './src/context/AffiliateContext'
import { Provider as ConfigProvider } from './src/context/ConfigContext'
import { setNavigator } from './src/navigationRef'

// import RegisterScreen from './src/screens/authScreens/RegisterScreen'
import RegisterOrLoginScreen from './src/screens/authScreens/RegisterOrLoginScreen'
// import LoginScreen from './src/screens/authScreens/LoginScreen'
import RegisterEmailScreen from './src/screens/authScreens/RegisterEmailScreen'
import LoginEmailScreen from './src/screens/authScreens/LoginEmailScreen'
import PasswordForgotScreen from './src/screens/authScreens/PasswordForgotScreen'
import ResoleAuthScreen from './src/screens/ResolveAuthScreen'
import DashboardScreen from './src/screens/mainScreens/DashboardScreen'
import ViewCVScreen from './src/screens/mainScreens/ViewCVScreen'
import ShareCVScreen from './src/screens/mainScreens/ShareCVScreen'
import AttributeScreen from './src/screens/cvBitsScreens/attributeScreens/AttributeScreen'
import AttributeCreateScreen from './src/screens/cvBitsScreens/attributeScreens/AttributeCreateScreen'
import AttributeEditScreen from './src/screens/cvBitsScreens/attributeScreens/AttributeEditScreen'
import CertificateScreen from './src/screens/cvBitsScreens/certificateScreens/CertificateScreen'
import CertificateCreateScreen from './src/screens/cvBitsScreens/certificateScreens/CertificateCreateScreen'
import CertificateEditScreen from './src/screens/cvBitsScreens/certificateScreens/CertificateEditScreen'
import CertificatePhotoUploadScreen from './src/screens/cvBitsScreens/certificateScreens/CertificatePhotoUploadScreen'
import CertificatePdfUploadScreen from './src/screens/cvBitsScreens/certificateScreens/CertificatePdfUploadScreen'
import ContactInfoScreen from './src/screens/cvBitsScreens/contactInfoScreens/ContactInfoScreen'
import ContactInfoCreateScreen from './src/screens/cvBitsScreens/contactInfoScreens/ContactInfoCreateScreen'
import ContactInfoEditScreen from './src/screens/cvBitsScreens/contactInfoScreens/ContactInfoEditScreen'
import EmployHistoryScreen from './src/screens/cvBitsScreens/employHistoryScreens/EmployHistoryScreen'
import EmployHistoryCreateScreen from './src/screens/cvBitsScreens/employHistoryScreens/EmployHistoryCreateScreen'
import EmployHistoryEditScreen from './src/screens/cvBitsScreens/employHistoryScreens/EmployHistoryEditScreen'
import ExperienceScreen from './src/screens/cvBitsScreens/experienceScreens/ExperienceScreen'
import ExperienceCreateScreen from './src/screens/cvBitsScreens/experienceScreens/ExperienceCreateScreen'
import ExperienceEditScreen from './src/screens/cvBitsScreens/experienceScreens/ExperienceEditScreen'
import FirstImpressionScreen from './src/screens/cvBitsScreens/firstImpressionScreens/FirstImpressionScreen'
import FirstImpressionCreateScreen from './src/screens/cvBitsScreens/firstImpressionScreens/FirstImpressionCreateScreen'
import InterestScreen from './src/screens/cvBitsScreens/interestScreens/InterestScreen'
import InterestCreateScreen from './src/screens/cvBitsScreens/interestScreens/InterestCreateScreen'
import InterestEditScreen from './src/screens/cvBitsScreens/interestScreens/InterestEditScreen'
import LanguageScreen from './src/screens/cvBitsScreens/languageScreens/LanguageScreen'
import LanguageCreateScreen from './src/screens/cvBitsScreens/languageScreens/LanguageCreateScreen'
import LanguageEditScreen from './src/screens/cvBitsScreens/languageScreens/LanguageEditScreen'
import PersonalInfoScreen from './src/screens/cvBitsScreens/personalInfoScreens/PersonalInfoScreen'
import PersonalInfoCreateScreen from './src/screens/cvBitsScreens/personalInfoScreens/PersonalInfoCreateScreen'
import PersonalInfoEditScreen from './src/screens/cvBitsScreens/personalInfoScreens/PersonalInfoEditScreen'
import PersonalSummaryScreen from './src/screens/cvBitsScreens/personalSummaryScreens/PersonalSummaryScreen'
import PersonalSummaryCreateScreen from './src/screens/cvBitsScreens/personalSummaryScreens/PersonalSummaryCreateScreen'
import PersonalSummaryEditScreen from './src/screens/cvBitsScreens/personalSummaryScreens/PersonalSummaryEditScreen'
import PhotoScreen from './src/screens/cvBitsScreens/photoScreens/PhotoScreen'
import PhotoCreateScreen from './src/screens/cvBitsScreens/photoScreens/PhotoCreateScreen'
import PhotoEditScreen from './src/screens/cvBitsScreens/photoScreens/PhotoEditScreen'
import ReferenceScreen from './src/screens/cvBitsScreens/referenceScreens/ReferenceScreen'
import ReferenceCreateScreen from './src/screens/cvBitsScreens/referenceScreens/ReferenceCreateScreen'
import ReferenceEditScreen from './src/screens/cvBitsScreens/referenceScreens/ReferenceEditScreen'
import SecondEduScreen from './src/screens/cvBitsScreens/secondEduScreens/SecondEduScreen'
import SecondEduCreateScreen from './src/screens/cvBitsScreens/secondEduScreens/SecondEduCreateScreen'
import SkillScreen from './src/screens/cvBitsScreens/skillScreens/SkillScreen'
import SecondEduEditScreen from './src/screens/cvBitsScreens/secondEduScreens/SecondEduEditScreen'
import SkillCreateScreen from './src/screens/cvBitsScreens/skillScreens/SkillCreateScreen'
import SkillEditScreen from './src/screens/cvBitsScreens/skillScreens/SkillEditScreen'
import StartUpCreateScreen from './src/screens/cvBitsScreens/startUpScreens/StartUpCreateScreen'
import TertEduScreen from './src/screens/cvBitsScreens/tertEduScreens/TertEduScreen'
import TertEduCreateScreen from './src/screens/cvBitsScreens/tertEduScreens/TertEduCreateScreen'
import TertEduEditScreen from './src/screens/cvBitsScreens/tertEduScreens/TertEduEditScreen'

import TempScreen from './src/screens/mainScreens/TempScreen'

const dashboardFlow = createStackNavigator({
  Dashboard: DashboardScreen,
  Attribute: AttributeScreen,
  AttributeCreate: AttributeCreateScreen,
  AttributeEdit: AttributeEditScreen,
  Certificate: CertificateScreen,
  CertificateCreate: CertificateCreateScreen,
  CertificateEdit: CertificateEditScreen,
  CertificatePhotoUpload: CertificatePhotoUploadScreen,
  CertificatePdfUpload: CertificatePdfUploadScreen,
  ContactInfo: ContactInfoScreen,
  ContactInfoCreate: ContactInfoCreateScreen,
  ContactInfoEdit: ContactInfoEditScreen,
  EmployHistory: EmployHistoryScreen,
  EmployHistoryCreate: EmployHistoryCreateScreen,
  EmployHistoryEdit: EmployHistoryEditScreen,
  Experience: ExperienceScreen,
  ExperienceCreate: ExperienceCreateScreen,
  ExperienceEdit: ExperienceEditScreen,
  FirstImpression: FirstImpressionScreen,
  FirstImpressionCreate: FirstImpressionCreateScreen,
  Interest: InterestScreen,
  InterestCreate: InterestCreateScreen,
  InterestEdit: InterestEditScreen,
  Language: LanguageScreen,
  LanguageCreate: LanguageCreateScreen,
  LanguageEdit: LanguageEditScreen,
  PersonalInfo: PersonalInfoScreen,
  PersonalInfoCreate: PersonalInfoCreateScreen,
  PersonalInfoEdit: PersonalInfoEditScreen,
  PersonalSummary: PersonalSummaryScreen,
  PersonalSummaryCreate: PersonalSummaryCreateScreen,
  PersonalSummaryEdit: PersonalSummaryEditScreen,
  Photo: PhotoScreen,
  PhotoCreate: PhotoCreateScreen,
  PhotoEdit: PhotoEditScreen,
  Reference: ReferenceScreen,
  ReferenceCreate: ReferenceCreateScreen,
  ReferenceEdit: ReferenceEditScreen,
  SecondEdu: SecondEduScreen,
  SecondEduCreate: SecondEduCreateScreen,
  SecondEduEdit: SecondEduEditScreen,
  Skill: SkillScreen,
  SkillCreate: SkillCreateScreen,
  SkillEdit: SkillEditScreen,
  StartUpCreate: StartUpCreateScreen,
  TertEdu: TertEduScreen,
  TertEduCreate: TertEduCreateScreen,
  TertEduEdit: TertEduEditScreen,
})

const viewCVFlow = createStackNavigator({
  ViewCV: ViewCVScreen,
  StartUpCreate: StartUpCreateScreen,
})

dashboardFlow.navigationOptions = {
  title: 'Dashboard',
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
    inactiveTintColor: '#3ba7ee',
    activeTintColor: '#F9B321',
  },
}

viewCVFlow.navigationOptions = {
  title: 'View CV',
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
    inactiveTintColor: '#3ba7ee',
    activeTintColor: '#F9B321',
  },
}

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResoleAuthScreen,
  loginFlow: createStackNavigator({
    // Register: RegisterScreen,
    // Login: LoginScreen,
    RegisterOrLogin: RegisterOrLoginScreen,
    RegisterEmail: RegisterEmailScreen,
    LoginEmail: LoginEmailScreen,
    PasswordForgot: PasswordForgotScreen,
  }),
  mainFlow: createBottomTabNavigator({
    dashboardFlow,
    viewCVFlow,
    ShareCV: ShareCVScreen,
  }),
})

const App = createAppContainer(switchNavigator)

const customFonts = {
  oswaldBold: require('./assets/fonts/oswald/Oswald-Bold.ttf'),
  sourceSansProBold: require('./assets/fonts/sourceSansPro/SourceSansPro-Bold.ttf'),
  sourceSansProLight: require('./assets/fonts/sourceSansPro/SourceSansPro-Light.ttf'),
  sourceSansProExtraLight: require('./assets/fonts/sourceSansPro/SourceSansPro-ExtraLight.ttf'),
}

export default () => {
  const [isLoaded] = useFonts(customFonts)
  if (!isLoaded) return <LoaderFullScreen />
  return (
    <AuthProvider>
      <ConfigProvider>
        <UniversalProvider>
          <BurgerMenuProvider>
            <AffiliateProvider>
              <ShareCVProvider>
                <AttributeProvider>
                  <ContactInfoProvider>
                    <EmployHistoryProvider>
                      <ExperienceProvider>
                        <InterestProvider>
                          <FirstImpressionProvider>
                            <LanguageProvider>
                              <PersonalInfoProvider>
                                <PersonalSummaryProvider>
                                  <ReferenceProvider>
                                    <SecondEduProvider>
                                      <SkillProvider>
                                        <TertEduProvider>
                                          <PhotoProvider>
                                            <CertificateProvider>
                                              <App
                                                ref={(navigator) => {
                                                  setNavigator(navigator)
                                                }}
                                              />
                                            </CertificateProvider>
                                          </PhotoProvider>
                                        </TertEduProvider>
                                      </SkillProvider>
                                    </SecondEduProvider>
                                  </ReferenceProvider>
                                </PersonalSummaryProvider>
                              </PersonalInfoProvider>
                            </LanguageProvider>
                          </FirstImpressionProvider>
                        </InterestProvider>
                      </ExperienceProvider>
                    </EmployHistoryProvider>
                  </ContactInfoProvider>
                </AttributeProvider>
              </ShareCVProvider>
            </AffiliateProvider>
          </BurgerMenuProvider>
        </UniversalProvider>
      </ConfigProvider>
    </AuthProvider>
  )
}
