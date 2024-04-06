import React, { useContext } from 'react'
import { View, StyleSheet, Image, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'

import { Context as AuthContext } from '../context/AuthContext'
import logo from '../../assets/images/logo-w400.png'

const RegisterAndLoginOptions = ({ heading, introAffiliateCode }) => {
  const { clearApiMessage } = useContext(AuthContext)

  return (
    <View style={styles.bed}>
      <NavigationEvents
        onWillBlur={clearApiMessage}
        onWillFocus={clearApiMessage}
      />
      <Image style={styles.logo} source={logo} resizeMode="contain" />
      <Text
        style={
          Platform.OS === 'ios' ? styles.headingIos : styles.headingAndroid
        }
      >
        {heading}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  bed: {
    flexDirection: 'column',
  },
  logo: {
    width: 200,
    alignSelf: 'center',
    marginTop: 70,
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
})

export default RegisterAndLoginOptions
