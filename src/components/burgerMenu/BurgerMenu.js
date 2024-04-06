import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants'
import { Overlay } from 'react-native-elements'
import { Entypo, Ionicons } from '@expo/vector-icons'

import { Context as BurgerMenuContext } from '../../context/BurgerMenuContext'

import TermsAndConditionsBurgerButton from './TermsAndConditionsBurgerButton'
import Affiliate from './Affiliate'
import SignOut from './SignOut'
import DeleteAccount from './DeleteAccount'
import Managment from './managment/Managment'

const BurgerMenu = () => {
  const {
    state: {
      burgerMenuVisible,
      termAndConditionsVisible,
      signOutMessageVisible,
      deleteAccountMessageVisible,
      affiliateInfoVisible,
      managmentMenuVisible,
      latestAppVersion,
    },
    setBurgerMenuVisible,
    setTermsAndConditionVisible,
    setSignOutMessageVisible,
    setAffiliateInfoVisible,
    setManagmentMenuVisible,
    getLatestAppVersion,
  } = useContext(BurgerMenuContext)

  const appVersion = Constants.manifest.version

  useEffect(() => {
    getLatestAppVersion()
  }, [])

  const burgerMenuButton = () => {
    return (
      <TouchableOpacity
        style={styles.burgerMenuIconBed}
        onPress={() => setBurgerMenuVisible(true)}
      >
        <Entypo name="menu" style={styles.burgerMenuIcon} />
      </TouchableOpacity>
    )
  }

  // const burgerMenuButton = () => {
  //   if (appVersion === latestAppVersion || !latestAppVersion) {
  //     return (
  //       <TouchableOpacity
  //         style={styles.burgerMenuIconBed}
  //         onPress={() => setBurgerMenuVisible(true)}
  //       >
  //         <Entypo name="menu" style={styles.burgerMenuIcon} />
  //       </TouchableOpacity>
  //     )
  //   } else {
  //     return (
  //       <TouchableOpacity
  //         style={styles.burgerMenuNoteIconBed}
  //         onPress={() => setBurgerMenuVisible(true)}
  //       >
  //         <View style={styles.menuNoteDot}></View>
  //         <Entypo name="menu" style={styles.burgerMenuIcon} />
  //       </TouchableOpacity>
  //     )
  //   }
  // }

  const burgerMenuModal = () => {
    return (
      <Overlay
        isVisible={burgerMenuVisible}
        overlayStyle={styles.modal}
        onBackdropPress={() => {
          setTermsAndConditionVisible(false)
          setSignOutMessageVisible(false)
          setBurgerMenuVisible(false)
          setAffiliateInfoVisible(false)
          setManagmentMenuVisible(false)
        }}
        width="95%"
        height="auto"
      >
        <View style={styles.burgerMenuBed}>
          {termAndConditionsVisible ||
          signOutMessageVisible ||
          deleteAccountMessageVisible ||
          managmentMenuVisible ||
          affiliateInfoVisible ? null : (
            <TouchableOpacity onPress={() => setBurgerMenuVisible(false)}>
              <Ionicons
                name="close-circle-sharp"
                style={styles.burgerMenuCloseButton}
              />
            </TouchableOpacity>
          )}
          <TermsAndConditionsBurgerButton />
          <Affiliate />
          <Managment />
          <SignOut />
          <DeleteAccount />
          <Text style={styles.versionText}>www.cvcloud.app</Text>
          <Text style={styles.versionText}>v{appVersion}</Text>
        </View>
      </Overlay>
    )
  }

  const renderContent = () => {
    return (
      <>
        {burgerMenuButton()}
        {burgerMenuModal()}
      </>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  burgerMenuIconBed: {
    height: 30,
    alignSelf: 'flex-end',
    flexDirection: 'column',
  },
  burgerMenuIcon: {
    color: Platform.OS === 'android' ? '#7ac6fa' : '#3ba7ee',
    fontSize: 33,
    alignSelf: 'flex-end',
    paddingRight: 7,
    paddingBottom: 2,
  },
  burgerMenuNoteIconBed: {
    height: 30,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  menuNoteDot: {
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 25,
    alignSelf: 'center',
    marginRight: -12,
    zIndex: 1,
  },
  burgerMenuCloseButton: {
    color: '#F9B321',
    fontSize: 30,
    alignSelf: 'flex-end',
  },
  burgerMenuOption: {
    backgroundColor: '#278ACD',
    borderColor: '#ffff',
    alignSelf: 'center',
    width: '80%',
    borderWidth: 2,
    borderRadius: 7,
    marginVertical: 3,
    padding: 7,
  },
  burgerMenuOptionText: {
    color: '#ffff',
    fontSize: 16,
    textAlign: 'center',
  },
  modal: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  versionText: {
    color: '#ffff',
    textAlign: 'center',
    marginVertical: 2,
  },
})

export default BurgerMenu
