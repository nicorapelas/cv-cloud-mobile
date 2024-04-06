import React, { useContext, useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Platform,
  ScrollView,
} from 'react-native'
import { Text, CheckBox } from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler'
import { withNavigation, NavigationEvents } from 'react-navigation'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import FormHintModal from '../hints/FormHintModal'
import LoaderFullScreen from '../loadingModals/LoaderFullScreen'
import OptionsModal from '../optionsModal/OptionsModal'
import OptionsPicker from '../optionsPicker/OptionsPicker'
import { Context as PersonalInfoContext } from '../../context/PersonalInfoContext'
import { Context as UniversalContext } from '../../context/UniversalContext'

const PersonalInfoCreateEditForm = ({
  formType,
  navigation,
  id,
  incomingDateOfBirth,
  incomingDriversLicense,
  incomingFullName,
  incomingGender,
  incomingIdNumber,
  incomingLicenseCode,
  incomingNationality,
  incomingPpNumber,
  incomingSaCitizen,
}) => {
  const [fullName, setFullName] = useState(
    incomingFullName ? incomingFullName : null
  )

  const [dateOfBirth, setDateOfBirth] = useState(new Date())

  const [gender, setGender] = useState(incomingGender ? incomingGender : null)
  const [saCitizen, setSaCitizen] = useState(true)

  const [idNumber, setIdNumber] = useState(
    incomingIdNumber ? incomingIdNumber : null
  )
  const [nationality, setNationality] = useState(
    incomingNationality ? incomingNationality : null
  )
  const [ppNumber, setPpNumber] = useState(
    incomingPpNumber ? incomingPpNumber : null
  )
  const [driversLicense, setDirversLicense] = useState(
    incomingDriversLicense ? incomingDriversLicense : true
  )
  const [licenseCode, setLicenseCode] = useState(
    incomingLicenseCode ? incomingLicenseCode : null
  )

  const [A, setA] = useState(incomingLicenseCode === 'A' ? true : false)
  const [A1, setA1] = useState(incomingLicenseCode === 'A1' ? true : false)
  const [B, setB] = useState(incomingLicenseCode === 'B' ? true : false)
  const [C1, setC1] = useState(incomingLicenseCode === 'C1' ? true : false)
  const [C, setC] = useState(incomingLicenseCode === 'C' ? true : false)
  const [EB, setEB] = useState(incomingLicenseCode === 'EB' ? true : false)
  const [EC1, setEC1] = useState(incomingLicenseCode === 'EC1' ? true : false)
  const [EC, setEC] = useState(incomingLicenseCode === 'EC' ? true : false)

  const [fullNameInputShow, setFullNameInputShow] = useState(true)
  const [idInputShow, setIdInputShow] = useState(false)
  const [licenseInputShow, setLicenseInputShow] = useState(false)
  const [dateOfBirthInputShow, setDateOfBirthInputShow] = useState(false)
  const [genderInputShow, setGenderInputShow] = useState(false)

  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [dummyDateShow, setDummyDateShow] = useState(false)
  const [saveButtonShow, setSaveButtonShow] = useState(false)

  const {
    state: { optionPickerShow, optionsModalSelectedOption },
    buildCV,
    toggleHideNavLinks,
    setOptionPickerShow,
    setOptionsModalSelectedOption,
  } = useContext(UniversalContext)

  const {
    state: { loading, error },
    createPersonalInfo,
    editPersonalInfo,
    addError,
    clearErrors,
  } = useContext(PersonalInfoContext)

  useEffect(() => {
    if (incomingDateOfBirth) {
      const parsedBirthday = new Date(
        moment(incomingDateOfBirth).format('YYYY-MM-DD')
      )
      setDateOfBirth(parsedBirthday)
      setDummyDateShow(true)
    }
  }, [])

  useEffect(() => {
    if (optionsModalSelectedOption) setGender(optionsModalSelectedOption)
  }, [optionsModalSelectedOption])

  useEffect(() => {
    if (error) toggleHideNavLinks(false)
  }, [error])

  useEffect(() => {
    if (incomingSaCitizen === false) setSaCitizen(false)
    if (saCitizen === undefined || saCitizen === true) setSaCitizen(true)
  }, [incomingSaCitizen, saCitizen])

  const errorHeading = () => {
    if (!error) return null
    return (
      <View style={styles.errorHeadingBed}>
        <Text style={styles.errorHeadingText}>please attend to errors</Text>
      </View>
    )
  }

  const toggleSaCitizen = () => setSaCitizen((previousState) => !previousState)

  const toggleDiversLicense = () =>
    setDirversLicense((previousState) => !previousState)

  const onChangeDatePickerIos = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth
    setDateOfBirth(currentDate)
    clearErrors(null)
  }

  const onChangeDatePickerAndroid = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth
    setDatePickerOpen(false)
    setDateOfBirth(currentDate)
    clearErrors(null)
  }

  const renderGenderPicker = () => {
    if (!genderInputShow) return null
    return (
      <>
        {optionPickerShow ? null : (
          <Text style={styles.inputHeader}>Gender</Text>
        )}
        <OptionsModal bit="gender" incomingValue={gender} />

        {/* <OptionsPicker
          bit="gender"
          incomingOption={gender}
          buttonText="gender"
        /> */}
        {optionPickerShow ? null : (
          <View style={styles.nextBackButtonsBed}>
            <TouchableOpacity
              style={styles.addButtonContainer}
              onPress={() => {
                setGenderInputShow(false)
                setDateOfBirthInputShow(true)
                setOptionPickerShow(false)
              }}
            >
              <Ionicons
                name="arrow-back-circle-sharp"
                style={styles.addButtonIcon}
              />
              <Text style={styles.addButtonText}>back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButtonContainer}
              onPress={() => {
                setGenderInputShow(false)
                setIdInputShow(true)
                setOptionPickerShow(false)
              }}
            >
              <Text style={styles.addButtonText}>next</Text>
              <Ionicons
                name="arrow-forward-circle-sharp"
                style={styles.nextButtonIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      </>
    )
  }

  const renderDatePicker = () => {
    let thisDate = new Date()
    if (!dateOfBirthInputShow) return null
    if (dummyDateShow) {
      return (
        <>
          <Text style={styles.inputHeader}>Date of Birth</Text>
          <TouchableOpacity
            style={styles.dummyInput}
            onPress={() => {
              setDummyDateShow(false)
              setDatePickerOpen(true)
            }}
          >
            <Text style={styles.dummyInputText}>
              {dateOfBirth ? moment(dateOfBirth).format('D MMMM YYYY') : ''}
            </Text>
          </TouchableOpacity>
          <View style={styles.nextBackButtonsBed}>
            <TouchableOpacity
              style={styles.addButtonContainer}
              onPress={() => {
                setFullNameInputShow(true)
                setDateOfBirthInputShow(false)
              }}
            >
              <Ionicons
                name="arrow-back-circle-sharp"
                style={styles.addButtonIcon}
              />
              <Text style={styles.addButtonText}>back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButtonContainer}
              onPress={() => {
                setGenderInputShow(true)
                setDateOfBirthInputShow(false)
              }}
            >
              <Text style={styles.addButtonText}>next</Text>
              <Ionicons
                name="arrow-forward-circle-sharp"
                style={styles.nextButtonIcon}
              />
            </TouchableOpacity>
          </View>
        </>
      )
    }
    return (
      <>
        {datePickerOpen ? (
          <View
            style={
              Platform.OS === 'ios'
                ? styles.datePickerBedIos
                : styles.datePickerBedAndroid
            }
          >
            <DateTimePicker
              testID="dateTimePicker"
              value={dateOfBirth}
              mode="date"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={
                Platform.OS === 'ios'
                  ? onChangeDatePickerIos
                  : onChangeDatePickerAndroid
              }
            />
            <TouchableOpacity
              style={
                Platform.OS === 'ios'
                  ? styles.pickerBackButtonIos
                  : styles.pickerBackButtonAndroid
              }
              onPress={() => setDatePickerOpen(false)}
            >
              <Ionicons
                style={styles.pickerBackButtonIcon}
                name="ios-checkmark-circle-outline"
              />
              <Text style={styles.pickerBackButtonText}>done</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.genderButtonBed}>
              <Text style={styles.inputHeader}>Date of Birth</Text>
              <TouchableOpacity
                style={styles.dateOfBirthButtonContainer}
                onPress={() => {
                  setDatePickerOpen(true)
                }}
              >
                {dateOfBirth.getFullYear() === thisDate.getFullYear() ? (
                  <Text style={styles.dateOfBirthButtonText}>
                    date of birth
                  </Text>
                ) : (
                  <Text style={styles.dateOfBirthText}>
                    {moment(dateOfBirth).format('D MMMM YYYY')}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.nextBackButtonsBed}>
              <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={() => {
                  setFullNameInputShow(true)
                  setDateOfBirthInputShow(false)
                }}
              >
                <Ionicons
                  name="arrow-back-circle-sharp"
                  style={styles.addButtonIcon}
                />
                <Text style={styles.addButtonText}>back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={() => {
                  setGenderInputShow(true)
                  setDateOfBirthInputShow(false)
                }}
              >
                <Text style={styles.addButtonText}>next</Text>
                <Ionicons
                  name="arrow-forward-circle-sharp"
                  style={styles.nextButtonIcon}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </>
    )
  }

  const fullNameInputNext = () => {
    if (
      !fullName ||
      fullName.length < 1 ||
      !fullName.replace(/\s/g, '').length
    ) {
      addError({ error: `'Full Name' is required` })
      return
    } else {
      setFullNameInputShow(false)
      setDateOfBirthInputShow(true)
      return
    }
  }

  const renderNameField = () => {
    if (!fullNameInputShow) return null
    return (
      <>
        <View>
          <Text style={styles.inputHeader}>Full Name</Text>
          <TextInput
            style={styles.input}
            maxLength={30}
            onSubmitEditing={() => fullNameInputNext()}
            autoFocus={!error ? true : false}
            returnKeyLabel="next"
            textAlign="center"
            placeholder="full name"
            value={fullName}
            onChangeText={setFullName}
            onFocus={() => clearErrors(null)}
            autoCorrect={false}
            autoCapitalize="words"
          />
        </View>
        {!error ? (
          <Text style={styles.maxCharactersNote}>
            max 30 characters ({!fullName ? '0' : fullName.length}
            /30)
          </Text>
        ) : (
          <Text style={styles.error}>{error}</Text>
        )}
        <View style={styles.nextBackButtonsBed}>
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => fullNameInputNext()}
          >
            <Text style={styles.addButtonText}>next</Text>
            <Ionicons
              name="arrow-forward-circle-sharp"
              style={styles.nextButtonIcon}
            />
          </TouchableOpacity>
        </View>
      </>
    )
  }

  const renderSaCitizenFields = () => {
    if (!idInputShow) return null
    return (
      <>
        <View style={styles.switchFieldBed}>
          <Text style={styles.switchFieldText}>South African citizen?</Text>
          <Switch
            trackColor={{ false: '#ffff', true: '#81b0ff' }}
            thumbColor={saCitizen ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={toggleSaCitizen}
            value={saCitizen}
          />
          <Text style={styles.switchFieldText}>{saCitizen ? 'yes' : 'no'}</Text>
        </View>
        {saCitizen ? (
          <View>
            <Text style={styles.inputHeader}>ID Number</Text>
            <TextInput
              style={styles.input}
              maxLength={13}
              textAlign="center"
              placeholder="ID number"
              value={idNumber}
              onChangeText={setIdNumber}
              autoCorrect={false}
              keyboardType="phone-pad"
            />
          </View>
        ) : (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.inputHeader}>Nationality</Text>
              <TextInput
                style={styles.input}
                maxLength={25}
                textAlign="center"
                placeholder="nationality"
                value={nationality}
                onChangeText={setNationality}
                autoCorrect={true}
                autoCapitalize="words"
              />
              <Text style={styles.maxCharactersNote}>
                max 25 characters ({!nationality ? '0' : nationality.length}
                /25)
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputHeader}>Passport Number</Text>
              <TextInput
                style={styles.input}
                maxLength={10}
                textAlign="center"
                placeholder="passport number"
                value={ppNumber}
                onChangeText={setPpNumber}
                autoCorrect={false}
              />
            </View>
          </>
        )}
        <View style={styles.nextBackButtonsBed}>
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => {
              setIdInputShow(false)
              setGenderInputShow(true)
            }}
          >
            <Ionicons
              name="arrow-back-circle-sharp"
              style={styles.addButtonIcon}
            />
            <Text style={styles.addButtonText}>back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => {
              setIdInputShow(false)
              setLicenseInputShow(true)
            }}
          >
            <Text style={styles.addButtonText}>next</Text>
            <Ionicons
              name="arrow-forward-circle-sharp"
              style={styles.nextButtonIcon}
            />
          </TouchableOpacity>
        </View>
      </>
    )
  }

  const renderDriversLicenseFields = () => {
    if (!licenseInputShow) return null
    return (
      <>
        <>
          <View style={styles.switchFieldBed}>
            <Text style={styles.switchFieldText}>drivers license?</Text>
            <Switch
              trackColor={{ false: '#ffff', true: '#81b0ff' }}
              thumbColor={driversLicense ? '#f5dd4b' : '#f4f3f4'}
              onValueChange={toggleDiversLicense}
              value={driversLicense}
            />
            <Text style={styles.switchFieldText}>
              {driversLicense ? 'yes' : 'no'}
            </Text>
          </View>
          {driversLicense === true ? null : (
            <View style={styles.nextBackButtonsBed}>
              <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={() => {
                  setLicenseInputShow(false)
                  setIdInputShow(true)
                }}
              >
                <Ionicons
                  name="arrow-back-circle-sharp"
                  style={styles.addButtonIcon}
                />
                <Text style={styles.addButtonText}>back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={() => {
                  setLicenseInputShow(false)
                  setSaveButtonShow(true)
                }}
              >
                <Text style={styles.addButtonText}>next</Text>
                <Ionicons
                  name="arrow-forward-circle-sharp"
                  style={styles.nextButtonIcon}
                />
              </TouchableOpacity>
            </View>
          )}
        </>
        {driversLicense ? (
          <>
            <Text style={styles.licenseCodeIntruction}>
              select license code
            </Text>
            <View style={styles.licenseCodecheckContainer}>
              <CheckBox
                onPress={() => {
                  setLicenseCode('A')
                  setA(true)
                  setA1(false)
                  setB(false)
                  setC1(false)
                  setC(false)
                  setEB(false)
                  setEC1(false)
                  setEC(false)
                }}
                center
                title="A"
                iconRight
                checked={A}
                textStyle={styles.licenseCodeCheckText}
                containerStyle={styles.licenseCodecheck}
              />
              <CheckBox
                onPress={() => {
                  setLicenseCode('A1')
                  setA(false)
                  setA1(true)
                  setB(false)
                  setC1(false)
                  setC(false)
                  setEB(false)
                  setEC1(false)
                  setEC(false)
                }}
                center
                title="A1"
                iconRight
                checked={A1}
                textStyle={styles.licenseCodeCheckText}
                containerStyle={styles.licenseCodecheck}
              />
              <CheckBox
                onPress={() => {
                  setLicenseCode('B')
                  setA(false)
                  setA1(false)
                  setB(true)
                  setC1(false)
                  setC(false)
                  setEB(false)
                  setEC1(false)
                  setEC(false)
                }}
                center
                title="B"
                iconRight
                checked={B}
                textStyle={styles.licenseCodeCheckText}
                containerStyle={styles.licenseCodecheck}
              />
            </View>
            <View style={styles.licenseCodecheckContainer}>
              <CheckBox
                onPress={() => {
                  setLicenseCode('C1')
                  setA(false)
                  setA1(false)
                  setB(false)
                  setC1(true)
                  setC(false)
                  setEB(false)
                  setEC1(false)
                  setEC(false)
                }}
                center
                title="C1"
                iconRight
                checked={C1}
                textStyle={styles.licenseCodeCheckText}
                containerStyle={styles.licenseCodecheck}
              />
              <CheckBox
                onPress={() => {
                  setLicenseCode('C')
                  setA(false)
                  setA1(false)
                  setB(false)
                  setC1(false)
                  setC(true)
                  setEB(false)
                  setEC1(false)
                  setEC(false)
                }}
                center
                title="C"
                iconRight
                checked={C}
                textStyle={styles.licenseCodeCheckText}
                containerStyle={styles.licenseCodecheck}
              />
              <CheckBox
                onPress={() => {
                  setLicenseCode('EB')
                  setA(false)
                  setA1(false)
                  setB(false)
                  setC1(false)
                  setC(false)
                  setEB(true)
                  setEC1(false)
                  setEC(false)
                }}
                center
                title="EB"
                iconRight
                checked={EB}
                textStyle={styles.licenseCodeCheckText}
                containerStyle={styles.licenseCodecheck}
              />
            </View>
            <View style={styles.licenseCodecheckContainer}>
              <CheckBox
                onPress={() => {
                  setLicenseCode('EC1')
                  setA(false)
                  setA1(false)
                  setB(false)
                  setC1(false)
                  setC(false)
                  setEB(false)
                  setEC1(true)
                  setEC(false)
                }}
                center
                title="EC1"
                iconRight
                checked={EC1}
                textStyle={styles.licenseCodeCheckText}
                containerStyle={styles.licenseCodecheck}
              />
              <CheckBox
                onPress={() => {
                  setLicenseCode('EC')
                  setA(false)
                  setA1(false)
                  setB(false)
                  setC1(false)
                  setC(false)
                  setEB(false)
                  setEC1(false)
                  setEC(true)
                }}
                center
                title="EC"
                iconRight
                checked={EC}
                textStyle={styles.licenseCodeCheckText}
                containerStyle={styles.licenseCodecheck}
              />
            </View>
            <View style={styles.nextBackButtonsBed}>
              <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={() => {
                  setLicenseInputShow(false)
                  setIdInputShow(true)
                }}
              >
                <Ionicons
                  name="arrow-back-circle-sharp"
                  style={styles.addButtonIcon}
                />
                <Text style={styles.addButtonText}>back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={() => {
                  setLicenseInputShow(false)
                  setSaveButtonShow(true)
                }}
              >
                <Text style={styles.addButtonText}>next</Text>
                <Ionicons
                  name="arrow-forward-circle-sharp"
                  style={styles.nextButtonIcon}
                />
              </TouchableOpacity>
            </View>
          </>
        ) : null}
      </>
    )
  }

  const saveButton = () => {
    let thisDate = new Date()
    if (!saveButtonShow) return null
    const formValuesToSubmit = {
      fullName,
      dateOfBirth:
        dateOfBirth.getFullYear() === thisDate.getFullYear()
          ? null
          : dateOfBirth,
      gender,
      saCitizen,
      nationality,
      idNumber,
      ppNumber,
      driversLicense,
      licenseCode,
    }
    return (
      <View style={styles.nextBackButtonsBed}>
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => {
            setSaveButtonShow(false)
            setLicenseInputShow(true)
          }}
        >
          <Ionicons
            name="arrow-back-circle-sharp"
            style={styles.addButtonIcon}
          />
          <Text style={styles.addButtonText}>edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => {
            toggleHideNavLinks(true)
            formType === 'edit'
              ? editPersonalInfo(id, formValuesToSubmit, () => {
                  toggleHideNavLinks(false)
                  navigation.navigate('PersonalInfo')
                })
              : createPersonalInfo(formValuesToSubmit, () => {
                  toggleHideNavLinks(false)
                  navigation.navigate('PersonalInfo')
                })
            buildCV()
            setFullName(null)
            setDateOfBirth(new Date(1598051730000))
          }}
        >
          <MaterialIcons style={styles.addButtonIcon} name="add-circle" />
          <Text style={styles.addButtonText}>save</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderPreview = () => {
    let thisDate = new Date()
    if (!saveButtonShow) return null
    return (
      <View style={styles.previewBed}>
        {!fullName ? null : (
          <View>
            <Text style={styles.previewLabel}>Full Name</Text>
            <Text style={styles.previewText}>{fullName}</Text>
          </View>
        )}
        {dateOfBirth.getFullYear() === thisDate.getFullYear() ? null : (
          <View>
            <Text style={styles.previewLabel}>Date of Birth</Text>
            <Text style={styles.previewText}>
              {moment(dateOfBirth).format('D MMMM YYYY')}
            </Text>
          </View>
        )}
        {!gender ? null : (
          <View>
            <Text style={styles.previewLabel}>Gender</Text>
            <Text style={styles.previewText}>{gender}</Text>
          </View>
        )}
        {!saCitizen ? null : (
          <View>
            <Text style={styles.previewLabel}>Nationality</Text>
            <Text style={styles.previewText}>South African</Text>
          </View>
        )}
        {saCitizen || !nationality ? null : (
          <View>
            <Text style={styles.previewLabel}>Nationality</Text>
            <Text style={styles.previewText}>{nationality}</Text>
          </View>
        )}
        {saCitizen || !ppNumber ? null : (
          <View>
            <Text style={styles.previewLabel}>Passport number</Text>
            <Text style={styles.previewText}>{ppNumber}</Text>
          </View>
        )}
        {!idNumber ? null : (
          <View>
            <Text style={styles.previewLabel}>ID Number</Text>
            <Text style={styles.previewText}>ID {idNumber}</Text>
          </View>
        )}
        {!licenseCode || !driversLicense ? null : (
          <View>
            <Text style={styles.previewLabel}>Driver license</Text>
            <Text style={styles.previewText}>Code: {licenseCode}</Text>
          </View>
        )}
      </View>
    )
  }

  const renderForm = () => {
    return (
      <>
        {renderNameField()}
        {renderDatePicker()}
        {renderGenderPicker()}
        {renderSaCitizenFields()}
        {renderDriversLicenseFields()}
        {saveButton()}
        {datePickerOpen || saveButtonShow || optionPickerShow ? null : (
          <FormHintModal bit="personalInfo" />
        )}
      </>
    )
  }

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return (
      <>
        <NavigationEvents
          onWillBlur={() => {
            clearErrors(null)
            setOptionsModalSelectedOption(null)
            setOptionPickerShow(false)
          }}
          onWillFocus={() => {
            setOptionsModalSelectedOption(null)
            setOptionPickerShow(false)
            clearErrors(null)
          }}
        />
        <View style={styles.bed}>
          {errorHeading()}
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'center',
              flexGrow: 1,
            }}
            keyboardShouldPersistTaps="always"
          >
            {renderPreview()}
            {renderForm()}
            {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
          </ScrollView>
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
  inputHeader: {
    color: '#ffff',
    width: '85%',
    alignSelf: 'center',
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    height: 50,
    width: '85%',
    borderRadius: 7,
    margin: 5,
  },
  maxCharactersNote: {
    color: '#ffff',
    width: '85%',
    alignSelf: 'center',
    marginBottom: 10,
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
  dateOfBirthButtonContainer: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    height: 50,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    margin: 5,
  },
  dateOfBirthButtonText: {
    color: '#B6B8BA',
  },
  dateOfBirthText: {
    color: '#030303',
  },
  datePickerBedIos: {
    backgroundColor: '#ffff',
    borderRadius: 5,
    padding: 15,
  },
  datePickerBedAndroid: {
    display: 'none',
  },
  pickerBackButtonIos: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  pickerBackButtonAndroid: {
    display: 'none',
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
  genderButtonContainer: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    height: 50,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    margin: 5,
  },
  genderButtonText: {
    color: '#B6B8BA',
  },
  genderText: {
    color: '#030303',
  },
  genderPickerBed: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    width: '60%',
    paddingBottom: 15,
    alignSelf: 'center',
  },
  switchFieldBed: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  switchFieldText: {
    color: '#ffff',
    paddingHorizontal: 10,
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
  error: {
    color: '#ff0033',
    alignSelf: 'center',
    paddingBottom: 10,
  },
  licenseCodeIntruction: {
    color: '#ffff',
    alignSelf: 'center',
    paddingTop: 7,
    paddingBottom: 5,
  },
  licenseCodecheckContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  licenseCodecheck: {
    backgroundColor: '#232936',
    width: '20%',
  },
  licenseCodeCheckText: {
    color: '#ffff',
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
    marginBottom: 20,
    height: 40,
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
  addButtonIcon: {
    color: '#ffff',
    fontSize: 18,
    paddingRight: 5,
  },
  addButtonText: {
    color: '#ffff',
    fontSize: 18,
    marginBottom: 3,
  },
  nextButtonIcon: {
    color: '#ffff',
    fontSize: 18,
    paddingLeft: 5,
  },
  nextBackButtonsBed: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
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
  previewText: {
    marginBottom: 5,
  },
})

export default withNavigation(PersonalInfoCreateEditForm)
