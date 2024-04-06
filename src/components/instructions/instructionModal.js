import React, { useState, useEffect, useContext } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native'
import { Overlay } from 'react-native-elements'
import AppLink from 'react-native-app-link'
import { Ionicons, Octicons, AntDesign } from '@expo/vector-icons'
import { Context as UniversalContext } from '../../context/UniversalContext'
import { Context as FirstImpressionContext } from '../../context/FirstImpressionContext'

const InstructionModal = ({ bit }) => {
  const [incomingBit, setIncomingBit] = useState('')

  const {
    state: { instructionModalShow },
    toggleInstructionModal
  } = useContext(UniversalContext)

  const { setVideoDemoShow } = useContext(FirstImpressionContext)

  useEffect(() => {
    setIncomingBit(bit)
  }, [])

  const renderInstruction = () => {
    if (incomingBit === 'firstImpression') return firstImpressionInstruction()
    if (incomingBit === 'certificate') return certificateInstruction()
    return null
  }

  const certificateInstruction = () => {
    return (
      <View style={styles.hitBed}>
        <Text style={styles.subHeading}>Adding PDF files</Text>
        <Text style={styles.stepHeading}>Step 1</Text>
        <Text style={styles.hintText}>
          Download and install the 'Genius Scan' app (link bellow instructions)
        </Text>
        <Text style={styles.stepHeading}>Step 2</Text>
        <Text style={styles.hintText}>
          Open Genius Scan and use to scan certificates in PDF format
        </Text>
        <Text style={styles.hintText}>
          (Your certificates should now be available on your device file system)
        </Text>
        <Text style={styles.stepHeading}>Step 3</Text>
        <Text style={styles.hintText}>
          Return to CV Cloud and upload certificates
        </Text>
        <TouchableOpacity
          style={styles.appLink}
          onPress={() =>
            AppLink.openInStore({
              appName: 'genius-scan-pdf-scanner',
              appStoreId: '377672876',
              appStoreLocale: 'za',
              playStoreId: 'com.thegrizzlylabs.geniusscan.free'
            })
          }
        >
          <Text style={styles.appLinkText}>download Genius Scan</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const firstImpressionInstruction = () => {
    return (
      <View style={styles.hitBed}>
        <Text style={styles.subHeading}>First impression</Text>
        <Text style={styles.paragraph}>
          Here you have the opportunity to share a 30 second video clip of
          yourself with a potential employer.
        </Text>
        <Text style={styles.paragraph}>
          First impressions go a long way so make it count!
        </Text>
        <View style={styles.dotHintBed}>
          <Octicons style={styles.dot} name="primitive-dot" />
          <Text style={styles.hintText}>
            Record while holding your phone upright
          </Text>
        </View>
        <View style={styles.phoneOutlineBody}>
          <View style={styles.phoneOutlineButtonBed}>
            <View>
              <View style={styles.phoneOutlineButton}></View>
            </View>
          </View>
        </View>
        <View style={styles.dotHintBed}>
          <Octicons style={styles.dot} name="primitive-dot" />
          <Text style={styles.hintText}>
            Be mindful of your body language and posture
          </Text>
        </View>
        <View style={styles.dotHintBed}>
          <Octicons style={styles.dot} name="primitive-dot" />
          <Text style={styles.hintText}>Speak clearly</Text>
        </View>
        <View style={styles.dotHintBed}>
          <Octicons style={styles.dot} name="primitive-dot" />
          <Text style={styles.hintText}>Dress the part</Text>
        </View>
        <View style={styles.dotHintBed}>
          <Octicons style={styles.dot} name="primitive-dot" />
          <Text style={styles.hintText}>
            Mention the attached certificates, if any
          </Text>
        </View>
        <View style={styles.dotHintBed}>
          <Octicons style={styles.dot} name="primitive-dot" />
          <Text style={styles.hintText}>Be authentic</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.demoButton}
            onPress={() => setVideoDemoShow(true)}
          >
            <AntDesign name="play" style={styles.playIcons} />
            <Text style={styles.demoButtonText}>Play Demo</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderModal = () => {
    if (!bit) return null
    return (
      <Overlay
        isVisible={instructionModalShow}
        windowBackgroundColor="rgba(0, 0, 0, 0.7)"
        overlayBackgroundColor="rgba(0, 0, 0, 0)"
        width="auto"
        height="auto"
      >
        <View style={styles.messageBed}>
          <ScrollView>
            <View style={styles.headingBed}>
              <AntDesign name="infocirlce" style={styles.headingIcon} />
            </View>
            <View style={styles.hintListBed}>{renderInstruction()}</View>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => toggleInstructionModal(false)}
            >
              <Ionicons
                style={styles.backButtonIcon}
                name="ios-close-circle-outline"
              />
              <Text style={styles.backButtonText}>close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Overlay>
    )
  }

  return renderModal()
}

const styles = StyleSheet.create({
  messageBed: {
    backgroundColor: '#232936',
    width: '90%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 10
  },
  headingBed: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingBottom: 5
  },
  headingText: {
    color: '#7ac6fa',
    fontSize: 28
  },
  headingIcon: {
    color: '#7ac6fa',
    fontSize: 27,
    margin: 7
  },
  subHeading: {
    color: '#7ac6fa',
    fontSize: 18,
    paddingBottom: 3,
    alignSelf: 'center'
  },
  hitBed: {
    paddingBottom: 7
  },
  dotHintBed: {
    flexDirection: 'row',
    paddingVertical: 2
  },
  dot: {
    color: '#7ac6fa',
    fontSize: 13,
    paddingRight: 7,
    paddingTop: 4
  },
  hintText: {
    color: '#7ac6fa',
    fontSize: 14
  },
  phoneOutlineBody: {
    borderColor: '#7ac6fa',
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: 'center',
    height: 40,
    width: 25,
    marginVertical: 5
  },
  phoneOutlineButtonBed: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  phoneOutlineButton: {
    borderColor: '#7ac6fa',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 25,
    height: 5,
    width: 5,
    marginBottom: 2
  },
  description: {
    color: '#7ac6fa'
  },
  paragraph: {
    color: '#7ac6fa',
    paddingVertical: 2
  },
  examplesIntro: {
    color: '#7ac6fa',
    paddingVertical: 10
  },
  stepHeading: {
    color: '#7ac6fa',
    fontWeight: '900',
    paddingTop: 10
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15
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
  },
  appLink: {
    borderColor: '#7ac6fa',
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20
  },
  appLinkText: {
    color: '#7ac6fa',
    padding: 7
  },
  demoButton: {
    borderColor: '#7ac6fa',
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 7,
    padding: 7
  },
  playIcons: {
    color: '#7ac6fa',
    fontSize: 27,
    margin: 7,
    alignSelf: 'center'
  },
  demoButtonText: {
    color: '#7ac6fa'
  }
})

export default InstructionModal
