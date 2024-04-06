import React, { useContext } from 'react'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { NavigationEvents, withNavigation } from 'react-navigation'
import BitNoData from '../../../components/BitNoData'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'
import VideoPlayerRetake from '../../../components/video/VideoPlayerRetake'
import { Context as FirstImpressionContext } from '../../../context/FirstImpressionContext'

const FirstImpressionScreen = ({ navigation }) => {
  const {
    state: { loading, firstImpression },
    fetchFirstImpression
  } = useContext(FirstImpressionContext)

  const renderLoader = () => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="small" color="#ededed" />
      </View>
    )
  }

  const renderContent = () => {
    if (loading || firstImpression === null) {
      return <View style={styles.statusBed}>{renderLoader()}</View>
    }
    if (firstImpression.length < 1) {
      return (
        <BitNoData
          cvBit="First impression"
          routeName="FirstImpressionCreate"
          buttonText="create video"
        />
      )
    }
    return (
      <VideoPlayerRetake
        navigation={navigation}
        firstImpression={firstImpression}
      />
    )
  }

  return (
    <>
      <NavigationEvents
        onWillBlur={fetchFirstImpression}
        onWillFocus={fetchFirstImpression}
      />
      <View style={styles.bed}>{renderContent()}</View>
    </>
  )
}

FirstImpressionScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>first impression</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="Dashboard" />
  }
}

const styles = StyleSheet.create({
  heading: {
    color: '#ffff',
    fontSize: 22
  },
  bed: {
    backgroundColor: '#232936',
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  title: {
    fontSize: 20,
    paddingLeft: 10
  }
})

export default withNavigation(FirstImpressionScreen)
