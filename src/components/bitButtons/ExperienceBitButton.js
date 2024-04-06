import React, { useContext } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { NavigationEvents, withNavigation } from 'react-navigation'
import { Text } from 'react-native-elements'
import { Octicons } from '@expo/vector-icons'

import { Context as ExperienceContext } from '../../context/ExperienceContext'

const ExperienceBitButton = ({ navigation }) => {
  const { state, fetchExperienceStatus } = useContext(ExperienceContext)

  const renderStatusLoader = () => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="small" color="#ededed" />
      </View>
    )
  }

  const renderStatus = () => {
    const { loading, experienceStatus } = state
    if (loading)
      return <View style={styles.statusBed}>{renderStatusLoader()}</View>
    return (
      <View style={styles.statusBed}>
        <Text style={styles.percentage}>X {experienceStatus}</Text>
        {experienceStatus === '0' ? (
          <Octicons style={styles.redDot} name="primitive-dot" />
        ) : null}
        {experienceStatus === '1' ? (
          <Octicons style={styles.orangeDot} name="primitive-dot" />
        ) : null}
        {experienceStatus === '2' ? (
          <Octicons style={styles.yellowDot} name="primitive-dot" />
        ) : null}
        {experienceStatus > '2' ? (
          <Octicons style={styles.greenDot} name="primitive-dot" />
        ) : null}
      </View>
    )
  }

  return (
    <>
      <NavigationEvents
        onWillBlur={fetchExperienceStatus}
        onWillFocus={fetchExperienceStatus}
      />
      <View style={styles.bed}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Experience')}
        >
          <Text style={styles.title}>work experience</Text>
        </TouchableOpacity>
        {renderStatus()}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  bed: {
    backgroundColor: '#3ba7ee',
    width: '95%',
    height: 50,
    marginTop: 5,
    alignSelf: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    flex: 6,
  },
  title: {
    paddingTop: 10,
    fontSize: 22,
  },
  statusBed: {
    backgroundColor: '#394048',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-around',
  },
  percentage: {
    color: '#3ba7ee',
    textAlign: 'center',
    paddingTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    paddingTop: 16,
  },
  redDot: {
    color: '#ff0000',
    textAlign: 'center',
    paddingTop: 13,
    fontSize: 25,
  },
  orangeDot: {
    color: '#ff9100',
    textAlign: 'center',
    paddingTop: 13,
    fontSize: 25,
  },
  yellowDot: {
    color: '#ffff00',
    textAlign: 'center',
    paddingTop: 13,
    fontSize: 25,
  },
  greenDot: {
    color: '#00ff00',
    textAlign: 'center',
    paddingTop: 13,
    fontSize: 25,
  },
})

export default withNavigation(ExperienceBitButton)
