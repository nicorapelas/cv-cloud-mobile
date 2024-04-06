import React, { useState, useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

import { Context as BurgerMenuContext } from '../../../context/BurgerMenuContext'
import { Context as AuthContext } from '../../../context/AuthContext'
import { Context as ConfigContext } from '../../../context/ConfigContext'
import ManageAffiliate from './ManageAffiliate'
import UsersInfo from './UsersInfo'

const Managment = () => {
  const [pin, setPin] = useState(null)
  const [affiliateFormType, setAffiliateFormType] = useState(null)
  const [userId, setUserId] = useState(null)
  const [userPin, setUserPin] = useState(null)

  const {
    state: {
      termAndConditionsVisible,
      signOutMessageVisible,
      affiliateInfoVisible,
      managmentMenuVisible,
    },
    setManagmentMenuVisible,
  } = useContext(BurgerMenuContext)

  const {
    state: { loading, configData },
    fetchConfigInfo,
  } = useContext(ConfigContext)

  const {
    state: { user },
    clearApiMessage,
    clearErrorMessage,
    clearAffiliateInfo,
    clearAffiliates,
  } = useContext(AuthContext)

  useEffect(() => {
    fetchConfigInfo({ info: 'tdData' })
  }, [])

  useEffect(() => {
    if (configData) {
      setUserId(configData.id)
      setUserPin(configData.pin)
    }
  }, [configData])

  const button = () => {
    if (configData.length < 1) return null
    const { _id } = user
    if (_id !== userId) return null
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setManagmentMenuVisible(true)
        }}
      >
        <Text style={styles.buttonText}>Managment</Text>
      </TouchableOpacity>
    )
  }

  const pinInput = () => {
    return (
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        secureTextEntry={true}
        textAlign="center"
        placeholder="pin"
        value={pin}
        onChangeText={setPin}
        autoCorrect={false}
      />
    )
  }

  const renderMenu = () => {
    if (pin !== userPin) return pinInput()
    return (
      <View style={styles.bed}>
        <Text style={styles.heading}>Managment</Text>
        {affiliateFormType !== null ? null : (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setAffiliateFormType('createAffiliate')}
            >
              <Text style={styles.buttonText}>Create affiliate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setAffiliateFormType('viewAffiliateInfo')}
            >
              <Text style={styles.buttonText}>View affiliate info</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setAffiliateFormType('viewAffiliates')}
            >
              <Text style={styles.buttonText}>View affiliates</Text>
            </TouchableOpacity>
          </>
        )}
        <ManageAffiliate affiliateFormType={affiliateFormType} />
        <UsersInfo />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            setManagmentMenuVisible(false)
            setPin(null)
            setAffiliateFormType(null)
            clearApiMessage()
            clearErrorMessage()
            clearAffiliateInfo()
            clearAffiliates()
          }}
        >
          <Ionicons
            style={styles.backButtonIcon}
            name="ios-close-circle-outline"
          />
          <Text style={styles.backButtonText}>back</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderContent = () => {
    if (
      user === undefined ||
      termAndConditionsVisible ||
      signOutMessageVisible ||
      affiliateInfoVisible ||
      loading
    )
      return null
    if (managmentMenuVisible) return renderMenu()
    return button()
  }

  return renderContent()
}

const styles = StyleSheet.create({
  bed: {
    backgroundColor: '#232936',
    width: '80%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 10,
  },
  heading: {
    color: '#7ac6fa',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  messageText: {
    color: '#7ac6fa',
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 20,
  },
  backButtonIcon: {
    color: '#F9B321',
    paddingRight: 5,
    fontSize: 18,
  },
  backButtonText: {
    color: '#F9B321',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#278ACD',
    borderColor: '#ffff',
    alignSelf: 'center',
    width: '80%',
    borderWidth: 2,
    borderRadius: 7,
    marginVertical: 3,
    padding: 7,
  },
  buttonText: {
    color: '#ffff',
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#ffff',
    width: '80%',
    borderRadius: 5,
    height: 40,
    alignSelf: 'center',
  },
})

export default Managment
