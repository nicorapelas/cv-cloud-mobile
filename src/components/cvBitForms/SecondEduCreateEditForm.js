import React, { useContext, useState, useEffect } from 'react'
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
import { useKeyboard } from '@react-native-community/hooks'
import {
  MaterialIcons,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import moment from 'moment'
import uuid from 'uuid/v4'
import FormHintModal from '../hints/FormHintModal'
import LoaderFullScreen from '../../components/loadingModals/LoaderFullScreen'
import { Context as SecondEduContext } from '../../context/SecondEduContext'
import { Context as UniversalContext } from '../../context/UniversalContext'
import YearPicker from '../yearPicker/YearPicker'

const SecondEduCreateEditForm = ({
  formType,
  navigation,
  id,
  incomingSchoolName,
  incomingStartDate,
  incomingEndDate,
  incomingSubjects,
  incomingAdditionalInfo,
}) => {
  const [schoolName, setSchoolName] = useState(
    incomingSchoolName ? incomingSchoolName : null
  )

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState()

  const [subject, setSubject] = useState(null)
  const [subjectsArray, setSubjectsArray] = useState([])

  const [additionalInfo, setAdditionalInfo] = useState(
    incomingAdditionalInfo ? incomingAdditionalInfo : null
  )

  const [schoolNameInputShow, setSchoolNameInputShow] = useState(true)
  const [datesInputShow, setDatesInputShow] = useState(false)
  const [subjectsInputShow, setSubjectsInputShow] = useState(false)
  const [additionalInfoInputShow, setAdditionalInfoInputShow] = useState(false)
  const [saveButtonShow, setSaveButtonShow] = useState(false)

  const {
    state: { yearPickerProps, yearPickerShow },
    buildCV,
    toggleHideNavLinks,
    setYearPickerShow,
    setYearPickerProps,
    setStartDateToCompare,
  } = useContext(UniversalContext)

  const {
    state: { loading, error },
    createSecondEdu,
    editSecondEdu,
    addError,
    clearSecondEduErrors,
  } = useContext(SecondEduContext)

  useEffect(() => {
    if (incomingStartDate) {
      setStartDate(incomingStartDate)
    }
    if (incomingEndDate) {
      setEndDate(incomingEndDate)
    }
    if (incomingSubjects) {
      setSubjectsArray(incomingSubjects)
    }
  }, [])

  useEffect(() => {
    setDatesFromPicker()
  })

  useEffect(() => {
    if (error) toggleHideNavLinks(false)
  }, [error])

  useEffect(() => {
    if (error) {
      if (error.schoolName) setSchoolNameInputShow(true)
      if (error.dates) setDatesInputShow(true)
    }
  }, [error])

  useEffect(() => {
    if (startDate) {
      setStartDateToCompare(startDate)
    }
  }, [startDate])

  const keyboard = useKeyboard()

  const setDatesFromPicker = () => {
    if (!yearPickerProps) return null
    const { bit, yearSelected } = yearPickerProps
    if (bit === 'startDate') {
      setStartDate(yearSelected)
    }
    if (bit === 'endDate') {
      setEndDate(yearSelected)
    }
  }

  const errorHeading = () => {
    if (error === null) return null
    return (
      <View style={styles.errorHeadingBed}>
        <Text style={styles.errorHeadingText}>please attend to errors</Text>
      </View>
    )
  }

  const datesInputNext = () => {
    if (moment(startDate) > moment(endDate)) {
      addError({ dates: `The end date cannot be prior to the start date` })
    } else {
      setDatesInputShow(false)
      setSubjectsInputShow(true)
    }
  }

  const datesInput = () => {
    if (!datesInputShow) return null
    if (!yearPickerProps) {
      return (
        <View style={error && error.dates ? styles.datesErrorBed : null}>
          <Text style={styles.inputHeader}>Dates attended</Text>
          <YearPicker
            bit="startDate"
            buttonText="start date"
            incomingYearSelected={startDate}
          />
          <YearPicker
            bit="endDate"
            buttonText="end date"
            incomingYearSelected={endDate}
          />
          <View style={styles.nextBackButtonsBed}>
            <TouchableOpacity
              style={styles.addButtonContainer}
              onPress={() => {
                setDatesInputShow(false)
                setSchoolNameInputShow(true)
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
          {!error || error === null || yearPickerShow ? null : (
            <>
              {error.dates ? (
                <Text style={styles.error}>{error.dates}</Text>
              ) : null}
            </>
          )}
        </View>
      )
    } else {
      const { bit } = yearPickerProps
      if (bit === 'startDate') {
        return (
          <>
            <Text style={styles.yearPickerHeader}>Start date</Text>
            <YearPicker bit="startDate" buttonText="start date" />
          </>
        )
      }
      if (bit === 'endDate') {
        return (
          <>
            <Text style={styles.yearPickerHeader}>End date</Text>
            <YearPicker bit="endDate" buttonText="end date" />
          </>
        )
      }
    }
  }

  const schoolNameInputNext = () => {
    if (!schoolName || !schoolName.replace(/\s/g, '').length) {
      addError({ schoolName: `'School Name' is required` })
      Keyboard.dismiss()
    } else {
      setSchoolNameInputShow(false)
      setDatesInputShow(true)
    }
  }

  const schoolNameInput = () => {
    if (!schoolNameInputShow) return null
    return (
      <View>
        <Text style={styles.inputHeader}>School Name</Text>
        <TextInput
          style={styles.input}
          maxLength={30}
          textAlign="center"
          placeholder="school name"
          value={schoolName}
          onFocus={clearSecondEduErrors}
          autoFocus={!error ? true : false}
          onChangeText={setSchoolName}
          autoCorrect={false}
          autoCapitalize="words"
        />
        {!error || error === null || yearPickerShow ? (
          <Text style={styles.maxCharactersNote}>
            max 30 characters ({!schoolName ? '0' : schoolName.length}
            /30)
          </Text>
        ) : (
          <>
            {error.schoolName ? (
              <Text style={styles.error}>{error.schoolName}</Text>
            ) : null}
          </>
        )}
        <View style={styles.nextBackButtonsBed}>
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => schoolNameInputNext()}
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

  const addSubject = () => {
    if (!subject || !subject.replace(/\s/g, '').length) {
      return null
    } else {
      const queryUnique = subjectsArray.filter((sub) => {
        return sub.subject === subject
      })
      if (queryUnique.length !== 0) {
        return null
      } else {
        return setSubjectsArray([...subjectsArray, { subject, key: uuid() }])
      }
    }
  }

  const removeArrayItem = (key) => {
    const newArray = subjectsArray.filter((sub) => sub.key !== key)
    setSubjectsArray(newArray)
  }

  const renderSubjectsArray = () => {
    if (!subjectsArray || subjectsArray.length < 1) return null
    return subjectsArray.map((sub) => {
      return (
        <View style={styles.itemListBed} key={sub.key}>
          <Text style={styles.itemList}>{sub.subject}</Text>
          <TouchableOpacity style={styles.deleteButton}>
            <MaterialCommunityIcons
              style={styles.deleteButtonIcon}
              name="delete"
              onPress={() => removeArrayItem(sub.key)}
            />
          </TouchableOpacity>
        </View>
      )
    })
  }

  const subjectsInput = () => {
    if (!subjectsInputShow) return null
    return (
      <View>
        {renderSubjectsArray()}
        <TextInput
          style={styles.input}
          maxLength={25}
          onSubmitEditing={() => {
            addSubject()
            setSubject(null)
          }}
          returnKeyLabel="add"
          blurOnSubmit={false}
          textAlign="center"
          placeholder="subject"
          value={subject}
          onChangeText={setSubject}
          autoCorrect={true}
          autoCapitalize="words"
          autoFocus={!error ? true : false}
        />
        <Text style={styles.maxCharactersNote}>
          max 25 characters ({!subject ? '0' : subject.length}
          /25)
        </Text>
        {keyboard.keyboardShown ? (
          <>
            <View style={styles.donePlusButtonBed}>
              <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={() => {
                  addSubject()
                  setSubject(null)
                  Keyboard.dismiss()
                }}
              >
                <AntDesign name="caretdown" style={styles.addButtonIcon} />
                <Text
                  style={
                    Platform.OS === 'ios'
                      ? styles.addButtonTextIos
                      : styles.addButtonText
                  }
                >
                  done
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={() => {
                  addSubject()
                  setSubject(null)
                }}
              >
                <AntDesign name="plus" style={styles.addButtonIcon} />
                <Text
                  style={
                    Platform.OS === 'ios'
                      ? styles.addButtonTextIos
                      : styles.addButtonText
                  }
                >
                  add
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.nextBackButtonsBed}>
            <TouchableOpacity
              style={styles.addButtonContainer}
              onPress={() => {
                setSubjectsInputShow(false)
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
                setSubjectsInputShow(false)
                setAdditionalInfoInputShow(true)
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
        )}
      </View>
    )
  }

  const additionalInfoInput = () => {
    if (!additionalInfoInputShow) return null
    return (
      <View>
        <Text style={styles.inputHeader}>Additional information</Text>
        <TextInput
          style={styles.inputTextArea}
          maxLength={180}
          multiline={true}
          numberOfLines={50}
          placeholder="additional information"
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
          autoCorrect={true}
          autoCapitalize="sentences"
          autoFocus={!error ? true : false}
        />
        <Text style={styles.maxCharactersNote}>
          max 180 characters ({!additionalInfo ? '0' : additionalInfo.length}
          /180)
        </Text>
        <View style={styles.nextBackButtonsBed}>
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => {
              setAdditionalInfoInputShow(false)
              setSubjectsInputShow(true)
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
              setAdditionalInfoInputShow(false)
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

  const renderPreview = () => {
    if (!saveButtonShow) return null
    return (
      <View style={styles.previewBed}>
        {!schoolName ? null : (
          <View>
            <Text style={styles.previewLabel}>School Name</Text>
            <Text style={styles.previewText}>{schoolName}</Text>
          </View>
        )}
        {!startDate || !endDate ? null : (
          <View>
            <Text style={styles.previewLabel}>Dates attended</Text>
            <Text style={styles.previewText}>
              {startDate}-{endDate}
            </Text>
          </View>
        )}
        {!subjectsArray || subjectsArray.length < 1 ? null : (
          <View>
            <Text style={styles.previewLabel}>Subjects</Text>
            {subjectsArray.map((sub) => {
              return <Text key={sub.key}>{sub.subject}</Text>
            })}
          </View>
        )}
        {!additionalInfo || additionalInfo.length < 1 ? null : (
          <View>
            <Text style={styles.previewAdditionlInfoLabel}>
              Additional information
            </Text>
            <Text style={styles.previewText}>{additionalInfo}</Text>
          </View>
        )}
      </View>
    )
  }

  const saveButton = () => {
    if (!saveButtonShow) return null
    const formValues = {
      schoolName,
      startDate,
      endDate,
      subjects: subjectsArray,
      additionalInfo,
    }
    return (
      <View style={styles.nextBackButtonsBed}>
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => {
            setSaveButtonShow(false)
            setAdditionalInfoInputShow(true)
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
            setStartDateToCompare(null)
            formType === 'edit'
              ? editSecondEdu(id, formValues, () => {
                  toggleHideNavLinks(false)
                  navigation.navigate('SecondEdu')
                })
              : createSecondEdu(formValues, () => {
                  toggleHideNavLinks(false)
                  navigation.navigate('SecondEdu')
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
        {schoolNameInput()}
        {datesInput()}
        {subjectsInput()}
        {additionalInfoInput()}
        {saveButton()}
        {saveButtonShow ? null : <FormHintModal bit="secondEdu" />}
      </>
    )
  }

  const renderContent = () => {
    if (loading) return <LoaderFullScreen />
    return (
      <>
        <NavigationEvents
          onWillBlur={() => {
            clearSecondEduErrors()
            setYearPickerShow(false)
            setYearPickerProps(null)
          }}
          onWillFocus={() => {
            clearSecondEduErrors()
            setYearPickerShow(false)
            setYearPickerProps(null)
          }}
        />
        <View View style={styles.bed}>
          {errorHeading()}
          {!yearPickerShow ? (
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
  maxCharactersNote: {
    color: '#ffff',
    width: '85%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    height: 50,
    width: '85%',
    textAlign: 'center',
    borderRadius: 7,
    margin: 5,
  },
  inputTextArea: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    width: '85%',
    textAlignVertical: 'top',
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
  yearPickerHeader: {
    color: '#ffff',
    alignSelf: 'center',
    fontSize: 22,
    fontFamily: 'sourceSansProExtraLight',
    marginBottom: -15,
  },
  datesErrorBed: {
    borderColor: '#ff0033',
    backgroundColor: '#ffcfd8',

    borderRadius: 7,
    borderWidth: 2,
  },
  error: {
    color: '#ff0033',
    alignSelf: 'center',
    paddingBottom: 10,
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
    marginTop: 15,
    marginBottom: 30,
    height: 40,
  },
  donePlusButtonBed: {
    flexDirection: 'row',
    alignSelf: 'center',
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
    marginBottom: 20,
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
    marginTop: 10,
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
  itemListBed: {
    backgroundColor: '#ffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
    alignSelf: 'center',
    borderRadius: 25,
    padding: 3,
    marginVertical: 2,
  },
  itemList: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 7,
  },
  deleteButton: {
    backgroundColor: '#f56c6c',
    borderRadius: 25,
  },
  deleteButtonIcon: {
    color: '#ffff',
    fontSize: 20,
    padding: 7,
  },
})

export default withNavigation(SecondEduCreateEditForm)
