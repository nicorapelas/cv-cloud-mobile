import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

import Spacer from './Spacer'

const NavLink = ({ navigation, text, routeName }) => {
  return (
    <Spacer>
      <TouchableOpacity onPress={() => navigation.navigate({ routeName })}>
        <Text style={styles.link}>{text}</Text>
      </TouchableOpacity>
    </Spacer>
  )
}

const styles = StyleSheet.create({
  link: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 18,
  },
})

export default withNavigation(NavLink)
