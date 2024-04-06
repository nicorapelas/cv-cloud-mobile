import React, { useContext, useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { Context as BurgerMenuContext } from '../../context/BurgerMenuContext'
import { Context as AuthContext } from '../../context/AuthContext'

const DeleteAccount = () => {
  const [showDeleteLoader, setShowDeleteLoader] = useState(false)

  const {
    state: {
      termAndConditionsVisible,
      signOutMessageVisible,
      deleteAccountMessageVisible,
      affiliateInfoVisible,
      managmentMenuVisible
    },
    setBurgerMenuVisible,
    setDeleteAccountMessageVisible
  } = useContext(BurgerMenuContext)

  const {
    state: { apiMessage },
    deleteAccount,
    signout
  } = useContext(AuthContext)

  useEffect(() => {
    if (apiMessage) {
      if (apiMessage.success === 'User successfully deleted') {
        setTimeout(() => {
          setBurgerMenuVisible(false)
          setDeleteAccountMessageVisible(false)
          signout()
        }, 3500)
      }
    }
  }, [apiMessage])

  const deleteLoader = () => {
    return (
      <View style={styles.deleteLoaderBed}>
        <Text style={styles.deleteText}>
          {!apiMessage ? 'Deletion in progress' : apiMessage.success}
        </Text>
        {!apiMessage ? (
          <ActivityIndicator
            size="small"
            color="#ededed"
            style={styles.spinner}
          />
        ) : null}
      </View>
    )
  }

  const button = () => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setDeleteAccountMessageVisible(true)
        }}
      >
        <Text style={styles.buttonText}>Delete my account</Text>
      </TouchableOpacity>
    )
  }

  const renderMessage = () => {
    return (
      <View style={styles.messageBed}>
        <Text style={styles.messageHeading}>Delete account</Text>
        <Text style={styles.messageText}>
          Deleting your account is irreversible and all your CV Cloud data will
          be lost!
        </Text>
        <Text style={styles.messageText}>
          Are you sure you want to delete your account?
        </Text>
        <TouchableOpacity
          style={styles.messageSignOutButton}
          onPress={() => {
            setShowDeleteLoader(true)
            deleteAccount()
          }}
        >
          <Text style={styles.messageSignOutButtonText}>yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.messageBackButton}
          onPress={() => setDeleteAccountMessageVisible(false)}
        >
          <Ionicons
            style={styles.messageBackButtonIcon}
            name="ios-close-circle-outline"
          />
          <Text style={styles.messageBackButtonText}>cancel</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderContent = () => {
    if (
      termAndConditionsVisible ||
      affiliateInfoVisible ||
      managmentMenuVisible ||
      signOutMessageVisible
    )
      return null
    if (showDeleteLoader) return deleteLoader()
    if (deleteAccountMessageVisible) return renderMessage()
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
    borderRadius: 10,
    borderColor: '#ff0000',
    borderWidth: 1
  },
  messageHeading: {
    color: '#ff0000',
    fontSize: 20,
    alignSelf: 'center',
    paddingBottom: 5
  },
  messageText: {
    color: '#ffff',
    textAlign: 'center'
  },
  messageSignOutButton: {
    backgroundColor: '#ff0000',
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
  },
  deleteLoaderBed: {
    backgroundColor: '#232936',
    borderRadius: 10,
    borderColor: '#ff0000',
    borderWidth: 1,
    width: '75%',
    padding: 15,
    alignSelf: 'center'
  },
  deleteText: {
    alignSelf: 'center',
    color: '#ffff',
    fontSize: 16
  },
  spinner: {
    paddingTop: 15
  }
})

export default DeleteAccount
