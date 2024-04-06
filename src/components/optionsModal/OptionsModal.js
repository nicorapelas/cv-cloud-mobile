import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Overlay } from 'react-native-elements'
import { Context as UniversalContext } from '../../context/UniversalContext'

const OptionsModal = ({ bit, incomingValue }) => {
  const [showModal, setShowModal] = useState(false)
  const [placeholder, setPlaceholder] = useState(null)

  const {
    state: { optionsModalSelectedOption },
    setOptionsModalSelectedOption,
  } = useContext(UniversalContext)

  useEffect(() => {
    if (bit === 'certificateType' && !incomingValue)
      setPlaceholder('certification type')
    if (bit === 'certificateType' && incomingValue)
      setPlaceholder(incomingValue)
    if (bit === 'gender' && !incomingValue) setPlaceholder('gender')
    if (bit === 'gender' && incomingValue) setPlaceholder(incomingValue)
  }, [bit, incomingValue])

  const appendOptions = () => {
    switch (bit) {
      case 'gender':
        return (
          <View style={styles.optionsBed}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setOptionsModalSelectedOption(null)
                setShowModal(false)
              }}
            >
              <Text style={styles.optionText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setOptionsModalSelectedOption('female')
                setShowModal(false)
              }}
            >
              <Text style={styles.optionText}>female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setOptionsModalSelectedOption('male')
                setShowModal(false)
              }}
            >
              <Text style={styles.optionText}>male</Text>
            </TouchableOpacity>
          </View>
        )
      case 'certificateType':
        return (
          <View style={styles.optionsBed}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setOptionsModalSelectedOption(null)
                setShowModal(false)
              }}
            >
              <Text style={styles.optionText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setOptionsModalSelectedOption('certificate')
                setShowModal(false)
              }}
            >
              <Text style={styles.optionText}>certificate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setOptionsModalSelectedOption('diploma')
                setShowModal(false)
              }}
            >
              <Text style={styles.optionText}>diploma</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setOptionsModalSelectedOption('degree')
                setShowModal(false)
              }}
            >
              <Text style={styles.optionText}>degree</Text>
            </TouchableOpacity>
          </View>
        )
      default:
        null
    }
  }

  const modal = () => {
    return (
      <Overlay
        isVisible={showModal}
        windowBackgroundColor="rgba(0, 0, 0, 0.7)"
        overlayBackgroundColor="rgba(0, 0, 0, 0)"
        width="95%"
        height="auto"
      >
        <View style={styles.modalBed}>{appendOptions()}</View>
      </Overlay>
    )
  }

  return (
    <>
      {modal()}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowModal(true)}
      >
        <Text
          style={
            optionsModalSelectedOption || incomingValue
              ? styles.buttonText
              : styles.buttonTextPlaceholder
          }
        >
          {!optionsModalSelectedOption || incomingValue
            ? placeholder
            : optionsModalSelectedOption}
        </Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  modalBed: {
    alignItems: 'center',
  },
  optionsBed: {
    backgroundColor: '#ffff',
    paddingHorizontal: 60,
    paddingVertical: 20,
    justifyContent: 'center',
    borderRadius: 10,
  },
  option: {
    marginVertical: 5,
  },
  optionText: {
    color: '#5e5e5e',
    fontSize: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    height: 50,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    margin: 5,
  },
  buttonTextPlaceholder: {
    color: '#B6B8BA',
  },
  buttonText: {
    color: '#000000',
  },
})

export default OptionsModal
