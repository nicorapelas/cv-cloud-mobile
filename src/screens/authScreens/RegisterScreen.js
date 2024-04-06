import React, { useContext, useState } from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { SocialIcon } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'
import { TextInput } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'

import RegisterAndLoginOptions from '../../components/RegisterAndLoginOptions'
import { Context as AuthContext } from '../../context/AuthContext'
import LoaderFullScreen from '../../components/loadingModals/LoaderFullScreen'
import ModalLink from '../../components/links/ModalLink'
import NavLink from '../../components/links/NavLink'

const RegisterScreen = ({ navigation }) => {
  const [code, setCode] = useState(null)
  const [intro, setIntro] = useState(null)

  const {
    state: { loading, apiMessage },
    clearApiMessage,
    setIntroAffiliateCode,
  } = useContext(AuthContext)

  const renderApiMessage = () => {
    if (!apiMessage) return null
    const { error } = apiMessage
    return (
      <>
        {!error ? null : (
          <ModalLink buttonText="OK" message={error} routeName="LoginEmail" />
        )}
      </>
    )
  }

  const affiliateInput = () => {
    if (!intro) {
      return (
        <TouchableOpacity
          style={!intro ? null : styles.introIconBed}
          onPress={() => setIntro(true)}
        >
          <AntDesign name="star" style={styles.introIcon} />
        </TouchableOpacity>
      )
    }
    return (
      <>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          textAlign="center"
          placeholder="affiliate code"
          value={code}
          onChangeText={setCode}
          autoCorrect={false}
        />
        <TouchableOpacity
          style={styles.attachButton}
          onPress={() => {
            setIntro(false)
            setIntroAffiliateCode(code)
          }}
        >
          <Text style={styles.attachButtonText}>Attach code</Text>
        </TouchableOpacity>
      </>
    )
  }

  const renderContent = () => {
    if (loading) return <LoaderFullScreen />
    return (
      <View style={Platform.OS === 'ios' ? styles.bedIos : styles.bedAndroid}>
        <NavigationEvents
          onWillBlur={clearApiMessage}
          onWillFocus={clearApiMessage}
        />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          style={styles.container}
        >
          {renderApiMessage()}
          {affiliateInput()}
          {intro ? null : (
            <>
              <RegisterAndLoginOptions
                heading="Sign up with us"
                introAffiliateCode={code}
              />
              <View style={styles.emailButton}>
                <SocialIcon
                  title="Email"
                  button
                  light
                  type="envelope"
                  onPress={() => navigation.navigate('RegisterEmail')}
                />
              </View>
              <View style={styles.navLink}>
                <NavLink
                  routeName="LoginEmail"
                  text="Already have an account? Login here."
                />
              </View>
            </>
          )}
        </ScrollView>
      </View>
    )
  }
  return renderContent()
}

RegisterScreen.navigationOptions = () => {
  return {
    headerShown: false,
  }
}

const styles = StyleSheet.create({
  bedIos: {
    backgroundColor: '#232936',
    width: '100%',
    flex: 1,
    marginTop: -100,
  },
  bedAndroid: {
    backgroundColor: '#232936',
    width: '100%',
    flex: 1,
  },
  container: {
    width: '85%',
    alignSelf: 'center',
    flexDirection: 'column',
  },
  navLink: {
    paddingTop: 30,
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  introIcon: {
    color: '#278acd',
    fontSize: 8,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#ffff',
    width: '50%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 5,
  },
  attachButton: {
    backgroundColor: '#278acd',
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: -30,
  },
  attachButtonText: {
    color: '#ffff',
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
})

export default RegisterScreen
