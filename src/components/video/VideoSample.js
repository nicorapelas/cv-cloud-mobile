import React, { useContext, useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { Video } from 'expo-av'

import LoaderFullScreen from '../loadingModals/LoaderFullScreen'
import { Context as FirstImpressionContext } from '../../context/FirstImpressionContext'

const VideoSample = () => {
  const video = useRef(null)
  const [status, setStatus] = useState({})

  const {
    state: { loading, videoDemoUrl },
    setVideoDemoShow,
    fetchDemoVideoUrl
  } = useContext(FirstImpressionContext)

  useEffect(() => {
    fetchDemoVideoUrl()
  }, [])

  const renderContent = () => {
    if (loading) return <LoaderFullScreen />
    if (!videoDemoUrl) return null
    return (
      <View style={styles.videoBed}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: videoDemoUrl.url
          }}
          useNativeControls
          resizeMode="contain"
          onPlaybackStatusUpdate={status => setStatus(() => status)}
          isLooping="true"
        />
        <View style={styles.buttonsBed}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          >
            {status.isPlaying ? (
              <AntDesign name="pausecircle" style={styles.playButtonIcon} />
            ) : (
              <AntDesign name="play" style={styles.playButtonIcon} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setVideoDemoShow(false)}
          >
            <Ionicons
              style={styles.backButtonIcon}
              name="ios-close-circle-outline"
            />
            <Text style={styles.backButtonText}>close</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return renderContent()
}

const styles = StyleSheet.create({
  videoBed: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#232936'
  },
  video: {
    alignSelf: 'center',
    width: '100%',
    height: '60%'
  },
  buttonsBed: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  playButton: {
    paddingBottom: 20
  },
  playButtonIcon: {
    color: '#ffff',
    fontSize: 42
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  backButtonIcon: {
    color: '#F9B321',
    paddingRight: 7,
    paddingTop: 2,
    fontSize: 20
  },
  backButtonText: {
    color: '#F9B321',
    fontSize: 18
  }
})

export default VideoSample
