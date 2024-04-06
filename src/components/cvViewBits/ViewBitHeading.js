import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import moment from 'moment'

const ViewBitHeading = ({
  viewHeading,
  viewHeadingSample,
  showSample,
  zoom
}) => {
  const renderContent = () => {
    if (viewHeading === null || viewHeading === 'noData') return null
    return (
      <View
        style={
          zoom === 'zoomedOut'
            ? stylesZoomedOut.viewHeadingBed
            : stylesZoomedIn.viewHeadingBed
        }
      >
        {!viewHeading.fullName || viewHeading.fullName.length < 1 ? null : (
          <Text
            style={
              zoom === 'zoomedOut'
                ? stylesZoomedOut.fullNameText
                : stylesZoomedIn.fullNameText
            }
          >
            {viewHeading.fullName}
          </Text>
        )}
        {!viewHeading.dateOfBirth ||
        viewHeading.dateOfBirth === 'Invalid date' ||
        viewHeading.dateOfBirth.length < 1 ? null : (
          <Text
            style={
              zoom === 'zoomedOut'
                ? stylesZoomedOut.dateOfBirthText
                : stylesZoomedIn.dateOfBirthText
            }
          >
            {moment(viewHeading.dateOfBirth).format('D MMMM YYYY')}
          </Text>
        )}
      </View>
    )
  }

  const renderSampleContent = () => {
    if (viewHeadingSample === null || viewHeadingSample === 'noData')
      return null
    return (
      <View
        style={
          zoom === 'zoomedOut'
            ? stylesZoomedOut.viewHeadingBed
            : stylesZoomedIn.viewHeadingBed
        }
      >
        {!viewHeadingSample.fullName ||
        viewHeadingSample.fullName.length < 1 ? null : (
          <Text
            style={
              zoom === 'zoomedOut'
                ? stylesZoomedOut.fullNameText
                : stylesZoomedIn.fullNameText
            }
          >
            {viewHeadingSample.fullName}
          </Text>
        )}
        {!viewHeadingSample.dateOfBirth ||
        viewHeadingSample.dateOfBirth === 'Invalid date' ||
        viewHeadingSample.dateOfBirth.length < 1 ? null : (
          <Text
            style={
              zoom === 'zoomedOut'
                ? stylesZoomedOut.dateOfBirthText
                : stylesZoomedIn.dateOfBirthText
            }
          >
            {moment(viewHeadingSample.dateOfBirth).format('D MMMM YYYY')}
          </Text>
        )}
      </View>
    )
  }

  return !showSample ? renderContent() : renderSampleContent()
}

const stylesZoomedOut = StyleSheet.create({
  viewHeadingBed: {
    backgroundColor: '#ededed'
  },
  fullNameText: {
    color: '#278ACD',
    fontFamily: 'oswaldBold',
    fontSize: 25,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  dateOfBirthText: {
    color: '#278ACD',
    fontFamily: 'oswaldBold',
    fontSize: 10,
    paddingHorizontal: 20,
    paddingBottom: 20
  }
})

const stylesZoomedIn = StyleSheet.create({
  viewHeadingBed: {
    backgroundColor: '#ededed'
  },
  fullNameText: {
    color: '#278ACD',
    fontFamily: 'oswaldBold',
    fontSize: 50,
    paddingHorizontal: 40,
    paddingTop: 40
  },
  dateOfBirthText: {
    color: '#278ACD',
    fontFamily: 'oswaldBold',
    fontSize: 20,
    paddingHorizontal: 40,
    paddingBottom: 40
  }
})

export default ViewBitHeading
