import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Octicons } from '@expo/vector-icons'

const ViewBitAttribute = ({
  attributes,
  attributeSample,
  showSample,
  zoom,
}) => {
  const renderContent = () => {
    if (attributes === null || !attributes || attributes.length < 1) return null
    return (
      <View>
        <Text
          style={
            zoom === 'zoomedOut'
              ? stylesZoomedOut.heading
              : stylesZoomedIn.heading
          }
        >
          Attributes
        </Text>
        <FlatList
          scrollEnabled={false}
          keyExtractor={(attribute) => attribute._id}
          data={attributes}
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
                    {item.attribute}
                  </Text>
                </View>
              </View>
            )
          }}
        />
        <View style={stylesZoomedOut.hr} />
      </View>
    )
  }

  const renderSampleContent = () => {
    if (
      attributeSample === null ||
      !attributeSample ||
      attributeSample.length < 1
    )
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
          Attributes
        </Text>
        <FlatList
          scrollEnabled={false}
          keyExtractor={(attribute) => attribute._id}
          data={attributeSample}
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
                    {item.attribute}
                  </Text>
                </View>
              </View>
            )
          }}
        />
        <View style={stylesZoomedOut.hr} />
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
    fontSize: 10,
    paddingLeft: 10,
    paddingRight: 5,
    marginBottom: 3,
    marginTop: 5,
  },
  contentRow: {
    paddingLeft: 10,
    paddingRight: 5,
    flexDirection: 'row',
  },
  titleBed: {
    flexDirection: 'row',
    marginTop: -5,
  },
  point: {
    color: '#ffff',
    fontSize: 7,
    paddingTop: 12,
    marginLeft: 1,
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

export default ViewBitAttribute
