import React from 'react'
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'

const BitNoData = ({ navigation, cvBit, routeName, buttonText }) => {
  return (
    <View style={styles.messageBed}>
      <FontAwesome style={styles.folderIcon} name="folder-open" />
      <Text
        style={
          Platform.OS === 'ios'
            ? styles.messageTextIos
            : styles.messageTextAndroid
        }
      >
        {cvBit}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate({ routeName })
        }}
      >
        <MaterialIcons style={styles.buttonIcon} name="add-circle" />
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.navigate('Dashboard')
        }}
      >
        <Ionicons style={styles.backButtonIcon} name="ios-arrow-back" />
        <Text style={styles.backButtonText}>back</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  messageBed: {
    width: '80%',
    alignSelf: 'center',
  },
  folderIcon: {
    color: '#F9B321',
    alignSelf: 'center',
    fontSize: 55,
  },
  messageTextIos: {
    color: '#F9B321',
    fontWeight: '100',
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 30,
  },
  messageTextAndroid: {
    color: '#F9B321',
    fontFamily: 'sourceSansProLight',
    fontSize: 25,
    lineHeight: 30,
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 30,
  },
  button: {
    backgroundColor: '#278ACD',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#ffff',
    borderWidth: 2,
    alignSelf: 'center',
    width: 'auto',
    flexDirection: 'row',
  },
  buttonIcon: {
    color: '#ffff',
    fontSize: 22,
    paddingRight: 5,
  },
  buttonText: {
    color: '#ffff',
    paddingTop: 2,
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  backButtonIcon: {
    color: '#F9B321',
    paddingRight: 2,
    paddingTop: 2,
    fontSize: 16,
  },
  backButtonText: {
    color: '#F9B321',
    fontSize: 16,
  },
})

export default withNavigation(BitNoData)
