import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Octicons } from '@expo/vector-icons'

import ProficiencyOne from '../../components/proficiencyDots/ProficiencyOne'
import ProficiencyTwo from '../../components/proficiencyDots/ProficiencyTwo'
import ProficiencyThree from '../../components/proficiencyDots/ProficiencyThree'
import ProficiencyFour from '../../components/proficiencyDots/ProficiencyFour'
import ProficiencyFive from '../../components/proficiencyDots/ProficiencyFive'

const ViewBitSkill = ({ skills, skillSample, showSample, zoom }) => {
  const renderContent = () => {
    if (skills === null || !skills || skills.length < 1) return null
    return (
      <>
        <Text
          style={
            zoom === 'zoomedOut'
              ? stylesZoomedOut.heading
              : stylesZoomedIn.heading
          }
        >
          Skills
        </Text>
        <FlatList
          scrollEnabled={false}
          keyExtractor={(skill) => skill._id}
          data={skills}
          renderItem={({ item }) => {
            return (
              <View
                style={
                  zoom === 'zoomedOut'
                    ? stylesZoomedOut.contentRow
                    : stylesZoomedIn.contentRow
                }
              >
                <View style={stylesZoomedOut.titleBed}>
                  <Text
                    style={
                      zoom === 'zoomedOut'
                        ? stylesZoomedOut.text
                        : stylesZoomedIn.text
                    }
                  >
                    {item.skill}
                  </Text>
                </View>
                <View
                  style={
                    zoom === 'zoomedOut'
                      ? stylesZoomedOut.proficiencyBed
                      : stylesZoomedIn.proficiencyBed
                  }
                >
                  {item.proficiency === 1 ? (
                    <ProficiencyOne color="white" zoom={zoom} />
                  ) : null}
                  {item.proficiency === 2 ? (
                    <ProficiencyTwo color="white" zoom={zoom} />
                  ) : null}
                  {item.proficiency === 3 ? (
                    <ProficiencyThree color="white" zoom={zoom} />
                  ) : null}
                  {item.proficiency === 4 ? (
                    <ProficiencyFour color="white" zoom={zoom} />
                  ) : null}
                  {item.proficiency === 5 ? (
                    <ProficiencyFive color="white" zoom={zoom} />
                  ) : null}
                </View>
              </View>
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
    if (skillSample === null || !skillSample || skillSample.length < 1)
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
          Skills
        </Text>
        <FlatList
          scrollEnabled={false}
          keyExtractor={(skill) => skill._id}
          data={skillSample}
          renderItem={({ item }) => {
            return (
              <View
                style={
                  zoom === 'zoomedOut'
                    ? stylesZoomedOut.contentRow
                    : stylesZoomedIn.contentRow
                }
              >
                <View style={stylesZoomedOut.titleBed}>
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
                    {item.skill}
                  </Text>
                </View>
                <View
                  style={
                    zoom === 'zoomedOut'
                      ? stylesZoomedOut.proficiencyBed
                      : stylesZoomedIn.proficiencyBed
                  }
                >
                  {item.proficiency === 1 ? (
                    <ProficiencyOne color="white" zoom={zoom} />
                  ) : null}
                  {item.proficiency === 2 ? (
                    <ProficiencyTwo color="white" zoom={zoom} />
                  ) : null}
                  {item.proficiency === 3 ? (
                    <ProficiencyThree color="white" zoom={zoom} />
                  ) : null}
                  {item.proficiency === 4 ? (
                    <ProficiencyFour color="white" zoom={zoom} />
                  ) : null}
                  {item.proficiency === 5 ? (
                    <ProficiencyFive color="white" zoom={zoom} />
                  ) : null}
                </View>
              </View>
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
    fontSize: 10,
    paddingLeft: 12,
    paddingRight: 5,
    paddingTop: 5,
  },
  contentRow: {
    paddingLeft: 10,
    paddingRight: 5,
    marginTop: -3,
    flexDirection: 'column',
  },
  titleBed: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  proficiencyBed: {
    flexGrow: 2,
    marginTop: -7,
    marginLeft: 2,
  },
  point: {
    color: '#ffff',
    fontSize: 7,
    paddingTop: 11,
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
    padding: 5,
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
    flexDirection: 'column',
  },
  titleBed: {
    flexDirection: 'row',
  },
  proficiencyBed: {
    flexGrow: 2,
    paddingRight: 10,
  },
  point: {
    color: '#ffff',
    fontSize: 12,
    paddingTop: 12,
  },
  text: {
    color: '#ffff',
    fontSize: 14,
    paddingTop: 10,
    marginBottom: -5,
  },
  hr: {
    borderBottomColor: '#ffff',
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 10,
  },
})

export default ViewBitSkill
