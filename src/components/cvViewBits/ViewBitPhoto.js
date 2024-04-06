import React from 'react'
import { StyleSheet, Image } from 'react-native'

const ViewBitPhoto = ({
  assignedPhotoUrl,
  assignedPhotoUrlSample,
  showSample,
  zoom,
}) => {
  const renderSample = () => {
    if (!showSample) return null
    return (
      <Image
        style={
          zoom === 'zoomedOut' ? stylesZoomedOut.photo : stylesZoomedIn.photo
        }
        source={{ uri: assignedPhotoUrlSample }}
      />
    )
  }

  const renderContent = () => {
    if (
      showSample ||
      assignedPhotoUrl === null ||
      assignedPhotoUrl === 'noneAssigned'
    )
      return null
    return (
      <Image
        style={
          zoom === 'zoomedOut' ? stylesZoomedOut.photo : stylesZoomedIn.photo
        }
        source={{ uri: assignedPhotoUrl }}
      />
    )
  }

  return (
    <>
      {renderSample()}
      {renderContent()}
    </>
  )
}

const stylesZoomedOut = StyleSheet.create({
  photo: {
    width: 90,
    height: 90,
    marginTop: 12,
    alignSelf: 'center',
    borderColor: '#ffff',
    borderWidth: 2,
  },
})

const stylesZoomedIn = StyleSheet.create({
  photo: {
    width: 185,
    height: 185,
    marginTop: 35,
    alignSelf: 'center',
    borderColor: '#ffff',
    borderWidth: 7,
  },
})

export default ViewBitPhoto
