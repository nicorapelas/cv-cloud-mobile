import React from 'react'
import _ from 'lodash'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { MaterialIcons, Foundation } from '@expo/vector-icons'
import { render } from 'react-dom'

const ViewBitEmployHistory = ({
  employHistorys,
  employHistorySample,
  showSample,
  zoom
}) => {
  const renderContent = () => {
    if (employHistorys === null || !employHistorys || employHistorys.length < 1)
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
          Employment history
        </Text>

        <FlatList
          scrollEnabled={false}
          keyExtractor={employHistory => employHistory._id}
          data={_.sortBy(employHistorys, 'startDateValue')}
          renderItem={({ item }) => {
            return (
              <>
                <View
                  style={
                    zoom === 'zoomedOut'
                      ? stylesZoomedOut.bed
                      : stylesZoomedIn.bed
                  }
                >
                  {!item.company || item.company.length < 1 ? null : (
                    <View
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.contentRow
                          : stylesZoomedIn.contentRow
                      }
                    >
                      <MaterialIcons
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.icon
                            : stylesZoomedIn.icon
                        }
                        name="business"
                      />
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.text
                            : stylesZoomedIn.text
                        }
                      >
                        {item.company}
                      </Text>
                    </View>
                  )}
                  {!item.position || item.position.length < 1 ? null : (
                    <View
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.contentRow
                          : stylesZoomedIn.contentRow
                      }
                    >
                      <MaterialIcons
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.icon
                            : stylesZoomedIn.icon
                        }
                        name="work"
                      />
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.text
                            : stylesZoomedIn.text
                        }
                      >
                        {item.position}
                      </Text>
                    </View>
                  )}
                  {!item.startDate ? null : (
                    <View
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.contentRow
                          : stylesZoomedIn.contentRow
                      }
                    >
                      <Foundation
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.icon
                            : stylesZoomedIn.icon
                        }
                        name="calendar"
                      />
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.text
                            : stylesZoomedIn.text
                        }
                      >
                        {item.startDate}
                        {!item.current ? null : `- Current`}
                        {!item.endDate ? null : `- ${item.endDate}`}
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
                      <MaterialIcons
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.icon
                            : stylesZoomedIn.icon
                        }
                        name="description"
                      />
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
              </>
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
      employHistorySample === null ||
      !employHistorySample ||
      employHistorySample.length < 1
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
          Employment history
        </Text>

        <FlatList
          scrollEnabled={false}
          keyExtractor={employHistory => employHistory._id}
          data={_.sortBy(employHistorySample, 'startDateValue')}
          renderItem={({ item }) => {
            return (
              <>
                <View
                  style={
                    zoom === 'zoomedOut'
                      ? stylesZoomedOut.bed
                      : stylesZoomedIn.bed
                  }
                >
                  {!item.company || item.company.length < 1 ? null : (
                    <View
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.contentRow
                          : stylesZoomedIn.contentRow
                      }
                    >
                      <MaterialIcons
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.icon
                            : stylesZoomedIn.icon
                        }
                        name="business"
                      />
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.text
                            : stylesZoomedIn.text
                        }
                      >
                        {item.company}
                      </Text>
                    </View>
                  )}
                  {!item.position || item.position.length < 1 ? null : (
                    <View
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.contentRow
                          : stylesZoomedIn.contentRow
                      }
                    >
                      <MaterialIcons
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.icon
                            : stylesZoomedIn.icon
                        }
                        name="work"
                      />
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.text
                            : stylesZoomedIn.text
                        }
                      >
                        {item.position}
                      </Text>
                    </View>
                  )}
                  {!item.startDate ? null : (
                    <View
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.contentRow
                          : stylesZoomedIn.contentRow
                      }
                    >
                      <Foundation
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.icon
                            : stylesZoomedIn.icon
                        }
                        name="calendar"
                      />
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.text
                            : stylesZoomedIn.text
                        }
                      >
                        {item.startDate}
                        {!item.current ? null : `- Current`}
                        {!item.endDate ? null : `- ${item.endDate}`}
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
                      <MaterialIcons
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.icon
                            : stylesZoomedIn.icon
                        }
                        name="description"
                      />
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
              </>
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
  text: {
    fontSize: 8,
    paddingHorizontal: 5
  },
  icon: {
    fontSize: 8,
    paddingTop: 1
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
  text: {
    fontSize: 16,
    paddingHorizontal: 10
  },
  icon: {
    fontSize: 15,
    paddingTop: 1
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 10
  }
})

export default ViewBitEmployHistory
