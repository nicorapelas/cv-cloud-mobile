import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { Video } from 'expo-av'
import { keys } from '../../../config/keys_dev'

import LoaderWithText from '../../components/loadingModals/LoaderWithText'
import LoaderFullScreen from '../../components/loadingModals/LoaderFullScreen'
import { Context as FirstImpressionContext } from '../../context/FirstImpressionContext'
import { Context as UniversalContext } from '../../context/UniversalContext'

const VideoPlaybackUpload = ({ videoObject, navigation }) => {
  const video = React.useRef(null)
  const [status, setStatus] = React.useState({})
  const [videoUploading, setVideoUploading] = useState(false)
  const [videoFileName, setVideoFileName] = useState(null)
  const [loaderSubText, setLoaderSubText] = useState(0)

  const {
    state: { loading, uploadSignature },
    clearVideoObject,
    createFirstImpression,
    createUploadSignature,
    clearUploadSignature
  } = useContext(FirstImpressionContext)

  const { toggleHideNavLinks, buildCV } = useContext(UniversalContext)

  useEffect(() => {
    setVideoFileName(`${randomFileName}.${videoObject.uri.split('.')[1]}`)
    return () => setVideoUploading(false)
  }, [])

  useEffect(() => {
    if (uploadSignature) {
      videoUpload()
      setVideoUploading(true)
      toggleHideNavLinks(true)
    }
  }, [uploadSignature])

  useEffect(() => {
    if (videoUploading) {
      const t = setTimeout(() => {
        setLoaderSubText(loaderSubText + 1)
      }, 40000)
      return () => clearTimeout(t)
    }
  }, [videoUploading])

  const randomFileName =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Date.now().toString()

  const videoUpload = () => {
    const { apiKey, signature, timestamp } = uploadSignature
    const data = new FormData()
    data.append('file', {
      uri: videoObject.uri,
      type: `video/${videoObject.uri.split('.')[1]}`,
      name: videoFileName
    })
    data.append('api_key', apiKey)
    data.append('timestamp', timestamp)
    data.append('signature', signature)
    fetch(keys.cloudinary.uploadVideoUrl, {
      method: 'post',
      body: data
    })
      .then(res => res.json())
      .then(data => {
        if (data) setVideoUploading(false)
        if (data.error) {
          toggleHideNavLinks(false)
          setVideoUploading(false)
          clearVideoObject()
          setLoaderSubText(0)
          clearUploadSignature()
          Alert.alert('Unable to upload video, please try again later')
          navigation.navigate('Dashboard')
          return
        }
        createFirstImpression(
          {
            videoUrl: data.url,
            publicId: data.public_id
          },
          () => {
            toggleHideNavLinks(false)
            setVideoUploading(false)
            clearVideoObject()
            setLoaderSubText(0)
            buildCV()
            clearUploadSignature()
            navigation.navigate('Dashboard')
          }
        )
        setVideoUploading(false)
        toggleHideNavLinks(false)
      })
      .catch(err => {
        Alert.alert('Unable to upload video, please try again later')
        navigation.navigate('Dashboard')
      })
  }

  const renderLoaderSubText = () => {
    if (loaderSubText === 0)
      return 'this may take 2 minutes or so depending on the speed of your network connection'
    if (loaderSubText === 1) return 'still uploading video, please be patient'
    if (loaderSubText > 1)
      return 'slow network detected... please be patient, almost done'
  }

  const renderContent = () => {
    if (!videoObject) return null
    if (videoUploading)
      return (
        <LoaderWithText
          mainText="uploading video"
          subText={renderLoaderSubText()}
        />
      )
    if (loading) return <LoaderFullScreen />
    return (
      <View style={styles.videoBed}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: videoObject.uri
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
            style={styles.deleteButton}
            onPress={() => clearVideoObject()}
          >
            <MaterialCommunityIcons
              name="delete-circle"
              style={styles.deleteButtonIcon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => createUploadSignature()}
          style={styles.uploadButton}
        >
          <Text style={styles.uploadButtonText}>upload video</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  playButton: {
    paddingRight: 25
  },
  playButtonIcon: {
    color: '#ffff',
    fontSize: 42
  },
  deleteButton: {
    paddingLeft: 25
  },
  deleteButtonIcon: {
    color: 'red',
    fontSize: 50
  },
  uploadButton: {
    backgroundColor: '#278ACD',
    borderColor: '#ffff',
    borderWidth: 2,
    borderRadius: 7,
    alignSelf: 'center',
    marginTop: 10
  },
  uploadButtonText: {
    color: '#ffff',
    padding: 15
  }
})

export default VideoPlaybackUpload
