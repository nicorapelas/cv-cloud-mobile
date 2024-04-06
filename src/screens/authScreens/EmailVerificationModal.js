import React, { useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Text, Overlay } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import { Context as AuthContext } from '../../context/AuthContext'
import LoaderModal from '../../components/loadingModals/LoaderModal'

const EmailVerificationModal = ({
  navigation,
  message,
  routeName,
  email,
  buttonOneText,
  buttonTwoText,
}) => {
  const visible = !message || message === null ? false : true

  const {
    state: { loading },
    resendVerificationEmail,
    clearApiMessage,
    clearErrorMessage,
  } = useContext(AuthContext)

  return (
    <Overlay
      isVisible={visible}
      windowBackgroundColor="rgba(0, 0, 0, 0.75)"
      overlayBackgroundColor="rgba(0, 0, 0, 1)"
      width="auto"
      height="auto"
    >
      <View style={styles.messageBed}>
        <LoaderModal loading={loading} />
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
            clearApiMessage()
            clearErrorMessage()
            navigation.navigate({ routeName })
          }}
        >
          <Text style={styles.button}>{buttonOneText}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => resendVerificationEmail({ email })}>
          <Text style={styles.resendLink}>{buttonTwoText}</Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  messageBed: {
    width: '80%',
    borderRadius: 7,
  },
  messageTextIos: {
    color: '#F9B321',
    fontWeight: '100',
    fontSize: 25,
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  messageTextAndroid: {
    color: '#F9B321',
    fontFamily: 'sourceSansProLight',
    fontSize: 25,
    textAlign: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  button: {
    color: '#ffff',
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
    alignSelf: 'center',
    width: 'auto',
    backgroundColor: '#59BB46',
  },
  resendLink: {
    color: '#ffff',
    fontSize: 16,
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
    alignSelf: 'center',
    width: 'auto',
    backgroundColor: '#288acd',
  },
})

export default withNavigation(EmailVerificationModal)
