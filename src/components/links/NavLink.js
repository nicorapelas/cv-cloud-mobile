import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

const NavLink = ({ navigation, text, routeName }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate({ routeName })}>
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  link: {
    color: '#278acd',
    width: '90%',
    paddingHorizontal: 5,
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'center',
    textAlign: 'center'
  }
})

export default withNavigation(NavLink)
