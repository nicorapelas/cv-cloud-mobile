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

import { Context as PersonalInfoContext } from '../../context/PersonalInfoContext'

const PersonalInfoBitButton = ({ navigation }) => {
  const {
    state: { loading, personalInfoStatus },
    fetchPersonalInfoStatus,
  } = useContext(PersonalInfoContext)

  const renderStatusLoader = () => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="small" color="#ededed" />
      </View>
    )
  }

  const renderStatus = () => {
    if (loading)
      return <View style={styles.statusBed}>{renderStatusLoader()}</View>
    return (
      <View style={styles.statusBed}>
        <Text style={styles.percentage}>
          {personalInfoStatus < 100 ? personalInfoStatus : '100'} %
        </Text>
        {personalInfoStatus === null || personalInfoStatus < 1 ? (
          <Octicons style={styles.redDot} name="primitive-dot" />
        ) : null}
        {personalInfoStatus > 1 && personalInfoStatus < 35 ? (
          <Octicons style={styles.orangeDot} name="primitive-dot" />
        ) : null}
        {personalInfoStatus > 49 && personalInfoStatus < 68 ? (
          <Octicons style={styles.yellowDot} name="primitive-dot" />
        ) : null}
        {personalInfoStatus > 68 ? (
          <Octicons style={styles.greenDot} name="primitive-dot" />
        ) : null}
      </View>
    )
  }

  return (
    <>
      <NavigationEvents
        onWillBlur={fetchPersonalInfoStatus}
        onWillFocus={fetchPersonalInfoStatus}
      />
      <View style={styles.bed}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PersonalInfo')}
        >
          <Text style={styles.title}>personal information</Text>
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

export default withNavigation(PersonalInfoBitButton)
