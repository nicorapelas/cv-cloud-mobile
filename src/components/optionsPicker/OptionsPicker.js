import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { WheelPicker, Item } from 'react-native-android-wheel-picker'
import { Ionicons } from '@expo/vector-icons'

import { Context as UniversalContext } from '../../context/UniversalContext'
import { genderArray } from './genderArray'
import { provinceArray } from './provinceArray'

const OptionsPicker = ({ buttonText, incomingOption, bit }) => {
  const [optionsArray, setOptionsArray] = useState()
  const [optionSelected, setOptionSelected] = useState()

  const {
    state: { optionPickerShow },
    setOptionPickerShow,
    setOptionPickerProps,
  } = useContext(UniversalContext)

  useEffect(() => {
    if (bit === 'province') setOptionsArray(provinceArray)
    if (bit === 'gender') setOptionsArray(genderArray)
  }, [bit])

  useEffect(() => {
    setOptionPickerProps(optionSelected)
  }, [optionSelected])

  useEffect(() => {
    if (optionPickerShow === false) {
      setOptionPickerProps(null)
    }
  }, [optionPickerShow])

  const androidPicker = () => {
    return (
      <View style={styles.pickerBed}>
        <WheelPicker
          width="fullWidth"
          selectedValue={optionSelected}
          onValueChange={(itemValue) => setOptionSelected(itemValue)}
          itemStyle={{ color: '#1a1a1a' }}
        >
          {optionsArray.map((option) => {
            return (
              <Item key={option.key} label={option.name} value={option.value} />
            )
          })}
        </WheelPicker>
        <TouchableOpacity
          style={styles.pickerDoneButton}
          onPress={() => {
            setOptionPickerShow(false)
          }}
        >
          <Ionicons
            style={styles.pickerDoneButtonIcon}
            name="ios-checkmark-circle-outline"
          />
          <Text style={styles.pickerDoneButtonText}>done</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const iosPicker = () => {
    return (
      <View style={styles.pickerBed}>
        <Picker
          selectedValue={optionSelected}
          onValueChange={(itemValue, itemIndex) => setOptionSelected(itemValue)}
          style={styles.listItem}
        >
          {optionsArray.map((option) => {
            return (
              <Picker.Item
                key={option.key}
                label={option.name}
                value={option.value}
              />
            )
          })}
        </Picker>
        <TouchableOpacity
          style={styles.pickerDoneButton}
          onPress={() => {
            setOptionPickerShow(false)
          }}
        >
          <Ionicons
            style={styles.pickerDoneButtonIcon}
            name="ios-checkmark-circle-outline"
          />
          <Text style={styles.pickerDoneButtonText}>done</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const showPickerButton = () => {
    return (
      <TouchableOpacity
        style={styles.dummyInput}
        onPress={() => {
          setOptionPickerShow(true)
          setOptionPickerProps()
        }}
      >
        <Text
          style={!incomingOption ? styles.dummyInputText : styles.inputText}
        >
          {!incomingOption ? buttonText : incomingOption}
        </Text>
      </TouchableOpacity>
    )
  }

  const renderContent = () => {
    if (!optionPickerShow) {
      return showPickerButton()
    }
    return Platform.OS === 'ios' ? iosPicker() : androidPicker()
  }

  return renderContent()
}

const styles = StyleSheet.create({
  dummyInput: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    alignItems: 'center',
    height: 50,
    width: '85%',
    borderRadius: 7,
    margin: 5,
  },
  dummyInputText: {
    color: '#B6B8BA',
    marginTop: 17,
  },
  inputText: {
    marginTop: 17,
  },
  pickerBed: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    margin: 20,
    marginTop: 100,
  },
  pickerDoneButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  pickerDoneButtonIcon: {
    color: '#278ACD',
    paddingRight: 7,
    paddingTop: 2,
    fontSize: 20,
  },
  pickerDoneButtonText: {
    color: '#278ACD',
    fontSize: 18,
  },
})

export default OptionsPicker
