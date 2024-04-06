import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import { AntDesign } from '@expo/vector-icons'
import { View } from 'react-native'

const DoneButton = ({ navigation, routeName, text }) => {
  return (
    <View style={styles.bed}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate({ routeName })}
      >
        <AntDesign name="checkcircle" style={styles.icon} />
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  bed: {
    backgroundColor: '#232936',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#278acd',
    borderColor: '#ffff',
    borderWidth: 2,
    borderRadius: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
    marginVertical: 5
  },
  icon: {
    color: '#ffff',
    fontSize: 16,
    marginTop: 2,
    marginRight: 5
  },
  text: {
    color: '#ffff',
    fontSize: 16
  }
})

export default withNavigation(DoneButton)
