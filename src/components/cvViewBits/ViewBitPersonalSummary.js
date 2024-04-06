import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ViewBitPersonalSummary = ({
  personalSummary,
  personalSummarySample,
  showSample,
  zoom
}) => {
  const renderContent = () => {
    if (
      personalSummary === null ||
      !personalSummary[0] ||
      personalSummary.length < 1
    )
      return null
    const { content } = personalSummary[0]
    return (
      <View
        style={zoom === 'zoomedOut' ? stylesZoomedOut.bed : stylesZoomedIn.bed}
      >
        <Text
          style={
            zoom === 'zoomedOut'
              ? stylesZoomedOut.heading
              : stylesZoomedIn.heading
          }
        >
          Personal Summary
        </Text>
        <Text
          style={
            zoom === 'zoomedOut' ? stylesZoomedOut.text : stylesZoomedIn.text
          }
        >
          {content}
        </Text>
        <View
          style={zoom === 'zoomedOut' ? stylesZoomedOut.hr : stylesZoomedIn.hr}
        />
      </View>
    )
  }

  const renderSampleContent = () => {
    if (
      personalSummarySample === null ||
      !personalSummarySample[0] ||
      personalSummarySample.length < 1
    )
      return null
    const { content } = personalSummarySample[0]
    return (
      <View
        style={zoom === 'zoomedOut' ? stylesZoomedOut.bed : stylesZoomedIn.bed}
      >
        <Text
          style={
            zoom === 'zoomedOut'
              ? stylesZoomedOut.heading
              : stylesZoomedIn.heading
          }
        >
          Personal Summary
        </Text>
        <Text
          style={
            zoom === 'zoomedOut' ? stylesZoomedOut.text : stylesZoomedIn.text
          }
        >
          {content}
        </Text>
        <View
          style={zoom === 'zoomedOut' ? stylesZoomedOut.hr : stylesZoomedIn.hr}
        />
      </View>
    )
  }

  return !showSample ? renderContent() : renderSampleContent()
}

const stylesZoomedOut = StyleSheet.create({
  bed: {
    backgroundColor: '#ffff'
  },
  heading: {
    color: '#278ACD',
    fontFamily: 'oswaldBold',
    textTransform: 'uppercase',
    fontSize: 11,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 2
  },
  text: {
    fontSize: 8,
    paddingHorizontal: 12
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 5,
    marginHorizontal: 10
  }
})

const stylesZoomedIn = StyleSheet.create({
  bed: {
    backgroundColor: '#ffff',
    paddingRight: 20
  },
  heading: {
    color: '#278ACD',
    fontFamily: 'oswaldBold',
    textTransform: 'uppercase',
    fontSize: 22,
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingBottom: 5
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 25
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 10
  }
})

export default ViewBitPersonalSummary
