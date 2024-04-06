import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { Overlay } from 'react-native-elements'

const LoaderModal = ({ loading }) => {
  const loadingStatus = !loading || loading === null ? false : true

  return (
    <Overlay
      isVisible={loadingStatus}
      windowBackgroundColor="rgba(0, 0, 0, 0.7)"
      overlayBackgroundColor="rgba(0, 0, 0, 1)"
      width="auto"
      height="auto"
    >
      <ActivityIndicator size="small" color="#ededed" />
    </Overlay>
  )
}

const styles = StyleSheet.create({})

export default LoaderModal
