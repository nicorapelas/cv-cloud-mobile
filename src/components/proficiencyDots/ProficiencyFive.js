import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const ProficiencyFive = ({ color, zoom }) => {
  return (
    <View style={styles.bed}>
      <FontAwesome
        style={styles.dot}
        size={zoom === 'zoomedIn' ? 20 : 8}
        name="circle"
        color={color === 'white' ? color : 'black'}
      />
      <FontAwesome
        style={styles.dot}
        size={zoom === 'zoomedIn' ? 20 : 8}
        name="circle"
        color={color === 'white' ? color : 'black'}
      />
      <FontAwesome
        style={styles.dot}
        size={zoom === 'zoomedIn' ? 20 : 8}
        name="circle"
        color={color === 'white' ? color : 'black'}
      />
      <FontAwesome
        style={styles.dot}
        size={zoom === 'zoomedIn' ? 20 : 8}
        name="circle"
        color={color === 'white' ? color : 'black'}
      />
      <FontAwesome
        style={styles.dot}
        size={zoom === 'zoomedIn' ? 20 : 8}
        name="circle"
        color={color === 'white' ? color : 'black'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  bed: {
    flexDirection: 'row'
  },
  dot: {
    paddingTop: 10,
    paddingHorizontal: 1
  }
})

export default ProficiencyFive
