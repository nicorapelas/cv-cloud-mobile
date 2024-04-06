import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {
  MaterialCommunityIcons,
  Foundation,
  FontAwesome
} from '@expo/vector-icons'

const ViewBitTertEdu = ({ tertEdus, tertEduSample, showSample, zoom }) => {
  const renderContent = () => {
    if (tertEdus === null || !tertEdus || tertEdus.length < 1) return null
    return (
      <View>
        <Text
          style={
            zoom === 'zoomedOut'
              ? stylesZoomedOut.heading
              : stylesZoomedIn.heading
          }
        >
          Tertiary education
        </Text>
        <FlatList
          scrollEnabled={false}
          keyExtractor={tertEdu => tertEdu._id}
          data={tertEdus}
          renderItem={({ item }) => {
            return (
              <>
                <View
                  style={
                    tertEdus.length > 1
                      ? stylesZoomedOut.bed
                      : stylesZoomedOut.bedOneItem
                  }
                >
                  {!item.instituteName ||
                  item.instituteName.length < 1 ? null : (
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
                        {item.instituteName}
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
                        {!item.endDate ? null : `-${item.endDate}`}
                      </Text>
                    </View>
                  )}
                  {!item.certificationType ||
                  item.certificationType.length < 1 ? null : (
                    <View
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.contentRow
                          : stylesZoomedIn.contentRow
                      }
                    >
                      <FontAwesome
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.icon
                            : stylesZoomedIn.icon
                        }
                        name="certificate"
                      />
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.text
                            : stylesZoomedIn.text
                        }
                      >
                        {item.certificationType}
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
                      <MaterialCommunityIcons
                        name="text-subject"
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
                        {item.description}
                      </Text>
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
    if (tertEduSample === null || !tertEduSample || tertEduSample.length < 1)
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
          Tertiary education
        </Text>
        <FlatList
          scrollEnabled={false}
          keyExtractor={tertEdu => tertEdu._id}
          data={tertEduSample}
          renderItem={({ item }) => {
            return (
              <>
                <View
                  style={
                    tertEdus.length > 1
                      ? stylesZoomedOut.bed
                      : stylesZoomedOut.bedOneItem
                  }
                >
                  {!item.instituteName ||
                  item.instituteName.length < 1 ? null : (
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
                        {item.instituteName}
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
                        {!item.endDate ? null : `-${item.endDate}`}
                      </Text>
                    </View>
                  )}
                  {!item.certificationType ||
                  item.certificationType.length < 1 ? null : (
                    <View
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.contentRow
                          : stylesZoomedIn.contentRow
                      }
                    >
                      <FontAwesome
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.icon
                            : stylesZoomedIn.icon
                        }
                        name="certificate"
                      />
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.text
                            : stylesZoomedIn.text
                        }
                      >
                        {item.certificationType}
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
                      <MaterialCommunityIcons
                        name="text-subject"
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
                        {item.description}
                      </Text>
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
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 10
  }
})

export default ViewBitTertEdu
