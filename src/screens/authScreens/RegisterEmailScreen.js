import React, { useState, useContext } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Text } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'
import { Feather, Ionicons } from '@expo/vector-icons'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { useKeyboard } from '@react-native-community/hooks'

import NavLink from '../../components/links/NavLink'
import LoaderFullScreen from '../../components/loadingModals/LoaderFullScreen'
import { Context as AuthContext } from '../../context/AuthContext'
import ModalLink from '../../components/links/ModalLink'
import logo from '../../../assets/images/logo-w400.png'

const RegisterEmailScreen = () => {
  const {
    state: { loading, apiMessage, errorMessage, introAffiliateCode },
    register,
    clearApiMessage,
    clearErrorMessage,
  } = useContext(AuthContext)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const keyboard = useKeyboard()

  const renderInstruction = () => {
    if (apiMessage || errorMessage) return null
    return (
      <>
        {password.length < 6 ? (
          <Text style={styles.passwordMessage}>
            Password must be 6 or more characters
          </Text>
        ) : null}
        {password !== password2 || password.length < 1 ? (
          <Text style={styles.passwordMessage}>Passwords must match</Text>
        ) : null}
      </>
    )
  }

  const renderErrorMessage = () => {
    if (!errorMessage) return null
    const { email, password, password2 } = errorMessage
    return (
      <View style={styles.errorMessageBed}>
        {!email ? null : <Text style={styles.errorText}>{email}</Text>}
        {!password ? null : <Text style={styles.errorText}>{password}</Text>}
        {!password2 ? null : <Text style={styles.errorText}>{password2}</Text>}
      </View>
    )
  }

  const renderSuccessMessage = () => {
    if (!apiMessage) return null
    const { success } = apiMessage
    return (
      <ModalLink buttonText="OK" message={success} routeName="LoginEmail" />
    )
  }

  const renderForm = () => {
    return (
      <View style={styles.container}>
        {renderSuccessMessage()}
        <Image style={styles.logo} source={logo} resizeMode="contain" />
        <Text
          style={
            Platform.OS === 'ios' ? styles.headingIos : styles.headingAndroid
          }
        >
          Sign up with your email
        </Text>
        <View style={styles.formInputs}>
          <TextInput
            style={styles.input}
            textAlign="center"
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
            autoCorrect={false}
            onFocus={clearErrorMessage}
          />
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            textAlign="center"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={clearErrorMessage}
          />
          {renderInstruction()}
          {renderErrorMessage()}
          <View style={styles.passwordInputBed}>
            <TextInput
              style={styles.passwordInput}
              textAlign="center"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
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
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            value={password2}
            onChangeText={setPassword2}
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={clearErrorMessage}
            secureTextEntry={!showPassword}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            register({
              fullName,
              email,
              password,
              password2,
              introAffiliateCode,
            })
          }
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.navLink}>
          <NavLink
            routeName="LoginEmail"
            text="Already have an account? Login here."
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

RegisterEmailScreen.navigationOptions = ({ navigation }) => {
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
  passwordMessage: {
    color: '#F9B321',
  },
  input: {
    backgroundColor: '#ffff',
    height: 50,
    width: '80%',
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
  link: {
    textAlign: 'center',
    color: 'blue',
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
  navLink: {
    paddingTop: 30,
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
})

export default RegisterEmailScreen
