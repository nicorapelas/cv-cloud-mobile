import React, { useContext } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { SocialIcon } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'

import LoaderFullScreen from '../../components/loadingModals/LoaderWithText'
import RegisterAndLoginOptions from '../../components/RegisterAndLoginOptions'
import { Context as AuthContext } from '../../context/AuthContext'
import ModalLink from '../../components/links/ModalLink'
import NavLink from '../../components/links/NavLink'

const LoginScreen = ({ navigation }) => {
  const {
    state: { loading, apiMessage },
    clearApiMessage,
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

  const renderContent = () => {
    if (loading) return <LoaderFullScreen />
    return (
      <View style={Platform.OS === 'ios' ? styles.bedIos : styles.bedAndroid}>
        <View style={styles.container}>
          {renderApiMessage()}
          <NavigationEvents
            onWillBlur={clearApiMessage}
            onWillFocus={clearApiMessage}
          />
          <RegisterAndLoginOptions heading="Login here" />
          <View style={styles.emailButton}>
            <SocialIcon
              title="Email"
              button
              light
              type="envelope"
              onPress={() => navigation.navigate('LoginEmail')}
            />
          </View>
          <View style={styles.navLink}>
            <NavLink
              routeName="Register"
              text="Don't have an account? Sign up here"
            />
          </View>
        </View>
      </View>
    )
  }

  return renderContent()
}

LoginScreen.navigationOptions = () => {
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  navLink: {
    paddingTop: 30,
  },
})

export default LoginScreen
