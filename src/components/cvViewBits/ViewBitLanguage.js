import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Octicons } from '@expo/vector-icons'

import ProficiencyOne from '../../components/proficiencyDots/ProficiencyOne'
import ProficiencyTwo from '../../components/proficiencyDots/ProficiencyTwo'
import ProficiencyThree from '../../components/proficiencyDots/ProficiencyThree'
import ProficiencyFour from '../../components/proficiencyDots/ProficiencyFour'
import ProficiencyFive from '../../components/proficiencyDots/ProficiencyFive'

const ViewBitLanguage = ({ languages, languageSample, showSample, zoom }) => {
  const renderProfiencyDots = (val) => {
    if (val === 1)
      return <ProficiencyOne zoom="zoomedIn" color="white" zoom={zoom} />
    if (val === 2)
      return <ProficiencyTwo zoom="zoomedIn" color="white" zoom={zoom} />
    if (val === 3)
      return <ProficiencyThree zoom="zoomedIn" color="white" zoom={zoom} />
    if (val === 4)
      return <ProficiencyFour zoom="zoomedIn" color="white" zoom={zoom} />
    if (val === 5)
      return <ProficiencyFive zoom="zoomedIn" color="white" zoom={zoom} />
  }

  const renderContent = () => {
    if (languages === null || !languages || languages.length < 1) return null
    return (
      <View>
        <Text
          style={
            zoom === 'zoomedOut'
              ? stylesZoomedOut.heading
              : stylesZoomedIn.heading
          }
        >
          Languages
        </Text>
        <FlatList
          scrollEnabled={false}
          keyExtractor={(language) => language._id}
          data={languages}
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
                    {item.language}
                  </Text>
                </View>

                <View
                  style={
                    zoom === 'zoomedOut'
                      ? stylesZoomedOut.proficiencyBed
                      : stylesZoomedIn.proficiencyBed
                  }
                >
                  {!item.write || item.write.length < 1 ? null : (
                    <View
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.itemTextProficiencyContainer
                          : stylesZoomedIn.itemTextProficiencyContainer
                      }
                    >
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.itemText
                            : stylesZoomedIn.itemText
                        }
                      >
                        write
                      </Text>
                      <View
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.proficiency
                            : stylesZoomedIn.proficiency
                        }
                      >
                        {renderProfiencyDots(item.write)}
                      </View>
                    </View>
                  )}
                  {!item.read || item.read.length < 1 ? null : (
                    <View
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.itemTextProficiencyContainer
                          : stylesZoomedIn.itemTextProficiencyContainer
                      }
                    >
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.itemText
                            : stylesZoomedIn.itemText
                        }
                      >
                        read
                      </Text>
                      <View
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.proficiency
                            : stylesZoomedIn.proficiency
                        }
                      >
                        {renderProfiencyDots(item.read)}
                      </View>
                    </View>
                  )}
                  {!item.speak || item.speak.length < 1 ? null : (
                    <View
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.itemTextProficiencyContainer
                          : stylesZoomedIn.itemTextProficiencyContainer
                      }
                    >
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.itemText
                            : stylesZoomedIn.itemText
                        }
                      >
                        speak
                      </Text>
                      <View
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.proficiency
                            : stylesZoomedIn.proficiency
                        }
                      >
                        {renderProfiencyDots(item.speak)}
                      </View>
                    </View>
                  )}
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
    if (languageSample === null || !languageSample || languageSample.length < 1)
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
          Languages
        </Text>
        <FlatList
          scrollEnabled={false}
          keyExtractor={(language) => language._id}
          data={languageSample}
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
                    {item.language}
                  </Text>
                </View>

                <View
                  style={
                    zoom === 'zoomedOut'
                      ? stylesZoomedOut.proficiencyBed
                      : stylesZoomedIn.proficiencyBed
                  }
                >
                  {!item.write || item.write.length < 1 ? null : (
                    <View
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.itemTextProficiencyContainer
                          : stylesZoomedIn.itemTextProficiencyContainer
                      }
                    >
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.itemText
                            : stylesZoomedIn.itemText
                        }
                      >
                        write
                      </Text>
                      {renderProfiencyDots(item.write)}
                    </View>
                  )}
                  {!item.read || item.read.length < 1 ? null : (
                    <View
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.itemTextProficiencyContainer
                          : stylesZoomedIn.itemTextProficiencyContainer
                      }
                    >
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.itemText
                            : stylesZoomedIn.itemText
                        }
                      >
                        read
                      </Text>
                      {renderProfiencyDots(item.read)}
                    </View>
                  )}
                  {!item.speak || item.speak.length < 1 ? null : (
                    <View
                      style={
                        zoom === 'zoomedOut'
                          ? stylesZoomedOut.itemTextProficiencyContainer
                          : stylesZoomedIn.itemTextProficiencyContainer
                      }
                    >
                      <Text
                        style={
                          zoom === 'zoomedOut'
                            ? stylesZoomedOut.itemText
                            : stylesZoomedIn.itemText
                        }
                      >
                        speak
                      </Text>
                      {renderProfiencyDots(item.speak)}
                    </View>
                  )}
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
    fontSize: 10,
    paddingLeft: 10,
    paddingRight: 5,
    paddingTop: 5,
  },
  contentRow: {
    paddingLeft: 10,
    marginTop: -5,
  },
  titleBed: {
    flexDirection: 'row',
    marginBottom: -3,
    marginTop: 5,
  },
  proficiencyBed: {
    width: '90%',
    flexGrow: 2,
  },
  proficiency: {
    marginTop: 2,
  },
  itemTextProficiencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -7,
  },
  itemText: {
    color: '#ffff',
    fontSize: 7,
    paddingTop: 10,
    paddingLeft: 7,
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
    paddingBottom: 2,
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
  },
  titleBed: {
    flexDirection: 'row',
  },
  proficiencyBed: {
    flexGrow: 2,
    marginBottom: 15,
  },
  itemTextProficiencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  itemText: {
    color: '#ffff',
    paddingTop: 10,
    marginLeft: 17,
  },
  point: {
    color: '#ffff',
    fontSize: 12,
    paddingTop: 13,
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

export default ViewBitLanguage
