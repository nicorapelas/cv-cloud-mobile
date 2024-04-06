import React, { useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Text, Overlay } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

import { Context as AuthContext } from '../../context/AuthContext'

const ModalLink = ({ navigation, message, routeName, buttonText }) => {
  const { clearErrorMessage, clearApiMessage } = useContext(AuthContext)

  const visible = !message || message === null ? false : true

  return (
    <Overlay
      isVisible={visible}
      windowBackgroundColor="rgba(0, 0, 0, 0.75)"
      overlayBackgroundColor="rgba(0, 0, 0, 1)"
      width="auto"
      height="auto"
    >
      <View style={styles.messageBed}>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.messageTextIos
              : styles.messageTextAndroid
          }
        >
          {message}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate({ routeName })
            clearErrorMessage()
            clearApiMessage()
          }}
        >
          <Text style={styles.button}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  messageBed: {
    width: '90%',
    borderRadius: 7
  },
  messageTextIos: {
    color: '#F9B321',
    fontWeight: '100',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  messageTextAndroid: {
    color: '#F9B321',
    fontFamily: 'sourceSansProLight',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  button: {
    color: '#ffff',
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
    alignSelf: 'center',
    width: 'auto',
    backgroundColor: '#59BB46'
  }
})

export default withNavigation(ModalLink)
