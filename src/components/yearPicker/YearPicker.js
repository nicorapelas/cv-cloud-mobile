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
import { Context as SecondEduContext } from '../../context/SecondEduContext'
import { Context as TertEduContext } from '../../context/TertEduContext'
import { Context as EmployHistoryContext } from '../../context/EmployHistoryContext'
import { yearsArray } from './years'

const YearPicker = ({ bit, buttonText, incomingYearSelected }) => {
  const [yearSelected, setYearSelected] = useState()
  const [condensedYearArray, setCondensedYearArray] = useState([])

  const {
    state: { yearPickerShow, startDateToCompare },
    setYearPickerShow,
    setYearPickerProps,
    clearYearPickerProps,
  } = useContext(UniversalContext)

  const { clearSecondEduErrors } = useContext(SecondEduContext)
  const { clearTertEduErrors } = useContext(TertEduContext)
  const { clearEmployHistoryErrors } = useContext(EmployHistoryContext)

  useEffect(() => {
    setYearPickerProps({ bit, yearSelected })
  }, [yearSelected])

  useEffect(() => {
    if (yearPickerShow === false) {
      clearYearPickerProps()
    }
  }, [yearPickerShow])

  useEffect(() => {
    if (startDateToCompare) {
      const condensedArray = yearsArray.filter((year) => {
        return year.value > startDateToCompare
      })
      setCondensedYearArray(condensedArray)
    }
  }, [startDateToCompare])

  const androidPicker = () => {
    return (
      <View style={styles.pickerBed}>
        <WheelPicker
          width="fullWidth"
          selectedValue={yearSelected}
          onValueChange={(itemValue) => setYearSelected(itemValue)}
          backgroundColor="white"
          itemStyle={{ color: '#1a1a1a' }}
        >
          {condensedYearArray.length > 0 && bit === 'endDate'
            ? condensedYearArray.map((year) => {
                return (
                  <Item key={year.key} label={year.text} value={year.value} />
                )
              })
            : yearsArray.map((year) => {
                return (
                  <Item key={year.key} label={year.text} value={year.value} />
                )
              })}
        </WheelPicker>
        <TouchableOpacity
          style={styles.pickerDoneButton}
          onPress={() => {
            setYearPickerShow(false)
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
          selectedValue={yearSelected}
          onValueChange={(itemValue, itemIndex) => setYearSelected(itemValue)}
          style={styles.listItem}
        >
          {condensedYearArray.length > 0 && bit === 'endDate'
            ? yearsArray.map((year) => {
                return (
                  <Picker.Item
                    key={year.key}
                    label={year.text}
                    value={year.value}
                  />
                )
              })
            : condensedYearArray.map((year) => {
                return (
                  <Picker.Item
                    key={year.key}
                    label={year.text}
                    value={year.value}
                  />
                )
              })}
        </Picker>
        <TouchableOpacity
          style={styles.pickerDoneButton}
          onPress={() => {
            setYearPickerShow(false)
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
          setYearPickerShow(true)
          setYearPickerProps({ bit })
          clearSecondEduErrors()
          clearTertEduErrors()
          clearEmployHistoryErrors()
        }}
      >
        <Text
          style={
            !incomingYearSelected ? styles.dummyInputText : styles.inputText
          }
        >
          {!incomingYearSelected ? buttonText : incomingYearSelected}
        </Text>
      </TouchableOpacity>
    )
  }

  const renderContent = () => {
    if (!yearPickerShow) {
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
    borderRadius: 7,
    margin: 20,
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

export default YearPicker
