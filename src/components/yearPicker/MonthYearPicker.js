import React, { useState, useEffect, useContext } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Ionicons } from '@expo/vector-icons'
import { WheelPicker, Item } from 'react-native-android-wheel-picker'

import { Context as UniversalContext } from '../../context/UniversalContext'
import { Context as EmployHistoryContext } from '../../context/EmployHistoryContext'
import { monthsArray } from './months'
import { yearsArray } from './years'

const MonthYearPicker = ({ bit, buttonText, incomingDate }) => {
  const [monthSelected, setMonthSeleced] = useState(null)
  const [yearSelected, setYearSelected] = useState(null)
  const [condensedYearArray, setCondensedYearArray] = useState([])

  const {
    state: { monthYearPickerShow, startDateToCompare },
    setMonthYearPickerShow,
    setMonthYearPickerProps,
    clearMonthYearPickerProps,
  } = useContext(UniversalContext)

  const { clearEmployHistoryErrors } = useContext(EmployHistoryContext)

  useEffect(() => {
    setMonthYearPickerProps({ bit, monthSelected, yearSelected })
  }, [monthSelected, yearSelected])

  useEffect(() => {
    if (monthYearPickerShow === false) {
      clearMonthYearPickerProps()
    }
  }, [monthYearPickerShow])

  useEffect(() => {
    if (startDateToCompare) {
      const condensedArray = yearsArray.filter((year) => {
        return year.value >= startDateToCompare
      })
      setCondensedYearArray(condensedArray)
    }
  }, [startDateToCompare])

  const iosPicker = () => {
    if (!monthYearPickerShow) return null
    return (
      <View style={styles.pickerBed}>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={monthSelected}
            onValueChange={(itemValue) => setMonthSeleced(itemValue)}
          >
            {monthsArray.map((month) => {
              return (
                <Picker.Item
                  key={month.key}
                  label={month.text}
                  value={month.value}
                />
              )
            })}
          </Picker>
          <Picker
            style={styles.picker}
            selectedValue={yearSelected}
            onValueChange={(itemValue) => setYearSelected(itemValue)}
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
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.pickerDoneButton}
          onPress={() => setMonthYearPickerShow(false)}
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

  const androidPicker = () => {
    if (!monthYearPickerShow) return null
    return (
      <View style={styles.pickerBed}>
        <View style={styles.pickerContainer}>
          <View style={styles.wheel}>
            <WheelPicker
              selectedValue={monthSelected}
              onValueChange={(itemValue) => setMonthSeleced(itemValue)}
              backgroundColor="white"
              itemStyle={{ color: '#1a1a1a' }}
            >
              {monthsArray.map((month) => {
                return (
                  <Item
                    key={month.key}
                    label={month.text}
                    value={month.value}
                  />
                )
              })}
            </WheelPicker>
          </View>
          <View style={styles.wheel}>
            <WheelPicker
              selectedValue={yearSelected}
              onValueChange={(itemValue) => setYearSelected(itemValue)}
              backgroundColor="white"
              itemStyle={{ color: '#1a1a1a' }}
            >
              {condensedYearArray.length > 0 && bit === 'endDate'
                ? condensedYearArray.map((year) => {
                    return (
                      <Item
                        key={year.key}
                        label={year.text}
                        value={year.value}
                      />
                    )
                  })
                : yearsArray.map((year) => {
                    return (
                      <Item
                        key={year.key}
                        label={year.text}
                        value={year.value}
                      />
                    )
                  })}
            </WheelPicker>
          </View>
        </View>
        <TouchableOpacity
          style={styles.pickerDoneButton}
          onPress={() => setMonthYearPickerShow(false)}
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

  const renderButtonText = () => {
    if (!incomingDate) {
      return <Text style={styles.dummyInputText}>{buttonText}</Text>
    } else {
      return <Text style={styles.inputText}>{incomingDate}</Text>
    }
  }

  const button = () => {
    if (monthYearPickerShow) return null
    return (
      <TouchableOpacity
        style={styles.dummyInput}
        onPress={() => {
          setMonthYearPickerShow(true)
          setMonthYearPickerProps({ bit })
          clearEmployHistoryErrors()
        }}
      >
        {renderButtonText()}
      </TouchableOpacity>
    )
  }

  return (
    <>
      {Platform.OS === 'ios' ? iosPicker() : androidPicker()}
      {button()}
    </>
  )
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
    margin: 10,
    borderRadius: 7,
  },
  pickerContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  picker: {
    width: '50%',
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
  wheel: {
    width: '50%',
  },
})

export default MonthYearPicker
