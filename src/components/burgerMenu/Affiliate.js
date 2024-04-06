import React, { useContext, useEffect } from 'react'
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
import { Context as AffiliateContext } from '../../context/AffiliateContext'

const Affiliate = () => {
  const {
    state: {
      termAndConditionsVisible,
      signOutMessageVisible,
      deleteAccountMessageVisible,
      affiliateInfoVisible,
      managmentMenuVisible
    },
    setAffiliateInfoVisible
  } = useContext(BurgerMenuContext)

  const {
    state: { user, loading: loadingAuth }
  } = useContext(AuthContext)

  const {
    state: { affiliateInfo, affiliateIntros, loading: loadingAffiliate },
    fetchAffiliateInfo,
    fetchAffiliatesIntros
  } = useContext(AffiliateContext)

  useEffect(() => {
    fetchAffiliateInfo()
    fetchAffiliatesIntros()
  }, [])

  const button = () => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setAffiliateInfoVisible(true)
        }}
      >
        <Text style={styles.buttonText}>Affiliate</Text>
      </TouchableOpacity>
    )
  }

  const renderAffiliateInfo = () => {
    if (loadingAffiliate || loadingAffiliate)
      return (
        <ActivityIndicator size="small" color="#ededed" marginVertical="20%" />
      )
    if (!affiliateInfo) return null
    const { name, email, phone, code, introductions } = affiliateInfo
    return (
      <View style={styles.infoBed}>
        <Text style={styles.infoText}>{name}</Text>
        <Text style={styles.infoText}>{email}</Text>
        <Text style={styles.infoText}>{phone}</Text>
        <Text style={styles.infoText}>Code: {code}</Text>
        <Text style={styles.infoText}>Complete intro's: {introductions}</Text>
        <Text style={styles.infoText}>
          Total intro's: {!affiliateIntros ? null : affiliateIntros.length}
        </Text>
      </View>
    )
  }

  const renderContent = () => {
    if (!user) return null
    const { affiliate } = user
    if (
      termAndConditionsVisible ||
      signOutMessageVisible ||
      deleteAccountMessageVisible ||
      managmentMenuVisible ||
      affiliate === false
    )
      return null
    if (affiliateInfoVisible) {
      return (
        <View style={styles.contentBed}>
          <Text style={styles.heading}>Affiliate</Text>
          {renderAffiliateInfo()}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setAffiliateInfoVisible(false)}
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
    return button()
  }

  return renderContent()
}

const styles = StyleSheet.create({
  contentBed: {
    backgroundColor: '#232936',
    width: '80%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 10
  },
  heading: {
    color: '#7ac6fa',
    fontSize: 20,
    alignSelf: 'center'
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5
  },
  backButtonIcon: {
    color: '#F9B321',
    paddingRight: 5,
    fontSize: 18
  },
  backButtonText: {
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
  infoBed: {
    marginVertical: 15
  },
  infoText: {
    color: '#ffff',
    marginVertical: 2
  }
})

export default Affiliate
