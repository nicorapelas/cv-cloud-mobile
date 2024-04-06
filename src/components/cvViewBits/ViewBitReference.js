import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const ViewBitReference = ({
  references,
  referenceSample,
  showSample,
  zoom
}) => {
  const renderContent = () => {
    if (references === null || !references || references.length < 1) return null
    return (
      <>
        <Text
          style={
            zoom === 'zoomedOut'
              ? stylesZoomedOut.heading
              : stylesZoomedIn.heading
          }
        >
          References
        </Text>
        <FlatList
          scrollEnabled={false}
          keyExtractor={reference => reference._id}
          data={references}
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
                  {!item.name || item.name.length < 1 ? null : (
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
                        name="person"
                      />
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.text
                            : stylesZoomedIn.text
                        }
                      >
                        {item.name}
                      </Text>
                    </View>
                  )}
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
                  {!item.phone || item.phone.length < 1 ? null : (
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
                        name="cellphone-basic"
                      />
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.text
                            : stylesZoomedIn.text
                        }
                      >
                        {item.phone}
                      </Text>
                    </View>
                  )}
                  {!item.email || item.email.length < 1 ? null : (
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
                        name="email"
                      />
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.text
                            : stylesZoomedIn.text
                        }
                      >
                        {item.email}
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
      </>
    )
  }

  const renderSampleContent = () => {
    if (
      referenceSample === null ||
      !referenceSample ||
      referenceSample.length < 1
    )
      return null
    return (
      <>
        <Text
          style={
            zoom === 'zoomedOut'
              ? stylesZoomedOut.heading
              : stylesZoomedIn.heading
          }
        >
          References
        </Text>
        <FlatList
          scrollEnabled={false}
          keyExtractor={reference => reference._id}
          data={referenceSample}
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
                  {!item.name || item.name.length < 1 ? null : (
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
                        name="person"
                      />
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.text
                            : stylesZoomedIn.text
                        }
                      >
                        {item.name}
                      </Text>
                    </View>
                  )}
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
                  {!item.phone || item.phone.length < 1 ? null : (
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
                        name="cellphone-basic"
                      />
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.text
                            : stylesZoomedIn.text
                        }
                      >
                        {item.phone}
                      </Text>
                    </View>
                  )}
                  {!item.email || item.email.length < 1 ? null : (
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
                        name="email"
                      />
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.text
                            : stylesZoomedIn.text
                        }
                      >
                        {item.email}
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
      </>
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
    paddingTop: 10,
    paddingBottom: 5
  },
  bed: {
    paddingBottom: 10
  },
  contentRow: {
    paddingLeft: 10,
    paddingRight: 5,
    paddingTop: 2,
    flexDirection: 'row'
  },
  icon: {
    color: '#ffff',
    paddingTop: 1,
    fontSize: 7
  },
  text: {
    color: '#ffff',
    fontSize: 7,
    paddingLeft: 2,
    paddingBottom: 2
  },
  addressText: {
    color: '#ffff',
    fontSize: 14,
    paddingLeft: 17,
    paddingBottom: 2
  },
  hr: {
    borderBottomColor: '#ffff',
    borderBottomWidth: 1,
    padding: 5,
    marginHorizontal: 10
  }
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
    paddingBottom: 10
  },
  bed: {
    paddingBottom: 10
  },
  contentRow: {
    paddingLeft: 25,
    paddingRight: 10,
    flexDirection: 'row'
  },
  icon: {
    color: '#ffff',
    paddingTop: 2
  },
  text: {
    color: '#ffff',
    fontSize: 14,
    paddingLeft: 5,
    paddingBottom: 2
  },
  addressText: {
    color: '#ffff',
    fontSize: 14,
    paddingLeft: 17,
    paddingBottom: 2
  },
  hr: {
    borderBottomColor: '#ffff',
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 10
  }
})

export default ViewBitReference
