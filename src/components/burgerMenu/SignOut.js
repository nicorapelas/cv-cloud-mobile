import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { Context as BurgerMenuContext } from '../../context/BurgerMenuContext'
import { Context as AuthContext } from '../../context/AuthContext'

const SignOut = () => {
  const {
    state: {
      termAndConditionsVisible,
      signOutMessageVisible,
      affiliateInfoVisible,
      deleteAccountMessageVisible,
      managmentMenuVisible
    },
    setBurgerMenuVisible,
    setSignOutMessageVisible
  } = useContext(BurgerMenuContext)

  const { signout } = useContext(AuthContext)

  const button = () => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setSignOutMessageVisible(true)
        }}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    )
  }

  const renderMessage = () => {
    return (
      <View style={styles.messageBed}>
        <Text style={styles.messageHeading}>Sign out</Text>
        <Text style={styles.messageText}>
          Are you sure you would like to sign out?
        </Text>
        <TouchableOpacity
          style={styles.messageSignOutButton}
          onPress={() => {
            setBurgerMenuVisible(false)
            setSignOutMessageVisible(false)
            signout()
          }}
        >
          <Text style={styles.messageSignOutButtonText}>Sign out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.messageBackButton}
          onPress={() => setSignOutMessageVisible(false)}
        >
          <Ionicons
            style={styles.messageBackButtonIcon}
            name="ios-close-circle-outline"
          />
          <Text style={styles.messageBackButtonText}>back</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderContent = () => {
    if (
      termAndConditionsVisible ||
      affiliateInfoVisible ||
      managmentMenuVisible ||
      deleteAccountMessageVisible
    )
      return null
    if (signOutMessageVisible) return renderMessage()
    return button()
  }

  return renderContent()
}

const styles = StyleSheet.create({
  messageBed: {
    backgroundColor: '#232936',
    width: '80%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 10
  },
  messageHeading: {
    color: '#7ac6fa',
    fontSize: 20,
    alignSelf: 'center',
    paddingBottom: 5
  },
  messageText: {
    color: '#7ac6fa',
    textAlign: 'center'
  },
  messageSignOutButton: {
    backgroundColor: '#278acd',
    alignSelf: 'center',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginVertical: 20
  },
  messageSignOutButtonText: {
    color: '#ffff',
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  messageBackButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5
  },
  messageBackButtonIcon: {
    color: '#F9B321',
    paddingRight: 5,
    fontSize: 18
  },
  messageBackButtonText: {
    color: '#F9B321',
    fontSize: 16
  },
  button: {
    backgroundColor: '#278ACD',
    borderColor: '#ffff',
    alignSelf: 'center',
    width: '80%',
    borderWidth: 2,
    borderRadius: 7,
    marginVertical: 3,
    padding: 7
  },
  buttonText: {
    color: '#ffff',
    fontSize: 16,
    textAlign: 'center'
  }
})

export default SignOut
