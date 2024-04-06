import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { MaterialCommunityIcons, Foundation } from '@expo/vector-icons'

const ViewBitSecondEdu = ({
  secondEdus,
  secondEduSample,
  showSample,
  zoom
}) => {
  const renderContent = () => {
    if (secondEdus === null || !secondEdus || secondEdus.length < 1) return null
    return (
      <View>
        <Text
          style={
            zoom === 'zoomedOut'
              ? stylesZoomedOut.heading
              : stylesZoomedIn.heading
          }
        >
          Secondary education
        </Text>
        <FlatList
          scrollEnabled={false}
          keyExtractor={secondEdu => secondEdu._id}
          data={secondEdus}
          renderItem={({ item }) => {
            return (
              <>
                <View
                  style={
                    secondEdus.length > 1
                      ? stylesZoomedOut.bed
                      : stylesZoomedOut.bedOneItem
                  }
                >
                  {!item.schoolName || item.schoolName.length < 1 ? null : (
                    <View
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.contentRow
                          : stylesZoomedIn.contentRow
                      }
                    >
                      <MaterialCommunityIcons
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.icon
                            : stylesZoomedIn.icon
                        }
                        name="school"
                      />
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.text
                            : stylesZoomedIn.text
                        }
                      >
                        {item.schoolName}
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
                        {!item.endDate ? null : `- ${item.endDate}`}
                      </Text>
                    </View>
                  )}
                  {!item.subjects || item.subjects.length < 1 ? null : (
                    <View
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.contentRow
                          : stylesZoomedIn.contentRow
                      }
                    >
                      <MaterialCommunityIcons
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.icon
                            : stylesZoomedIn.icon
                        }
                        name="text-subject"
                      />
                      <View
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.subjectsBed
                            : stylesZoomedIn.subjectsBed
                        }
                      >
                        {item.subjects.map(sub => {
                          return (
                            <Text
                              style={
                                zoom === 'zoomedOut'
                                  ? stylesZoomedOut.text
                                  : stylesZoomedIn.text
                              }
                              key={sub.key}
                            >
                              {sub.subject}
                            </Text>
                          )
                        })}
                      </View>
                    </View>
                  )}
                  {!item.additionalInfo ||
                  item.additionalInfo.length < 1 ? null : (
                    <View
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.contentRow
                          : stylesZoomedIn.contentRow
                      }
                    >
                      <MaterialCommunityIcons
                        name="information"
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.icon
                            : stylesZoomedIn.icon
                        }
                      />
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.text
                            : stylesZoomedIn.text
                        }
                      >
                        {item.additionalInfo}
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
      secondEduSample === null ||
      !secondEduSample ||
      secondEduSample.length < 1
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
          Secondary education
        </Text>
        <FlatList
          scrollEnabled={false}
          keyExtractor={secondEdu => secondEdu._id}
          data={secondEduSample}
          renderItem={({ item }) => {
            return (
              <>
                <View
                  style={
                    secondEdus.length > 1
                      ? stylesZoomedOut.bed
                      : stylesZoomedOut.bedOneItem
                  }
                >
                  {!item.schoolName || item.schoolName.length < 1 ? null : (
                    <View
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.contentRow
                          : stylesZoomedIn.contentRow
                      }
                    >
                      <MaterialCommunityIcons
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.icon
                            : stylesZoomedIn.icon
                        }
                        name="school"
                      />
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.text
                            : stylesZoomedIn.text
                        }
                      >
                        {item.schoolName}
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
                        {!item.endDate ? null : `- ${item.endDate}`}
                      </Text>
                    </View>
                  )}
                  {!item.subjects || item.subjects.length < 1 ? null : (
                    <View
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.contentRow
                          : stylesZoomedIn.contentRow
                      }
                    >
                      <MaterialCommunityIcons
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.icon
                            : stylesZoomedIn.icon
                        }
                        name="text-subject"
                      />
                      <View
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.subjectsBed
                            : stylesZoomedIn.subjectsBed
                        }
                      >
                        {item.subjects.map(sub => {
                          return (
                            <Text
                              style={
                                zoom === 'zoomedOut'
                                  ? stylesZoomedOut.text
                                  : stylesZoomedIn.text
                              }
                              key={sub.key}
                            >
                              {sub.subject}
                            </Text>
                          )
                        })}
                      </View>
                    </View>
                  )}
                  {!item.additionalInfo ||
                  item.additionalInfo.length < 1 ? null : (
                    <View
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.contentRow
                          : stylesZoomedIn.contentRow
                      }
                    >
                      <MaterialCommunityIcons
                        name="information"
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.icon
                            : stylesZoomedIn.icon
                        }
                      />
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.text
                            : stylesZoomedIn.text
                        }
                      >
                        {item.additionalInfo}
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
  bedOneItem: {
    marginBottom: 3,
    marginHorizontal: 5,
    paddingVertical: 5
  },
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
  subjectsBed: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingRight: 10
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 5,
    marginHorizontal: 10
  }
})

const stylesZoomedIn = StyleSheet.create({
  bedOneItem: {
    marginBottom: 7,
    marginHorizontal: 10,
    paddingVertical: 10
  },
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
  subjectsBed: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingRight: 10
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 10
  }
})

export default ViewBitSecondEdu
