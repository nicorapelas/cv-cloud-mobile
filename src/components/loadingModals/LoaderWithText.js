import React from 'react'
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native'

const LoaderWithText = ({ mainText, subText }) => {
  const renderLoader = () => {
    return (
      <View style={styles.bed}>
        <ActivityIndicator size="small" color="#ededed" />
        <Text style={styles.mainText}>{mainText}</Text>
        <Text style={styles.subText}>{subText}</Text>
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
  },
  mainText: {
    color: '#278ACD',
    fontSize: 18,
    marginTop: 12,
    alignSelf: 'center'
  },
  subText: {
    width: '75%',
    color: '#278ACD',
    fontSize: 15,
    marginTop: 13,
    alignSelf: 'center',
    textAlign: 'center'
  }
})

export default LoaderWithText
