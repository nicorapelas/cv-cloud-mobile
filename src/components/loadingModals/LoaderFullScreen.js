import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

const LoaderFullScreen = () => {
  const renderLoader = () => {
    return (
      <View style={styles.bed}>
        <ActivityIndicator size="small" color="#ededed" />
      </View>
    )
  }

  return renderLoader()
}

const styles = StyleSheet.create({
  bed: {
    backgroundColor: '#232936',
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  }
})

export default LoaderFullScreen
