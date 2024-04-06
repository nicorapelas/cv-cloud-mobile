import React, { useState, useContext } from 'react'
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { NavigationEvents } from 'react-navigation'
import { Text } from 'react-native-elements'
import { Feather } from '@expo/vector-icons'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { useKeyboard } from '@react-native-community/hooks'

import LoaderFullScreen from '../../components/loadingModals/LoaderFullScreen'
import { Context as AuthContext } from '../../context/AuthContext'
import ModalLink from '../../components/links/ModalLink'
import logo from '../../../assets/images/logo-w400.png'

const PasswordForgotScreen = () => {
  const [email, setEmail] = useState('')
  const {
    state: { loading, errorMessage, apiMessage },
    forgotPassword,
    clearApiMessage,
    clearErrorMessage,
  } = useContext(AuthContext)

  const keyboard = useKeyboard()

  const renderSuccess = () => {
    if (!apiMessage) return null
    const { success } = apiMessage
    return (
      <>
        {!success || success.length < 1 ? null : (
          <ModalLink buttonText="OK" message={success} routeName="LoginEmail" />
        )}
      </>
    )
  }

  const renderInstruction = () => {
    if (!errorMessage) {
      return (
        <View style={styles.instructionBed}>
          <Text style={styles.noteText}>
            Enter your email and we'll email instructions on how to reset your
            password.
          </Text>
        </View>
      )
    }
  }

  const renderError = () => {
    if (!errorMessage) return null
    return (
      <>
        {!errorMessage ? null : (
          <View style={styles.errorMessageBed}>
            {!errorMessage.email ? null : (
              <Text style={styles.errorText}>{errorMessage.email}</Text>
            )}
          </View>
        )}
        {!errorMessage.warn ? null : (
          <ModalLink
            buttonText="OK"
            message={errorMessage.warn}
            routeName="LoginEmail"
          />
        )}
      </>
    )
  }

  const renderForm = () => {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} resizeMode="contain" />
        <Text
          style={
            Platform.OS === 'ios' ? styles.headingIos : styles.headingAndroid
          }
        >
          Password reset
        </Text>
        <View style={styles.formInputs}>
          <TextInput
            style={styles.input}
            textAlign="center"
            placeholder="Email address"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => {
              clearErrorMessage()
              clearApiMessage()
            }}
          />
          {renderInstruction()}
          {renderSuccess()}
          {renderError()}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => forgotPassword({ email })}
        >
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderContent = () => {
    if (loading) return <LoaderFullScreen />
    return (
      <>
        <NavigationEvents
          onWillBlur={() => {
            clearErrorMessage()
            clearApiMessage()
          }}
          onWillFocus={() => {
            clearErrorMessage()
            clearApiMessage()
          }}
        />
        <View
          View
          style={
            Platform.OS === 'ios' && keyboard.keyboardShown === false
              ? styles.bedIos
              : styles.bedAndroid
          }
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            keyboardShouldPersistTaps="always"
          >
            {renderForm()}
          </ScrollView>
          {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
        </View>
      </>
    )
  }

  return renderContent()
}

PasswordForgotScreen.navigationOptions = ({ navigation }) => {
  return {
    title: '',
    headerStyle: { backgroundColor: '#232936' },
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.navigate('LoginEmail')}>
        <Feather style={styles.navArrow} name="arrow-left" />
      </TouchableOpacity>
    ),
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  navArrow: {
    color: '#F9B321',
    fontSize: 30,
    paddingLeft: 15,
  },
  formInputs: {
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#ffffff',
    height: 50,
    width: '85%',
    textAlign: 'center',
    borderRadius: 7,
    margin: 5,
  },
  logo: {
    width: 200,
    alignSelf: 'center',
  },
  headingIos: {
    color: '#F9B321',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '100',
    marginBottom: 10,
  },
  headingAndroid: {
    color: '#F9B321',
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 10,
    fontFamily: 'sourceSansProLight',
  },
  button: {
    backgroundColor: '#278acd',
    width: '65%',
    alignSelf: 'center',
    borderRadius: 7,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonIcon: {
    color: '#ffff',
    paddingRight: 10,
    marginTop: 13,
  },
  buttonText: {
    color: '#ffff',
    paddingVertical: 10,
  },
  instructionBed: {
    backgroundColor: '#298ACD',
    borderRadius: 7,
    width: '85%',
    alignSelf: 'center',
    padding: 7,
    marginBottom: 10,
  },
  noteText: {
    color: '#ffff',
    textAlign: 'center',
    fontSize: 18,
  },
  errorMessageBed: {
    backgroundColor: 'red',
    borderRadius: 7,
    width: '85%',
    alignSelf: 'center',
    paddingVertical: 15,
    marginBottom: 10,
  },
  errorText: {
    color: '#ffff',
    alignSelf: 'center',
  },
})

export default PasswordForgotScreen
