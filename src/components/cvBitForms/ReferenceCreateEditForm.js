import React, { useContext, useState } from 'react'
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
import LoaderFullScreen from '../../components/loadingModals/LoaderFullScreen'
import { Context as ReferenceContext } from '../../context/ReferenceContext'
import { Context as UniversalContext } from '../../context/UniversalContext'
import validatePhoneInput from '../../validation/phone'
import validateEmailInput from '../../validation/email'
import FormHintModal from '../../components/hints/FormHintModal'

const ReferenceCreateEditForm = ({
  formType,
  navigation,
  id,
  incomingName,
  incomingCompany,
  incomingEmail,
  incomingPhone,
}) => {
  const [email, setEmail] = useState(incomingEmail ? incomingEmail : null)
  const [phone, setPhone] = useState(incomingPhone ? incomingPhone : null)
  const [name, setName] = useState(incomingName ? incomingName : null)
  const [company, setCompany] = useState(
    incomingCompany ? incomingCompany : null
  )

  const [nameInputShow, setNameInputShow] = useState(true)
  const [companyInputShow, setCompanyInputShow] = useState(false)
  const [emailInputShow, setEmailInputShow] = useState(false)
  const [phoneInputShow, setPhoneInputShow] = useState(false)
  const [saveButtonShow, setSaveButtonShow] = useState(false)

  const { buildCV, toggleHideNavLinks } = useContext(UniversalContext)

  const {
    state: { loading, error },
    createReference,
    editReference,
    addError,
    clearReferenceErrors,
  } = useContext(ReferenceContext)

  const errorHeading = () => {
    if (error === null) return null
    return (
      <View style={styles.errorHeadingBed}>
        <Text style={styles.errorHeadingText}>please attend to errors</Text>
      </View>
    )
  }

  const nameInputNext = () => {
    if (!name || !name.replace(/\s/g, '').length) {
      addError({ name: `'Contact person' is required` })
      Keyboard.dismiss()
    } else {
      setNameInputShow(false)
      setCompanyInputShow(true)
    }
  }

  const nameInput = () => {
    if (!nameInputShow) return null
    return (
      <View>
        <Text style={styles.inputHeader}>Contact person</Text>
        <TextInput
          style={styles.input}
          maxLength={30}
          textAlign="center"
          placeholder="contact person"
          onFocus={clearReferenceErrors}
          value={name}
          onChangeText={setName}
          autoCorrect={false}
          autoCapitalize="words"
          autoFocus={!error ? true : false}
        />
        {error === null ? (
          <Text style={styles.maxCharactersNote}>
            max 30 characters ({!name ? '0' : name.length}
            /30)
          </Text>
        ) : (
          <>
            {error.name ? <Text style={styles.error}>{error.name}</Text> : null}
          </>
        )}
        <View style={styles.nextBackButtonsBed}>
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => nameInputNext()}
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

  const companyInputNext = () => {
    if (!company || !company.replace(/\s/g, '').length) {
      addError({ company: `'Company name' is required` })
      Keyboard.dismiss()
    } else {
      setCompanyInputShow(false)
      setPhoneInputShow(true)
    }
  }

  const companyInput = () => {
    if (!companyInputShow) return null
    return (
      <View>
        <Text style={styles.inputHeader}>Company name</Text>
        <TextInput
          style={styles.input}
          maxLength={30}
          textAlign="center"
          placeholder="company"
          onFocus={clearReferenceErrors}
          value={company}
          onChangeText={setCompany}
          autoCorrect={false}
          autoCapitalize="words"
          autoFocus={!error ? true : false}
        />
        {error === null ? (
          <Text style={styles.maxCharactersNote}>
            max 30 characters ({!company ? '0' : company.length}
            /30)
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
            onPress={() => {
              setCompanyInputShow(false)
              setNameInputShow(true)
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
            onPress={() => companyInputNext()}
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

  const phoneInputNext = () => {
    const { errors, isValid } = validatePhoneInput(phone)
    if (!isValid) {
      addError({ phone: errors.phone })
      Keyboard.dismiss()
    } else {
      setPhoneInputShow(false)
      setEmailInputShow(true)
    }
  }

  const phoneInput = () => {
    if (!phoneInputShow) return null
    return (
      <View>
        <Text style={styles.inputHeader}>Phone number</Text>
        <TextInput
          style={styles.input}
          maxLength={12}
          textAlign="center"
          placeholder="phone number"
          value={phone}
          onFocus={clearReferenceErrors}
          onChangeText={setPhone}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="phone-pad"
          autoFocus={!error ? true : false}
        />
        {error === null ? null : (
          <>
            {error.phone ? (
              <Text style={styles.error}>{error.phone}</Text>
            ) : null}
          </>
        )}
        <View style={styles.nextBackButtonsBed}>
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => {
              setPhoneInputShow(false)
              setCompanyInputShow(true)
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
            onPress={() => phoneInputNext()}
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

  const emailInputNext = () => {
    if (email.length < 1) {
      setEmailInputShow(false)
      setSaveButtonShow(true)
      return
    }
    const { errors, isValid } = validateEmailInput(email)
    if (!isValid) {
      addError({ email: errors.email })
      Keyboard.dismiss()
    } else {
      setEmailInputShow(false)
      setSaveButtonShow(true)
    }
  }

  const emailInput = () => {
    if (!emailInputShow) return null
    return (
      <View>
        <Text style={styles.inputHeader}>Email address</Text>
        <TextInput
          style={styles.input}
          maxLength={32}
          textAlign="center"
          placeholder="email"
          value={email}
          onFocus={clearReferenceErrors}
          onChangeText={setEmail}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          autoFocus={!error ? true : false}
        />
        {error === null ? (
          <Text style={styles.maxCharactersNote}>
            max 32 characters ({!email ? '0' : email.length}
            /32)
          </Text>
        ) : (
          <>
            {error.email ? (
              <Text style={styles.error}>{error.email}</Text>
            ) : null}
          </>
        )}
        <View style={styles.nextBackButtonsBed}>
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => {
              setEmailInputShow(false)
              setPhoneInputShow(true)
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
            onPress={() => emailInputNext()}
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

  const saveButton = () => {
    if (!saveButtonShow) return null
    const formValues = {
      email,
      phone,
      name,
      company,
    }
    return (
      <View style={styles.nextBackButtonsBed}>
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => {
            setSaveButtonShow(false)
            setEmailInputShow(true)
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
              ? editReference(id, formValues, () => {
                  toggleHideNavLinks(false)
                  navigation.navigate('Reference')
                })
              : createReference(formValues, () => {
                  toggleHideNavLinks(false)
                  navigation.navigate('Reference')
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

  const renderPreview = () => {
    if (!saveButtonShow) return null
    return (
      <View style={styles.previewBed}>
        {!name ? null : (
          <View>
            <Text style={styles.previewLabel}>Contact person</Text>
            <Text style={styles.previewText}>{name}</Text>
          </View>
        )}
        {!company || company.length < 1 ? null : (
          <View>
            <Text style={styles.previewAdditionlInfoLabel}>Company Name</Text>
            <Text style={styles.previewText}>{company}</Text>
          </View>
        )}
        {!phone || phone.length < 1 ? null : (
          <View>
            <Text style={styles.previewAdditionlInfoLabel}>Phone number</Text>
            <Text style={styles.previewText}>{phone}</Text>
          </View>
        )}
        {!email || email.length < 1 ? null : (
          <View>
            <Text style={styles.previewAdditionlInfoLabel}>Email address</Text>
            <Text style={styles.previewText}>{email}</Text>
          </View>
        )}
      </View>
    )
  }

  const renderForm = () => {
    return (
      <>
        {nameInput()}
        {companyInput()}
        {phoneInput()}
        {emailInput()}
        {saveButton()}
      </>
    )
  }

  const renderContent = () => {
    if (loading) return <LoaderFullScreen />
    return (
      <>
        <NavigationEvents
          onWillBlur={clearReferenceErrors}
          onWillFocus={clearReferenceErrors}
        />
        <View View style={styles.bed}>
          {errorHeading()}
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            keyboardShouldPersistTaps="always"
          >
            {renderPreview()}
            {renderForm()}
            {saveButtonShow ? null : <FormHintModal bit="reference" />}
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
  formBed: {
    flexDirection: 'column',
    paddingTop: 30,
    paddingBottom: 10,
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
  maxCharactersNote: {
    color: '#ffff',
    width: '85%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  inputHeader: {
    color: '#ffff',
    width: '85%',
    alignSelf: 'center',
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
    marginBottom: 30,
  },
  previewBed: {
    backgroundColor: '#ffff',
    alignSelf: 'center',
    width: '90%',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
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

export default withNavigation(ReferenceCreateEditForm)
