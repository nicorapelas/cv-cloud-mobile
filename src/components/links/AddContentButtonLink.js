import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import { MaterialIcons } from '@expo/vector-icons'

const AddContentButtonLink = ({ navigation, text, routeName }) => {
  return (
    <View style={styles.bed}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate({ routeName })}
      >
        <MaterialIcons style={styles.icon} name="add-circle" />
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

export default withNavigation(AddContentButtonLink)
