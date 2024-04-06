import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Keyboard,
} from 'react-native'
import { Text } from 'react-native-elements'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { withNavigation, NavigationEvents } from 'react-navigation'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import FormHintModal from '../../components/hints/FormHintModal'
import LoaderFullScreen from '../../components/loadingModals/LoaderFullScreen'
import MonthYearpicker from '../yearPicker/MonthYearPicker'
import { Context as EmployHistoryContext } from '../../context/EmployHistoryContext'
import { Context as UniversalContext } from '../../context/UniversalContext'

const EmployHistoryCreateEditForm = ({
  formType,
  navigation,
  id,
  incomingCompany,
  incomingPosition,
  incomingDescription,
  incomingStartDate,
  incomingEndDate,
}) => {
  const [company, setCompany] = useState(
    incomingCompany ? incomingCompany : null
  )
  const [position, setPosition] = useState(
    incomingPosition ? incomingPosition : null
  )
  const [description, setDescription] = useState(
    incomingDescription ? incomingDescription : null
  )

  const [startDate, setStartDate] = useState(
    !incomingStartDate ? null : incomingStartDate
  )
  const [endDate, setEndDate] = useState(
    !incomingEndDate ? null : incomingEndDate
  )

  const [startDateMonth, setStartDateMonth] = useState(null)
  const [startDateYear, setStartDateYear] = useState(null)
  const [endDateMonth, setEndDateMonth] = useState(null)
  const [endDateYear, setEndDateYear] = useState(null)
  const [startDateValue, setStartDateValue] = useState(null)

  const [startMonthValue, setStartMonthValue] = useState(null)
  const [endMonthValue, setEndMonthValue] = useState(null)

  const [companyNameInputShow, setCompanyNameInputShow] = useState(true)
  const [datesInputShow, setDatesInputShow] = useState(false)
  const [positionInputShow, setPositionInputShow] = useState(false)
  const [descriptionInputShow, setDescriptionInputShow] = useState(false)
  const [saveButtonShow, setSaveButtonShow] = useState(false)

  const [current, setCurrent] = useState(false)

  const {
    state: { monthYearPickerProps, monthYearPickerShow },
    buildCV,
    toggleHideNavLinks,
    setMonthYearPickerShow,
    clearMonthYearPickerProps,
    setStartDateToCompare,
  } = useContext(UniversalContext)

  const {
    state: { loading, error },
    createEmployHistory,
    editEmployHistory,
    addError,
    clearEmployHistoryErrors,
  } = useContext(EmployHistoryContext)

  useEffect(() => {
    if (monthYearPickerProps) {
      setDatesFromPicker()
    }
  }, [monthYearPickerProps])

  useEffect(() => {
    if (error) toggleHideNavLinks(false)
  }, [error])

  useEffect(() => {
    if (startDateMonth) {
      assignStartMonthValue()
    }
    if (endDateMonth) {
      assignEndMonthValue()
    }
  }, [startDateMonth, endDateMonth])

  useEffect(() => {
    if (current) {
      setEndDate(null)
    }
  }, [current])

  useEffect(() => {
    if (!startDateYear && startMonthValue) setStartDateValue(startMonthValue)
    if (startDateYear && !startMonthValue) setStartDateValue(startDateYear)
    if (startDateYear && startMonthValue)
      setStartDateValue(startDateYear + startMonthValue)
  }, [startDateYear, startMonthValue])

  useEffect(() => {
    if (startDateYear) {
      setStartDateToCompare(startDateYear)
    }
  }, [startDateYear])

  const errorHeading = () => {
    if (error === null) return null
    return (
      <View style={styles.errorHeadingBed}>
        <Text style={styles.errorHeadingText}>please attend to errors</Text>
      </View>
    )
  }

  const setDatesFromPicker = () => {
    const { bit, monthSelected, yearSelected } = monthYearPickerProps
    if (bit === 'startDate') {
      if (!monthSelected && !yearSelected) {
        setStartDate(null)
        return
      }
      if (monthSelected && !yearSelected) {
        setStartDate(null)
        setStartDateMonth(monthSelected)
        return
      }
      if (!monthSelected && yearSelected) {
        setStartDate(yearSelected)
        setStartDateYear(yearSelected)
        return
      } else {
        setStartDate(`${monthSelected} ${yearSelected}`)
        setStartDateMonth(monthSelected)
        setStartDateYear(yearSelected)
      }
    }
    if (bit === 'endDate') {
      if (!monthSelected && !yearSelected) {
        setEndDate(null)
        return
      }
      if (monthSelected && !yearSelected) {
        setEndDate(null)
        setEndDateMonth(monthSelected)
        return
      }
      if (!monthSelected && yearSelected) {
        setEndDate(yearSelected)
        setEndDateYear(yearSelected)
        return
      } else {
        setEndDate(`${monthSelected} ${yearSelected}`)
        setEndDateMonth(monthSelected)
        setEndDateYear(yearSelected)
      }
    }
  }

  const assignStartMonthValue = () => {
    if (startDateMonth === 'January') setStartMonthValue('1')
    if (startDateMonth === 'February') setStartMonthValue('2')
    if (startDateMonth === 'March') setStartMonthValue('3')
    if (startDateMonth === 'April') setStartMonthValue('4')
    if (startDateMonth === 'May') setStartMonthValue('5')
    if (startDateMonth === 'June') setStartMonthValue('6')
    if (startDateMonth === 'July') setStartMonthValue('7')
    if (startDateMonth === 'August') setStartMonthValue('8')
    if (startDateMonth === 'September') setStartMonthValue('9')
    if (startDateMonth === 'October') setStartMonthValue('10')
    if (startDateMonth === 'November') setStartMonthValue('11')
    if (startDateMonth === 'December') setStartMonthValue('12')
  }

  const assignEndMonthValue = () => {
    if (endDateMonth === 'January') setEndMonthValue('1')
    if (endDateMonth === 'February') setEndMonthValue('2')
    if (endDateMonth === 'March') setEndMonthValue('3')
    if (endDateMonth === 'April') setEndMonthValue('4')
    if (endDateMonth === 'May') setEndMonthValue('5')
    if (endDateMonth === 'June') setEndMonthValue('6')
    if (endDateMonth === 'July') setEndMonthValue('7')
    if (endDateMonth === 'August') setEndMonthValue('8')
    if (endDateMonth === 'September') setEndMonthValue('9')
    if (endDateMonth === 'October') setEndMonthValue('10')
    if (endDateMonth === 'November') setEndMonthValue('11')
    if (endDateMonth === 'December') setEndMonthValue('12')
  }

  const datesInputNext = () => {
    if (!startDate || !endDate) {
      setDatesInputShow(false)
      setDescriptionInputShow(true)
      return
    }
    if (startDateYear + startMonthValue > endDateYear + endMonthValue) {
      addError({ dates: `The end date cannot be prior to the start date` })
      return
    } else {
      setDatesInputShow(false)
      setDescriptionInputShow(true)
      return
    }
  }

  const datesInput = () => {
    if (!datesInputShow) return null
    if (!monthYearPickerProps) {
      return (
        <View style={error && error.dates ? styles.datesErrorBed : null}>
          <Text style={styles.inputHeader}>Dates attended</Text>
          <MonthYearpicker
            bit="startDate"
            buttonText="start date"
            incomingDate={startDate}
          />
          {current ? (
            <TouchableOpacity
              onPress={() => setCurrent(false)}
              style={styles.input}
            >
              <Text style={styles.currentButtonUndoText}>Current</Text>
            </TouchableOpacity>
          ) : (
            <MonthYearpicker
              bit="endDate"
              buttonText="end date"
              incomingDate={endDate}
            />
          )}
          {current ? null : (
            <>
              <Text style={styles.orText}>or</Text>
              <TouchableOpacity
                onPress={() => {
                  setCurrent(true)
                  setEndDate(null)
                }}
                style={styles.currentButton}
              >
                <Text style={styles.currentButtonText}>Current</Text>
              </TouchableOpacity>
            </>
          )}
          <View style={styles.nextBackButtonsBed}>
            <TouchableOpacity
              style={styles.addButtonContainer}
              onPress={() => {
                setDatesInputShow(false)
                setPositionInputShow(true)
                clearEmployHistoryErrors()
              }}
            >
              <Ionicons
                name="arrow-back-circle-sharp"
                style={styles.addButtonIcon}
              />
              <Text
                style={
                  Platform.OS === 'ios'
                    ? styles.addButtonTextIos
                    : styles.addButtonText
                }
              >
                back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButtonContainer}
              onPress={() => datesInputNext()}
            >
              <Text
                style={
                  Platform.OS === 'ios'
                    ? styles.addButtonTextIos
                    : styles.addButtonText
                }
              >
                next
              </Text>
              <Ionicons
                name="arrow-forward-circle-sharp"
                style={styles.nextButtonIcon}
              />
            </TouchableOpacity>
          </View>
          {!error || error === null || monthYearPickerShow ? null : (
            <>
              {error.dates ? (
                <Text style={styles.error}>{error.dates}</Text>
              ) : null}
            </>
          )}
        </View>
      )
    } else {
      const { bit } = monthYearPickerProps
      if (bit === 'startDate') {
        return (
          <>
            <Text style={styles.yearPickerHeader}>Start date</Text>
            <MonthYearpicker bit="startDate" buttonText="start date" />
          </>
        )
      } else {
        return (
          <>
            <Text style={styles.yearPickerHeader}>End date</Text>
            <MonthYearpicker bit="endDate" buttonText="end date" />
          </>
        )
      }
    }
  }

  const descriptionInput = () => {
    if (!descriptionInputShow) return null
    return (
      <View>
        <Text style={styles.inputHeader}>Work description</Text>
        <TextInput
          style={styles.inputTextArea}
          maxLength={230}
          multiline={true}
          numberOfLines={50}
          placeholder="work description"
          value={description}
          onChangeText={setDescription}
          autoCorrect={true}
          autoCapitalize="sentences"
          autoFocus={!error ? true : false}
        />
        <Text style={styles.maxCharactersNote}>
          max 230 characters ({!description ? '0' : description.length}
          /230)
        </Text>
        <View style={styles.nextBackButtonsBed}>
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => {
              setDescriptionInputShow(false)
              setDatesInputShow(true)
            }}
          >
            <Ionicons
              name="arrow-back-circle-sharp"
              style={styles.addButtonIcon}
            />
            <Text
              style={
                Platform.OS === 'ios'
                  ? styles.addButtonTextIos
                  : styles.addButtonText
              }
            >
              back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => {
              setDescriptionInputShow(false)
              setSaveButtonShow(true)
            }}
          >
            <Text
              style={
                Platform.OS === 'ios'
                  ? styles.addButtonTextIos
                  : styles.addButtonText
              }
            >
              next
            </Text>
            <Ionicons
              name="arrow-forward-circle-sharp"
              style={styles.nextButtonIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const positionInput = () => {
    if (!positionInputShow) return null
    return (
      <View>
        <Text style={styles.inputHeader}>Position</Text>
        <TextInput
          style={styles.input}
          maxLength={25}
          textAlign="center"
          placeholder="position"
          value={position}
          onChangeText={setPosition}
          autoCorrect={true}
          autoCapitalize="words"
          autoFocus={!error ? true : false}
        />
        <Text style={styles.maxCharactersNote}>
          max 25 characters ({!position ? '0' : position.length}
          /25)
        </Text>
        <View style={styles.nextBackButtonsBed}>
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => {
              setPositionInputShow(false)
              setCompanyNameInputShow(true)
            }}
          >
            <Ionicons
              name="arrow-back-circle-sharp"
              style={styles.addButtonIcon}
            />
            <Text
              style={
                Platform.OS === 'ios'
                  ? styles.addButtonTextIos
                  : styles.addButtonText
              }
            >
              back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => {
              setPositionInputShow(false)
              setDatesInputShow(true)
            }}
          >
            <Text
              style={
                Platform.OS === 'ios'
                  ? styles.addButtonTextIos
                  : styles.addButtonText
              }
            >
              next
            </Text>
            <Ionicons
              name="arrow-forward-circle-sharp"
              style={styles.nextButtonIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const companyNameInputNext = () => {
    if (!company || !company.replace(/\s/g, '').length) {
      addError({ company: `'Company Name' is required` })
      Keyboard.dismiss()
    } else {
      setCompanyNameInputShow(false)
      setPositionInputShow(true)
    }
  }

  const companyNameInput = () => {
    if (!companyNameInputShow) return null
    return (
      <View>
        <Text style={styles.inputHeader}>Company Name</Text>
        <TextInput
          style={styles.input}
          maxLength={25}
          textAlign="center"
          placeholder="company name"
          value={company}
          onFocus={clearEmployHistoryErrors}
          onChangeText={setCompany}
          autoCorrect={false}
          autoCapitalize="words"
          autoFocus={!error ? true : false}
        />
        {!error || error === null ? (
          <Text style={styles.maxCharactersNote}>
            max 25 characters ({!company ? '0' : company.length}
            /25)
          </Text>
        ) : (
          <>
            {error.company ? (
              <Text style={styles.error}>{error.company}</Text>
            ) : null}
          </>
        )}
        <View style={styles.nextBackButtonsBed}>
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => companyNameInputNext()}
          >
            <Text
              style={
                Platform.OS === 'ios'
                  ? styles.addButtonTextIos
                  : styles.addButtonText
              }
            >
              next
            </Text>
            <Ionicons
              name="arrow-forward-circle-sharp"
              style={styles.nextButtonIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderEndDatePreview = () => {
    if (current) {
      return <Text>Current</Text>
    }
    if (endDate) {
      return <Text>{endDate}</Text>
    }
    return null
  }

  const renderPreview = () => {
    if (!saveButtonShow) return null
    return (
      <View style={styles.previewBed}>
        {!company ? null : (
          <View>
            <Text style={styles.previewLabel}>Company Name</Text>
            <Text style={styles.previewText}>{company}</Text>
          </View>
        )}
        {!position ? null : (
          <View>
            <Text style={styles.previewLabel}>Position</Text>
            <Text style={styles.previewText}>{position}</Text>
          </View>
        )}
        {!startDate && !endDate ? null : (
          <View>
            <Text style={styles.previewLabel}>Dates attended</Text>
            <Text style={styles.previewText}>
              {startDate} - {renderEndDatePreview()}
            </Text>
          </View>
        )}
        {!description || description.length < 1 ? null : (
          <View>
            <Text style={styles.previewAdditionlInfoLabel}>
              Work description
            </Text>
            <Text style={styles.previewText}>{description}</Text>
          </View>
        )}
      </View>
    )
  }

  const saveButton = () => {
    if (!saveButtonShow) return null
    const formValues = {
      company,
      startDate,
      endDate,
      current,
      startDateValue,
      position,
      description,
    }
    return (
      <View style={styles.nextBackButtonsBed}>
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => {
            setSaveButtonShow(false)
            setDescriptionInputShow(true)
          }}
        >
          <Ionicons
            name="arrow-back-circle-sharp"
            style={styles.addButtonIcon}
          />
          <Text
            style={
              Platform.OS === 'ios'
                ? styles.addButtonTextIos
                : styles.addButtonText
            }
          >
            edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => {
            toggleHideNavLinks(true)
            formType === 'edit'
              ? editEmployHistory(id, formValues, () => {
                  toggleHideNavLinks(false)
                  navigation.navigate('EmployHistory')
                })
              : createEmployHistory(formValues, () => {
                  toggleHideNavLinks(false)
                  navigation.navigate('EmployHistory')
                })
            buildCV()
          }}
        >
          <MaterialIcons style={styles.addButtonIcon} name="add-circle" />
          <Text
            style={
              Platform.OS === 'ios'
                ? styles.addButtonTextIos
                : styles.addButtonText
            }
          >
            save
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderForm = () => {
    return (
      <>
        {companyNameInput()}
        {positionInput()}
        {datesInput()}
        {descriptionInput()}
        {saveButton()}
        {saveButtonShow ? null : <FormHintModal bit="employmentHistory" />}
      </>
    )
  }

  const renderContent = () => {
    if (loading) return <LoaderFullScreen />
    return (
      <>
        <NavigationEvents
          onWillBlur={() => {
            clearEmployHistoryErrors()
            setMonthYearPickerShow(false)
            clearMonthYearPickerProps()
          }}
          onWillFocus={() => {
            clearEmployHistoryErrors()
            setMonthYearPickerShow(false)
            clearMonthYearPickerProps()
          }}
        />
        <View View style={styles.bed}>
          {errorHeading()}
          {!monthYearPickerShow ? (
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
              keyboardShouldPersistTaps="always"
            >
              {renderPreview()}
              {renderForm()}
              {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
            </ScrollView>
          ) : (
            <>
              <View style={styles.yearPickerBed}>{renderForm()}</View>
              {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
            </>
          )}
        </View>
      </>
    )
  }
  return renderContent()
}

const styles = StyleSheet.create({
  bed: {
    backgroundColor: '#232936',
    flex: 1,
    width: '100%',
  },
  formBed: {
    flexDirection: 'column',
    paddingTop: 30,
    paddingBottom: 10,
  },
  inputHeader: {
    color: '#ffff',
    width: '85%',
    alignSelf: 'center',
  },
  orText: {
    color: '#ffff',
    textAlign: 'center',
    margin: 5,
  },
  currentButton: {
    backgroundColor: '#278ACD',
    borderColor: '#ffff',
    borderWidth: 2,
    alignSelf: 'center',
    height: 50,
    width: '85%',
    borderRadius: 7,
    margin: 5,
  },
  currentButtonText: {
    color: '#ffff',
    alignSelf: 'center',
    paddingTop: 15,
  },
  currentButtonUndoText: {
    alignSelf: 'center',
    paddingTop: 15,
  },
  input: {
    backgroundColor: '#ffff',
    alignSelf: 'center',
    height: 50,
    width: '85%',
    textAlign: 'center',
    borderRadius: 7,
    margin: 5,
  },
  maxCharactersNote: {
    color: '#ffff',
    width: '85%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  inputTextArea: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    textAlignVertical: 'top',
    width: '85%',
    height: 100,
    borderRadius: 7,
    padding: 5,
    margin: 5,
  },
  yearPickerBed: {
    flex: 1,
    justifyContent: 'center',
  },
  errorHeadingBed: {
    backgroundColor: '#ffcfd8',
    borderColor: '#ff0033',
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
    width: '85%',
    marginVertical: 10,
  },
  errorHeadingText: {
    color: '#ff0033',
    padding: 10,
    alignSelf: 'center',
  },
  datesErrorBed: {
    borderColor: '#ff0033',
    backgroundColor: '#ffcfd8',
    borderRadius: 7,
    borderWidth: 2,
  },
  yearPickerHeader: {
    color: '#ffff',
    alignSelf: 'center',
    fontSize: 22,
    fontFamily: 'sourceSansProExtraLight',
    marginBottom: -5,
  },
  error: {
    color: '#ff0033',
    alignSelf: 'center',
    paddingBottom: 10,
  },
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
    marginTop: 17,
  },
  datePickerBed: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 15,
  },
  pickerBackButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  pickerBackButtonIcon: {
    color: '#278ACD',
    paddingRight: 7,
    paddingTop: 2,
    fontSize: 20,
  },
  pickerBackButtonText: {
    color: '#278ACD',
    fontSize: 18,
  },
  startEndDateButtonContainer: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    height: 50,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    margin: 5,
  },
  startEndDateButtonText: {
    color: '#B6B8BA',
  },
  startEndDateText: {
    color: '#030303',
  },
  doneButtonContainer: {
    backgroundColor: '#278ACD',
    borderColor: '#ffff',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    width: 90,
    height: 40,
    marginTop: 15,
    marginBottom: 25,
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
    marginTop: 5,
    marginBottom: 15,
    height: 40,
    marginHorizontal: 5,
  },
  addButtonIcon: {
    color: '#ffff',
    fontSize: 18,
    paddingRight: 5,
  },
  addButtonTextIos: {
    color: '#ffff',
    fontSize: 18,
  },
  addButtonText: {
    color: '#ffff',
    fontSize: 18,
    marginBottom: 4,
  },
  nextBackButtonsBed: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
  },
  nextButtonIcon: {
    color: '#ffff',
    fontSize: 18,
    paddingLeft: 5,
  },
  previewBed: {
    backgroundColor: '#ffff',
    alignSelf: 'center',
    width: '90%',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  previewLabel: {
    fontFamily: 'sourceSansProBold',
  },
  previewAdditionlInfoLabel: {
    fontFamily: 'sourceSansProBold',
    marginTop: 7,
  },
  previewText: {
    marginBottom: 5,
  },
})

export default withNavigation(EmployHistoryCreateEditForm)
