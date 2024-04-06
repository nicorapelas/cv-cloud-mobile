import React, { useContext, useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native'
import { Text } from 'react-native-elements'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { withNavigation } from 'react-navigation'
import * as DocumentPicker from 'expo-document-picker'
import { useKeyboard } from '@react-native-community/hooks'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import { keys } from '../../../../config/keys_dev'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import LoaderWithText from '../../../components/loadingModals/LoaderWithText'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'
import { Context as CertificateContext } from '../../../context/CertificateContext'
import { Context as UniversalContext } from '../../../context/UniversalContext'
import InstructionModal from '../../../components/instructions/instructionModal'

const CertificateCreateScreen = ({ navigation }) => {
  const [title, setTitle] = useState(null)
  const [pdfUrl, setPdfUrl] = useState(null)
  const [documentName, setDocumentName] = useState(null)
  const [pdfUploading, setPdfUploading] = useState(false)

  const {
    state: { loading, uploadSignature },
    createCertificate,
    createUploadSignature,
    clearUploadSignature
  } = useContext(CertificateContext)

  const { toggleHideNavLinks, buildCV } = useContext(UniversalContext)

  useEffect(() => {
    pickFromDocuments()
  }, [])

  useEffect(() => {
    createFileName()
  }, [pdfUrl])

  useEffect(() => {
    if (uploadSignature) {
      documentUpload()
      setPdfUploading(true)
    }
  }, [uploadSignature])

  const keyboard = useKeyboard()

  const randomFileName =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Date.now().toString()

  const createFileName = () => {
    if (!pdfUrl || pdfUrl.type === 'cancel') return null
    setDocumentName(`${randomFileName}.${pdfUrl.uri.split('.')[1]}`)
  }

  const documentUpload = () => {
    const { apiKey, signature, timestamp } = uploadSignature
    const data = new FormData()
    data.append('file', {
      uri: pdfUrl.uri,
      type: `documents/${pdfUrl.uri.split('.')[1]}`,
      name: documentName
    })
    data.append('api_key', apiKey)
    data.append('timestamp', timestamp)
    data.append('signature', signature)
    fetch(keys.cloudinary.uploadPdfUrl, {
      method: 'post',
      body: data
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          toggleHideNavLinks(false)
          setPdfUrl(null)
          setPdfUploading(false)
          clearUploadSignature()
          Alert.alert('Unable to upload PDF, please try again later')
          navigation.navigate('Dashboard')
          return
        }
        createCertificate(
          {
            title: title,
            pdfUrl: data.url,
            publicId: data.public_id
          },
          () => {
            toggleHideNavLinks(false)
            setPdfUploading(false)
            setPdfUrl(null)
            buildCV()
            clearUploadSignature()
            navigation.navigate('Certificate')
          }
        )
        setPdfUploading(false)
        toggleHideNavLinks(false)
      })
      .catch(err => {
        Alert.alert('Unable to upload PDF, please try again later')
        return
      })
  }

  const pickFromDocuments = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf'
    })
    setPdfUrl(result)
    if (!result || result.length < 1 || result.type === 'cancel') {
      navigation.navigate('CertificateCreate')
      return
    }
  }

  const titleField = () => {
    if (!pdfUrl || pdfUrl.type === 'cancel') return null
    if (pdfUploading)
      return (
        <LoaderWithText
          mainText="uploading PDF document"
          subText="this may take a minute or so depending on the speed of your network connection"
        />
      )
    return (
      <View>
        <ScrollView keyboardShouldPersistTaps="always">
          <AntDesign name="pdffile1" style={styles.fileSelectedIcon} />
          <Text style={styles.fileSelected}>{pdfUrl.name}</Text>
          <TextInput
            style={styles.input}
            textAlign="center"
            placeholder="document title"
            value={title}
            onChangeText={setTitle}
            autoCorrect={false}
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

  const renderContent = () => {
    if (loading) return <LoaderFullScreen />
    return <View style={styles.bed}>{titleField()}</View>
  }

  return (
    <>
      <InstructionModal bit="certificate" />
      {renderContent()}
    </>
  )
}

CertificateCreateScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>upload certificate</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="Certificate" />
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
  uploadOptionBed: {
    borderColor: '#7ac6fa',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    margin: 10
  },
  uploadOptionHeading: {
    color: '#7ac6fa',
    alignSelf: 'center',
    fontWeight: '900',
    marginTop: 5,
    marginBottom: 15
  },
  documentSelectButton: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#278ACD',
    borderColor: '#ffff',
    borderWidth: 2,
    borderRadius: 5
  },
  documentSelectButtonsBed: {
    flexDirection: 'row'
  },
  documentSelectButtonText: {
    color: '#ffff',
    fontSize: 18,
    paddingVertical: 10
  },
  documentSelectButtonIcon: {
    color: '#ffff',
    fontSize: 22,
    paddingTop: 10,
    paddingRight: 10
  },
  fileSelectedIcon: {
    color: '#ffff',
    fontSize: 60,
    alignSelf: 'center',
    paddingBottom: 10
  },
  fileSelected: {
    color: '#ffff',
    alignSelf: 'center',
    maxWidth: '60%',
    textAlign: 'center',
    paddingBottom: 10
  },
  input: {
    backgroundColor: '#ffffff',
    height: 50,
    width: '85%',
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 7,
    margin: 5
  },
  note: {
    color: '#7ac6fa',
    width: '70%',
    textAlign: 'center',
    fontSize: 16,
    alignSelf: 'center',
    paddingVertical: 10
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
    height: 40
  },
  addButtonIcon: {
    color: '#ffff',
    fontSize: 18,
    paddingRight: 5
  },
  addButtonText: {
    color: '#ffff',
    fontSize: 18
  },
  inistructionLink: {
    borderColor: '#7ac6fa',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center'
  },
  inistructionLinkIcon: {
    color: '#7ac6fa',
    fontSize: 22,
    marginRight: 10
  },
  inistructionLinkText: {
    color: '#7ac6fa',
    fontSize: 18
  }
})

export default withNavigation(CertificateCreateScreen)
