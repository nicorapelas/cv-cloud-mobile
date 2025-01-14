import React, { useContext, useState } from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { TextInput } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'

import { Context as AuthContext } from '../../context/AuthContext'
import logo from '../../../assets/images/logo-w400.png'
import LoaderFullScreen from '../../components/loadingModals/LoaderFullScreen'
import ModalLink from '../../components/links/ModalLink'

const RegisterOrLoginScreen = ({ navigation }) => {
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
          {affiliateInput()}
          {renderApiMessage()}
          <Image style={styles.logo} source={logo} resizeMode="contain" />
          <Text
            style={
              Platform.OS === 'ios' ? styles.headingIos : styles.headingAndroid
            }
          >
            Welcome!
          </Text>
          {intro ? null : (
            <>
              <View style={styles.emailButton}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('RegisterEmail')}
                >
                  <AntDesign style={styles.buttonIcon} name="adduser" />
                  <Text style={styles.buttonText}>Sign up with us</Text>
                </TouchableOpacity>
                <Text
                  style={
                    Platform.OS === 'ios'
                      ? styles.orTextIos
                      : styles.orTextAndroid
                  }
                >
                  or
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('LoginEmail')}
                >
                  <AntDesign style={styles.buttonIcon} name="login" />
                  <Text style={styles.buttonText}>Login here</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    )
  }
  return renderContent()
}

RegisterOrLoginScreen.navigationOptions = () => {
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
  headingIos: {
    color: '#F9B321',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '100',
    marginBottom: 20,
  },
  headingAndroid: {
    color: '#F9B321',
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 20,
    fontFamily: 'sourceSansProLight',
  },
  orTextIos: {
    color: '#F9B321',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '100',
    marginTop: 4,
    marginBottom: 6,
  },
  orTextAndroid: {
    color: '#F9B321',
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'sourceSansProLight',
    marginTop: 4,
    marginBottom: 6,
  },
  introIcon: {
    color: '#278acd',
    fontSize: 8,
    alignSelf: 'center',
  },
  logo: {
    width: 200,
    alignSelf: 'center',
    marginTop: '20%',
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
  button: {
    backgroundColor: '#278acd',
    width: '90%',
    paddingVertical: 13,
    borderRadius: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonIcon: {
    color: '#ffff',
    fontSize: 24,
  },
  buttonText: {
    color: '#ffff',
    paddingLeft: 15,
    fontSize: 18,
  },
})

export default RegisterOrLoginScreen
