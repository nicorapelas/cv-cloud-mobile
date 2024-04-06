import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

import BurgerMenu from '../components/burgerMenu/BurgerMenu'
import logo from '../../assets/images/logo-h79.png'

const Header = () => {
  const renderContent = () => {
    return (
      <View style={styles.bed}>
        <Image style={styles.logo} source={logo} resizeMode="contain" />
        <BurgerMenu />
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  bed: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  logo: {
    width: 150,
    marginBottom: -23,
    marginLeft: 10
  }
})

export default Header
