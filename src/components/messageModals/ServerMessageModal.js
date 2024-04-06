import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Overlay } from 'react-native-elements'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Context as UniversalContext } from '../../context/UniversalContext'

const ServerMessageModal = () => {
  const {
    state: { serverMessageModalShow },
    hideServerMessageModal
  } = useContext(UniversalContext)

  const renderModal = () => {
    return (
      <Overlay
        isVisible={serverMessageModalShow}
        windowBackgroundColor="rgba(0, 0, 0, 0.7)"
        overlayBackgroundColor="rgba(0, 0, 0, 0)"
        width="auto"
        height="auto"
      >
        <View style={styles.messageBed}>
          <View style={styles.headingBed}>
            <MaterialCommunityIcons
              style={styles.headingIcon}
              name="lightbulb-on"
            />
          </View>
          <View style={styles.hintListBed}>
            <Text>server message here...</Text>
          </View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => hideServerMessageModal()}
          >
            <Ionicons
              style={styles.backButtonIcon}
              name="ios-close-circle-outline"
            />
            <Text style={styles.backButtonText}>close</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    )
  }

  return renderModal()
}

const styles = StyleSheet.create({
  messageBed: {
    backgroundColor: '#232936',
    width: '80%',
    padding: 15,
    borderRadius: 10
  },
  headingBed: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingBottom: 5
  },
  headingIcon: {
    color: '#7ac6fa',
    fontSize: 30,
    paddingLeft: 5
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20
  },
  backButtonIcon: {
    color: '#F9B321',
    paddingRight: 7,
    paddingTop: 2,
    fontSize: 20
  },
  backButtonText: {
    color: '#F9B321',
    fontSize: 18
  }
})

export default ServerMessageModal
