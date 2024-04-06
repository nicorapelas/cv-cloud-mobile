import React, { useContext } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

import { Context as UniversalContext } from '../../context/UniversalContext'

const HeaderBackButtonLink = ({ navigation, routeName }) => {
  const {
    state: { hideNaveLink }
  } = useContext(UniversalContext)

  return (
    <View style={hideNaveLink ? styles.bedHidden : styles.bedVisible}>
      <TouchableOpacity
        style={styles.navArrowBed}
        onPress={() => navigation.navigate({ routeName })}
      >
        <Ionicons style={styles.navArrow} name="ios-arrow-back" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  bedVisible: {},
  bedHidden: {
    display: 'none'
  },
  navArrowBed: {
    width: 40
  },
  navArrow: {
    color: '#ffff',
    fontSize: 23,
    paddingLeft: 15
  }
})

export default withNavigation(HeaderBackButtonLink)
