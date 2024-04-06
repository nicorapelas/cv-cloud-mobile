import React, { useState, useContext } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { Context as UniversalContext } from '../../context/UniversalContext'

import photo001 from '../../../assets/portraitPhotos/photo006-200.png'
import photo002 from '../../../assets/portraitPhotos/photo004-200.png'
import photo004 from '../../../assets/portraitPhotos/photo002-200.png'
import photo005 from '../../../assets/portraitPhotos/photo005-200.png'

const PhotoSamples = () => {
  const [showPhoto1, setShowPhoto1] = useState(true)
  const [showPhoto2, setShowPhoto2] = useState(false)
  const [showPhoto3, setShowPhoto3] = useState(false)
  const [showPhoto4, setShowPhoto4] = useState(false)

  const {
    state: { showPhotoSample },
    setPhotoSampleViewShow
  } = useContext(UniversalContext)

  const backButtonAction = () => {
    if (showPhoto1) {
      setShowPhoto1(false)
      setShowPhoto4(true)
    }
    if (showPhoto4) {
      setShowPhoto4(false)
      setShowPhoto3(true)
    }
    if (showPhoto3) {
      setShowPhoto3(false)
      setShowPhoto2(true)
    }
    if (showPhoto2) {
      setShowPhoto2(false)
      setShowPhoto1(true)
    }
  }

  const nextButtonAction = () => {
    if (showPhoto1) {
      setShowPhoto1(false)
      setShowPhoto2(true)
    }
    if (showPhoto2) {
      setShowPhoto2(false)
      setShowPhoto3(true)
    }
    if (showPhoto3) {
      setShowPhoto3(false)
      setShowPhoto4(true)
    }
    if (showPhoto4) {
      setShowPhoto4(false)
      setShowPhoto1(true)
    }
  }

  const renderPhotoSamples = () => {
    return (
      <View>
        {!showPhoto1 ? null : (
          <>
            <Image style={styles.photo} source={photo001} />
            <Text style={styles.photoText}>Photo by Nico Rapelas</Text>
          </>
        )}
        {!showPhoto2 ? null : (
          <>
            <Image style={styles.photo} source={photo002} />
            <Text style={styles.photoText}>
              Photo by Daniel Xavier from Pexels
            </Text>
          </>
        )}
        {!showPhoto3 ? null : (
          <>
            <Image style={styles.photo} source={photo004} />
            <Text style={styles.photoText}>
              Photo by Italo Melo from Pexels
            </Text>
          </>
        )}
        {!showPhoto4 ? null : (
          <>
            <Image style={styles.photo} source={photo005} />
            <Text style={styles.photoText}>
              Photo by Christina Morillo from Pexels
            </Text>
          </>
        )}
        <View style={styles.selectbuttonBed}>
          <TouchableOpacity
            style={styles.selectbutton}
            onPress={() => backButtonAction()}
          >
            <AntDesign name="caretleft" style={styles.selectButtonIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectbutton}
            onPress={() => nextButtonAction()}
          >
            <AntDesign name="caretright" style={styles.selectButtonIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setPhotoSampleViewShow(false)}
        >
          <Ionicons
            style={styles.backButtonIcon}
            name="ios-close-circle-outline"
          />
          <Text style={styles.backButtonText}>close</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderButton = () => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => setPhotoSampleViewShow(true)}
      >
        <Text style={styles.buttonText}>view samples photos</Text>
      </TouchableOpacity>
    )
  }

  return !showPhotoSample ? renderButton() : renderPhotoSamples()
}

const styles = StyleSheet.create({
  photo: {
    borderColor: '#ffff',
    borderWidth: 7,
    width: 200,
    height: 200,
    alignSelf: 'center'
  },
  photoText: {
    color: '#ffff',
    fontSize: 8,
    marginTop: 3
  },
  button: {
    backgroundColor: '#278acd',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 5
  },
  buttonText: {
    color: '#ffff',
    padding: 10
  },
  selectbuttonBed: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  selectbutton: {
    backgroundColor: '#278acd',
    borderRadius: 5,
    marginTop: 15,
    marginHorizontal: 10
  },
  selectButtonIcon: {
    color: '#ffff',
    padding: 12,
    fontSize: 18
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20
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

export default PhotoSamples
