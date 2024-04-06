import React, { useContext } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

import { Context as BurgerMenuContext } from '../../context/BurgerMenuContext'
import TermsAndConditionsText from './TermsAndConditionsText'

const TermsAndConditionsBurgerButton = () => {
  const {
    state: {
      termAndConditionsVisible,
      signOutMessageVisible,
      deleteAccountMessageVisible,
      affiliateInfoVisible,
      managmentMenuVisible
    },
    setTermsAndConditionVisible
  } = useContext(BurgerMenuContext)

  const button = () => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => setTermsAndConditionVisible(true)}
      >
        <Text style={styles.buttonText}>Terms & Conditions</Text>
      </TouchableOpacity>
    )
  }

  const renderContent = () => {
    if (
      signOutMessageVisible ||
      affiliateInfoVisible ||
      managmentMenuVisible ||
      deleteAccountMessageVisible
    )
      return null
    if (termAndConditionsVisible) return <TermsAndConditionsText />
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
    padding: 7
  },
  buttonText: {
    color: '#ffff',
    fontSize: 16,
    textAlign: 'center'
  }
})

export default TermsAndConditionsBurgerButton
