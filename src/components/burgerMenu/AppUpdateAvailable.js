import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import AppLink from 'react-native-app-link'

import { Context as BurgerMenuContext } from '../../context/BurgerMenuContext'

const AppUpdateAvailable = () => {
  const {
    state: {
      signOutMessageVisible,
      deleteAccountMessageVisible,
      affiliateInfoVisible,
      managmentMenuVisible,
      termAndConditionsVisible,
    },
    setBurgerMenuVisible,
  } = useContext(BurgerMenuContext)

  const button = () => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          AppLink.openInStore({
            appName: 'cv-cloud',
            appStoreId: '1600222322',
            appStoreLocale: 'za',
            playStoreId: 'app.cvcloud.www',
          })
          setBurgerMenuVisible(false)
        }}
      >
        <View style={styles.menuNoteDot}></View>
        <Text style={styles.buttonText}>Update available</Text>
      </TouchableOpacity>
    )
  }

  const renderContent = () => {
    if (
      signOutMessageVisible ||
      affiliateInfoVisible ||
      managmentMenuVisible ||
      deleteAccountMessageVisible ||
      termAndConditionsVisible
    )
      return null
    return button()
  }

  return renderContent()
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#278ACD',
    borderColor: '#ffff',
    alignSelf: 'center',
    width: '80%',
    borderWidth: 2,
    borderRadius: 7,
    marginVertical: 3,
    padding: 7,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffff',
    fontSize: 16,
    textAlign: 'center',
    paddingLeft: 10,
  },
  menuNoteDot: {
    borderColor: 'red',
    borderWidth: 7,
    height: 7,
    borderRadius: 25,
    marginLeft: -25,
    marginTop: 4,
  },
})

export default AppUpdateAvailable
