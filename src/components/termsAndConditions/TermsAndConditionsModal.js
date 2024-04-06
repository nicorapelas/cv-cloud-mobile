import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { Overlay } from 'react-native-elements'
import { withNavigation, NavigationEvents } from 'react-navigation'
import * as Device from 'expo-device'

import TermsAndConditions from './TermsAndConditions'
import { Context as AuthContext } from '../../context/AuthContext'
import { Context as UniversalContext } from '../../context/UniversalContext'

const TermsAndConditionsModal = () => {
  const [visible, setVisible] = useState(false)

  const {
    state: { user, loading },
    fetchUser,
    createDeviceInfo,
    increaseUserVisitCount,
    applyToIntro,
  } = useContext(AuthContext)

  const { buildCV } = useContext(UniversalContext)

  useEffect(() => {
    createDeviceInfo({
      isDevice: Device.isDevice,
      deviceBrand: Device.brand,
      deviceModelName: Device.modelName,
      osVersion: Device.osVersion,
      osBuildId: Device.osBuildId,
      osInternalBuildId: Device.osInternalBuildId,
      deviceName: Device.deviceName,
    })
  }, [])

  useEffect(() => {
    toggleVisible()
  }, [user])

  useEffect(() => {
    increaseUserVisitCount()
  }, [])

  const toggleVisible = () => {
    if (!user) return null
    const { termsAndConditionsAccepted } = user
    if (termsAndConditionsAccepted === false) {
      setVisible(true)
    }
    if (termsAndConditionsAccepted === true) {
      setVisible(false)
    }
  }

  const renderModal = () => {
    return (
      <Overlay
        isVisible={visible}
        overlayStyle={loading ? styles.modalLoading : styles.modal}
        width="auto"
        height="auto"
      >
        <View style={styles.messageBed}>
          {loading ? (
            <ActivityIndicator size="small" color="#ffff" />
          ) : (
            <TermsAndConditions />
          )}
        </View>
      </Overlay>
    )
  }

  return (
    <>
      <NavigationEvents
        onWillBlur={() => {
          fetchUser()
          applyToIntro()
        }}
        onWillFocus={() => {
          fetchUser()
          applyToIntro()
        }}
      />
      {renderModal()}
    </>
  )
}

const styles = StyleSheet.create({
  messageBed: {
    width: '90%',
    height: 500,
    flexDirection: 'column',
    borderRadius: 5,
  },
  modalLoading: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    borderRadius: 5,
  },
})

export default withNavigation(TermsAndConditionsModal)
