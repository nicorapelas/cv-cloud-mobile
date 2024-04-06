import React, { useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'
import { Context as CertificateContext } from '../../../context/CertificateContext'
import { Context as UniversalContext } from '../../../context/UniversalContext'
import InstructionModal from '../../../components/instructions/instructionModal'

const CertificateCreateScreen = ({ navigation }) => {
  const {
    state: { loading }
  } = useContext(CertificateContext)

  const { toggleInstructionModal } = useContext(UniversalContext)

  const pdfOptionModal = () => {
    return (
      <View style={styles.uploadOptionBed}>
        <Text style={styles.uploadOptionHeading}>
          Upload a PDF document (recommended)
        </Text>
        <TouchableOpacity
          style={styles.documentSelectButton}
          onPress={() => navigation.navigate('CertificatePdfUpload')}
        >
          <View style={styles.documentSelectButtonsBed}>
            <Ionicons
              style={styles.documentSelectButtonIcon}
              name="md-document"
            />
            <Text style={styles.documentSelectButtonText}>select PDF file</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.note}>
          if you don't have any certificates in PDF format on your device, click
          the button below for instructions.
        </Text>
        <TouchableOpacity
          style={styles.inistructionLink}
          onPress={() => toggleInstructionModal(true)}
        >
          <AntDesign name="infocirlce" style={styles.inistructionLinkIcon} />
          <Text style={styles.inistructionLinkText}>
            PDF capture instructions
          </Text>
        </TouchableOpacity>
        <KeyboardSpacer />
      </View>
    )
  }

  const photoOptionModal = () => {
    return (
      <View style={styles.uploadOptionBed}>
        <Text style={styles.uploadOptionHeading}>
          Upload a photo of a document
        </Text>
        <TouchableOpacity
          style={styles.documentSelectButton}
          onPress={() => navigation.navigate('CertificatePhotoUpload')}
        >
          <View style={styles.documentSelectButtonsBed}>
            <Ionicons
              style={styles.documentSelectButtonIcon}
              name="md-document"
            />
            <Text style={styles.documentSelectButtonText}>
              select or take photo
            </Text>
          </View>
        </TouchableOpacity>
        <KeyboardSpacer />
      </View>
    )
  }

  const renderContent = () => {
    if (loading) return <LoaderFullScreen />
    return (
      <View style={styles.bed}>
        {pdfOptionModal()}
        {photoOptionModal()}
      </View>
    )
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
