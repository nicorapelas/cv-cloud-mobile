import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Octicons } from '@expo/vector-icons'

const ViewBitInterest = ({ interests, interestSample, showSample, zoom }) => {
  const renderContent = () => {
    if (interests === null || !interests || interests.length < 1) return null
    return (
      <View>
        <Text
          style={
            zoom === 'zoomedOut'
              ? stylesZoomedOut.heading
              : stylesZoomedIn.heading
          }
        >
          Interests
        </Text>
        <FlatList
          scrollEnabled={false}
          keyExtractor={(interest) => interest._id}
          data={interests}
          renderItem={({ item }) => {
            return (
              <View
                style={
                  zoom === 'zoomedOut'
                    ? stylesZoomedOut.contentRow
                    : stylesZoomedIn.contentRow
                }
              >
                <View
                  style={
                    zoom === 'zoomedOut'
                      ? stylesZoomedOut.titleBed
                      : stylesZoomedIn.titleBed
                  }
                >
                  <Octicons
                    style={
                      zoom === 'zoomedOut'
                        ? stylesZoomedOut.point
                        : stylesZoomedIn.point
                    }
                    name="primitive-dot"
                  />
                  <Text
                    style={
                      zoom === 'zoomedOut'
                        ? stylesZoomedOut.text
                        : stylesZoomedIn.text
                    }
                  >
                    {item.interest}
                  </Text>
                </View>
              </View>
            )
          }}
        />
        <View
          style={zoom === 'zoomedOut' ? stylesZoomedOut.hr : stylesZoomedIn.hr}
        />
      </View>
    )
  }

  const renderSampleContent = () => {
    if (interestSample === null || !interestSample || interestSample.length < 1)
      return null
    return (
      <View>
        <Text
          style={
            zoom === 'zoomedOut'
              ? stylesZoomedOut.heading
              : stylesZoomedIn.heading
          }
        >
          Interests
        </Text>
        <FlatList
          scrollEnabled={false}
          keyExtractor={(interest) => interest._id}
          data={interestSample}
          renderItem={({ item }) => {
            return (
              <View
                style={
                  zoom === 'zoomedOut'
                    ? stylesZoomedOut.contentRow
                    : stylesZoomedIn.contentRow
                }
              >
                <View
                  style={
                    zoom === 'zoomedOut'
                      ? stylesZoomedOut.titleBed
                      : stylesZoomedIn.titleBed
                  }
                >
                  <Octicons
                    style={
                      zoom === 'zoomedOut'
                        ? stylesZoomedOut.point
                        : stylesZoomedIn.point
                    }
                    name="primitive-dot"
                  />
                  <Text
                    style={
                      zoom === 'zoomedOut'
                        ? stylesZoomedOut.text
                        : stylesZoomedIn.text
                    }
                  >
                    {item.interest}
                  </Text>
                </View>
              </View>
            )
          }}
        />
        <View
          style={zoom === 'zoomedOut' ? stylesZoomedOut.hr : stylesZoomedIn.hr}
        />
      </View>
    )
  }

  return !showSample ? renderContent() : renderSampleContent()
}

const stylesZoomedOut = StyleSheet.create({
  heading: {
    color: '#ffff',
    fontFamily: 'oswaldBold',
    textTransform: 'uppercase',
    fontSize: 11,
    paddingLeft: 10,
    paddingRight: 5,
    paddingTop: 5,
    marginBottom: 5,
  },
  contentRow: {
    paddingLeft: 10,
    paddingRight: 5,
    flexDirection: 'row',
    marginTop: -5,
  },
  titleBed: {
    flexDirection: 'row',
  },
  point: {
    color: '#ffff',
    fontSize: 7,
    paddingTop: 12,
  },
  text: {
    color: '#ffff',
    fontSize: 7,
    paddingTop: 10,
    paddingLeft: 3,
  },
  hr: {
    borderBottomColor: '#ffff',
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 10,
  },
})

const stylesZoomedIn = StyleSheet.create({
  heading: {
    color: '#ffff',
    fontFamily: 'oswaldBold',
    textTransform: 'uppercase',
    fontSize: 22,
    paddingLeft: 25,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 5,
  },
  contentRow: {
    paddingLeft: 25,
    paddingRight: 10,
    flexDirection: 'row',
  },
  titleBed: {
    flexDirection: 'row',
  },
  point: {
    color: '#ffff',
    fontSize: 12,
    paddingTop: 14,
  },
  text: {
    color: '#ffff',
    fontSize: 14,
    paddingTop: 10,
    paddingLeft: 10,
  },
  hr: {
    borderBottomColor: '#ffff',
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 10,
  },
})

export default ViewBitInterest
