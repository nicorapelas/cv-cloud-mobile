import React, { useContext, useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
  Text,
} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { withNavigation } from 'react-navigation'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'expo-camera'
import { Fontisto, MaterialIcons } from '@expo/vector-icons'
import { keys } from '../../../../config/keys_dev'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'
import PhotoPermissions from '../photoScreens/PhotoPermissions'
import FormHintModal from './../../../components/hints/FormHintModal'
import { Context as PhotoContext } from '../../../context/PhotoContext'
import { Context as UniversalContext } from '../../../context/UniversalContext'

const PhotoCreateScreen = ({ navigation }) => {
  const [modal, setModal] = useState(true)
  const [title, setTitle] = useState(null)
  const [imageUri, setImageUri] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState(null)
  const [galleryPermissionStatus, setGalleryPermissionStatus] = useState(null)

  const {
    state: { loading, uploadSignature },
    createPhoto,
    createUploadSignature,
    clearUploadSignature,
  } = useContext(PhotoContext)

  const { toggleHideNavLinks, buildCV } = useContext(UniversalContext)

  console.log(imageFile)

  useEffect(() => {
    if (uploadSignature) {
      imageUpload()
    }
  }, [uploadSignature])

  const randomFileName =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    Date.now().toString()

  const imageUpload = () => {
    const { apiKey, signature, timestamp } = uploadSignature
    const data = new FormData()
    data.append('file', {
      uri: imageFile.uri,
      type: `image/${imageFile.uri.split('.')[1]}`,
      name: imageFile.name,
    })
    data.append('api_key', apiKey)
    data.append('signature', signature)
    data.append('timestamp', timestamp)
    data.append('upload_preset', 'photo')
    fetch(keys.cloudinary.uploadImageUrl, {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toggleHideNavLinks(false)
          clearUploadSignature()
          Alert.alert('Unable to upload image, please try again later')
          navigation.navigate('Dashboard')
          return
        }
        createPhoto(
          {
            title: title,
            photoUrl: data.url,
            publicId: data.public_id,
          },
          () => {
            toggleHideNavLinks(false)
            buildCV()
            clearUploadSignature()
            navigation.navigate('Photo')
          }
        )
        toggleHideNavLinks(false)
      })
      .catch((err) => {
        Alert.alert('Unable to upload image, please try again later')
        return
      })
  }

  const pickFromGallery = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.15,
      })
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `image/${data.uri.split('.')[1]}`,
          name: `${randomFileName}.${data.uri.split('.')[1]}`,
        }
        setImageUri(newFile.uri)
        setImageFile(newFile)
        setModal(false)
      }
    } else {
      setGalleryPermissionStatus(false)
    }
  }

  const pickFromCamera = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync()
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      })
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `image/${data.uri.split('.')[1]}`,
          name: `${randomFileName}.${data.uri.split('.')[1]}`,
        }
        setImageUri(newFile.uri)
        setImageFile(newFile)
        setModal(false)
      }
    } else {
      setCameraPermissionStatus(false)
    }
  }

  const titleField = () => {
    if (!imageUri || imageUri.length < 1) return null
    return (
      <View>
        <ScrollView keyboardShouldPersistTaps="always">
          <Image source={{ uri: imageUri }} style={styles.photo} />
          <TextInput
            style={styles.input}
            textAlign="center"
            placeholder="image title"
            value={title}
            onChangeText={setTitle}
            autoCorrect={false}
            autoCapitalize="words"
          />
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => createUploadSignature()}
          >
            <MaterialIcons style={styles.addButtonIcon} name="add-circle" />
            <Text style={styles.addButtonText}>save</Text>
          </TouchableOpacity>
          <KeyboardSpacer />
        </ScrollView>
      </View>
    )
  }

  const cameraOrGallery = () => {
    if (modal === false) return null
    return (
      <View>
        <TouchableOpacity
          style={styles.imageSelectButton}
          onPress={pickFromGallery}
        >
          <View style={styles.imageSelectButtonsBed}>
            <Fontisto style={styles.imageSelectButtonIcon} name="photograph" />
            <Text style={styles.imageSelectButtonText}>gallery</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageSelectButton}
          onPress={pickFromCamera}
        >
          <View style={styles.imageSelectButtonsBed}>
            <Fontisto style={styles.imageSelectButtonIcon} name="camera" />
            <Text style={styles.imageSelectButtonText}>camera</Text>
          </View>
        </TouchableOpacity>
        <FormHintModal bit="photo" />
      </View>
    )
  }

  const renderContent = () => {
    if (loading) return <LoaderFullScreen />
    if (cameraPermissionStatus === false)
      return <PhotoPermissions bit="camera" />
    if (galleryPermissionStatus === false)
      return <PhotoPermissions bit="gallery" />
    return (
      <View style={styles.bed}>
        {cameraOrGallery()}
        {titleField()}
      </View>
    )
  }

  return renderContent()
}

PhotoCreateScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>upload photo</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="Photo" />,
  }
}

const styles = StyleSheet.create({
  heading: {
    color: '#ffff',
    fontSize: 22,
  },
  bed: {
    backgroundColor: '#232936',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  imageSelectButton: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#278ACD',
    borderColor: '#ffff',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
  },
  imageSelectButtonsBed: {
    flexDirection: 'row',
  },
  imageSelectButtonText: {
    color: '#ffff',
    fontSize: 18,
    paddingVertical: 10,
  },
  imageSelectButtonIcon: {
    color: '#ffff',
    fontSize: 22,
    paddingTop: 10,
    paddingRight: 10,
  },
  buttonContentBed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
  buttonIcon: {
    color: '#42daf5',
    fontSize: 24,
  },
  buttonText: {
    color: '#42daf5',
    fontSize: 20,
  },
  cancelButton: {
    alignSelf: 'center',
    width: 37,
    marginTop: 10,
    backgroundColor: '#232936',
    borderRadius: 25,
    borderColor: 'red',
    borderWidth: 2,
  },
  cancelButtonIcon: {
    fontSize: 22,
    color: 'red',
    padding: 5,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 7,
    alignSelf: 'center',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#ffffff',
    height: 50,
    width: '85%',
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 7,
    margin: 5,
  },
  addButtonContainer: {
    backgroundColor: '#278ACD',
    borderColor: '#ffff',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    width: 90,
    margin: 5,
    height: 40,
  },
  addButtonIcon: {
    color: '#ffff',
    fontSize: 18,
    paddingRight: 5,
  },
  addButtonText: {
    color: '#ffff',
    fontSize: 18,
  },
})

export default withNavigation(PhotoCreateScreen)
