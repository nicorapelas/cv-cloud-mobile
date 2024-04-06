import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

const ViewBitExperience = ({
  experiences,
  experienceSample,
  showSample,
  zoom
}) => {
  const renderContent = () => {
    if (experiences === null || !experiences || experiences.length < 1)
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
          Experience
        </Text>
        <FlatList
          scrollEnabled={false}
          keyExtractor={experience => experience._id}
          data={experiences}
          renderItem={({ item }) => {
            return (
              <View
                style={
                  zoom === 'zoomedOut'
                    ? stylesZoomedOut.bed
                    : stylesZoomedIn.bed
                }
              >
                {!item.title || item.title.length < 1 ? null : (
                  <View
                    style={
                      zoom === 'zoomedOut'
                        ? stylesZoomedOut.contentRow
                        : stylesZoomedIn.contentRow
                    }
                  >
                    <Text
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.title
                          : stylesZoomedIn.title
                      }
                    >
                      {item.title}
                    </Text>
                  </View>
                )}
                {!item.description || item.description.length < 1 ? null : (
                  <View
                    style={
                      zoom === 'zoomedOut'
                        ? stylesZoomedOut.contentRow
                        : stylesZoomedIn.contentRow
                    }
                  >
                    <Text
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.text
                          : stylesZoomedIn.text
                      }
                    >
                      {item.description}
                    </Text>
                  </View>
                )}
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
    if (
      experienceSample === null ||
      !experienceSample ||
      experienceSample.length < 1
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
          Experience
        </Text>
        <FlatList
          scrollEnabled={false}
          keyExtractor={experience => experience._id}
          data={experienceSample}
          renderItem={({ item }) => {
            return (
              <View
                style={
                  zoom === 'zoomedOut'
                    ? stylesZoomedOut.bed
                    : stylesZoomedIn.bed
                }
              >
                {!item.title || item.title.length < 1 ? null : (
                  <View
                    style={
                      zoom === 'zoomedOut'
                        ? stylesZoomedOut.contentRow
                        : stylesZoomedIn.contentRow
                    }
                  >
                    <Text
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.title
                          : stylesZoomedIn.title
                      }
                    >
                      {item.title}
                    </Text>
                  </View>
                )}
                {!item.description || item.description.length < 1 ? null : (
                  <View
                    style={
                      zoom === 'zoomedOut'
                        ? stylesZoomedOut.contentRow
                        : stylesZoomedIn.contentRow
                    }
                  >
                    <Text
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.text
                          : stylesZoomedIn.text
                      }
                    >
                      {item.description}
                    </Text>
                  </View>
                )}
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
  bed: {
    backgroundColor: '#ededed',
    marginBottom: 7,
    marginHorizontal: 10,
    paddingVertical: 10
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
  contentRow: {
    paddingLeft: 10,
    paddingRight: 5,
    paddingBottom: 3,
    flexDirection: 'row'
  },
  title: {
    fontSize: 9,
    fontWeight: '700',
    paddingBottom: 1
  },
  text: {
    fontSize: 8,
    paddingHorizontal: 5
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
    backgroundColor: '#ededed',
    marginBottom: 7,
    marginHorizontal: 10,
    paddingVertical: 10
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
  contentRow: {
    paddingLeft: 25,
    paddingRight: 10,
    paddingBottom: 3,
    flexDirection: 'row'
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    paddingBottom: 3
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 10
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 10
  }
})

export default ViewBitExperience
