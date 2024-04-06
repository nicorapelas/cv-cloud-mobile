import React, { useState, useContext } from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { Text } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'
import { Feather, Ionicons } from '@expo/vector-icons'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { useKeyboard } from '@react-native-community/hooks'

import NavLink from '../../components/links/NavLink'
import ModalLink from '../../components/links/ModalLink'
import EmailVerificationModal from './EmailVerificationModal'
import LoaderFullScreen from '../../components/loadingModals/LoaderFullScreen'
import logo from '../../../assets/images/logo-w400.png'
import { Context as AuthContext } from '../../context/AuthContext'

const LoginEmailScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPasswors] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const {
    state: { loading, errorMessage, apiMessage },
    login,
    clearApiMessage,
    clearErrorMessage,
  } = useContext(AuthContext)

  const keyboard = useKeyboard()

  const renderWarnMessage = () => {
    if (!errorMessage || apiMessage) return null
    const { warn } = errorMessage
    if (!warn) return null
    return <ModalLink buttonText="OK" message={warn} routeName="LoginEmail" />
  }

  const renderNotVerifiedMessage = () => {
    if (!errorMessage || apiMessage) return null
    const { notVerified } = errorMessage
    if (!notVerified) return null
    return (
      <EmailVerificationModal
        buttonOneText="OK"
        message={notVerified}
        routeName="LoginEmail"
        buttonTwoText="Re-send verification email"
        email={email}
      />
    )
  }

  const renderErrorMessage = () => {
    if (!errorMessage || apiMessage) return null
    const { email, password } = errorMessage
    const { notVerified } = errorMessage
    if (notVerified) return null
    return (
      <View style={styles.errorMessageBed}>
        {!email ? null : <Text style={styles.errorText}>{email}</Text>}
        {!password ? null : <Text style={styles.errorText}>{password}</Text>}
      </View>
    )
  }

  const renderResendSuccessMessage = () => {
    if (!apiMessage) return null
    const { success } = apiMessage
    if (!success) return null
    return (
      <ModalLink buttonText="OK" message={success} routeName="LoginEmail" />
    )
  }

  const renderForm = () => {
    return (
      <View style={styles.container}>
        {renderWarnMessage()}
        {renderNotVerifiedMessage()}
        {renderResendSuccessMessage()}
        <Image style={styles.logo} source={logo} resizeMode="contain" />
        <Text
          style={
            Platform.Os === 'ios' ? styles.headingIos : styles.headingAndroid
          }
        >
          Login with email
        </Text>
        <View style={styles.formInputs}>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={clearErrorMessage}
          />
          <View style={styles.passwordInputBed}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              value={password}
              onChangeText={setPasswors}
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={clearErrorMessage}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeButtonBed}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                style={styles.eyeButtonIcon}
                name={showPassword ? 'ios-eye' : 'ios-eye-off'}
              />
            </TouchableOpacity>
          </View>
        </View>
        {renderErrorMessage()}
        <TouchableOpacity
          style={styles.button}
          onPress={() => login({ email, password })}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.navLink}>
          <NavLink
            routeName="RegisterEmail"
            text="Don't have an account? Register here."
          />
        </View>
        <View style={styles.navLink}>
          <NavLink
            routeName="PasswordForgot"
            text="Forgot your password? Reset password here."
          />
        </View>
      </View>
    )
  }

  const renderContent = () => {
    if (loading) return <LoaderFullScreen />
    return (
      <>
        <NavigationEvents
          onWillBlur={(clearApiMessage, clearErrorMessage)}
          onWillFocus={(clearApiMessage, clearErrorMessage)}
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

LoginEmailScreen.navigationOptions = ({ navigation }) => {
  return {
    title: '',
    headerStyle: { backgroundColor: '#232936' },
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.navigate('RegisterOrLogin')}>
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
    width: '80%',
    textAlign: 'center',
    borderRadius: 7,
    margin: 5,
  },
  passwordInputBed: {
    flexDirection: 'row',
    width: '80%',
  },
  passwordInput: {
    backgroundColor: '#ffff',
    height: 50,
    textAlign: 'center',
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    marginVertical: 5,
    flex: 3,
  },
  eyeButtonBed: {
    backgroundColor: '#555555',
    flex: 1,
    justifyContent: 'center',
    marginVertical: 5,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  eyeButtonIcon: {
    color: '#ffff',
    fontSize: 30,
    alignSelf: 'center',
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
    marginBottom: 10,
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
  errorMessageBed: {
    backgroundColor: 'red',
    borderRadius: 7,
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 15,
    marginVertical: 5,
  },
  errorText: {
    color: '#ffff',
    textAlign: 'center',
    fontSize: 18,
  },
  navLink: {
    paddingTop: 20,
    alignSelf: 'center',
    flexWrap: 'wrap',
  },
})

export default LoginEmailScreen
