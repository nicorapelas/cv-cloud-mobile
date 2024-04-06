import React, { useContext, useRef, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { Video } from 'expo-av'

import DeleteModal from '../../components/cvBitDeleteModals/DeleteModal'
import LoaderFullScreen from '../../components/loadingModals/LoaderFullScreen'
import { Context as FirstImpressionContext } from '../../context/FirstImpressionContext'
import { Context as UniversalContext } from '../../context/UniversalContext'

const VideoPlayerRetake = ({ firstImpression }) => {
  const video = useRef(null)
  const [status, setStatus] = useState({})

  const {
    state: { loading }
  } = useContext(FirstImpressionContext)

  const { showDeleteModal } = useContext(UniversalContext)

  const renderContent = () => {
    if (!firstImpression.videoUrl) return null
    if (loading) return <LoaderFullScreen />
    return (
      <View style={styles.videoBed}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: firstImpression.videoUrl
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
            onPress={() => showDeleteModal()}
          >
            <MaterialCommunityIcons
              name="delete-circle"
              style={styles.deleteButtonIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <>
      <DeleteModal
        id={firstImpression._id}
        publicId={firstImpression.publicId}
        bit="first impression"
      />
      {renderContent()}
    </>
  )
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
  }
})

export default VideoPlayerRetake
