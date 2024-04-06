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
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import FormHintModal from '../hints/FormHintModal'
import LoaderFullScreen from '../../components/loadingModals/LoaderFullScreen'
import { Context as ExperienceContext } from '../../context/ExperienceContext'
import { Context as UniversalContext } from '../../context/UniversalContext'

const ExperienceCreateEditForm = ({
  formType,
  navigation,
  id,
  incomingTitle,
  incomingDescription,
}) => {
  const [title, setTitle] = useState(incomingTitle ? incomingTitle : '')
  const [description, setDescription] = useState(
    incomingDescription ? incomingDescription : ''
  )

  const [titleInputShow, setTitleInputShow] = useState(true)
  const [descriptionInputShow, setDescriptionInputShow] = useState(false)
  const [saveButtonShow, setSaveButtonShow] = useState(false)

  const { buildCV, toggleHideNavLinks } = useContext(UniversalContext)

  const {
    state: { loading, error },
    createExperience,
    editExperience,
    addError,
    clearExperienceErrors,
  } = useContext(ExperienceContext)

  useEffect(() => {
    if (error) toggleHideNavLinks(false)
  }, [error])

  useEffect(() => {
    if (error) {
      if (error.title) setTitleInputShow(true)
    }
  }, [error])

  const keyboard = useKeyboard()

  const errorHeading = () => {
    if (error === null) return null
    return (
      <View style={styles.errorHeadingBed}>
        <Text style={styles.errorHeadingText}>please attend to errors</Text>
      </View>
    )
  }

  const titleInputNext = () => {
    if (!title || title.length < 1 || !title.replace(/\s/g, '').length) {
      addError({ title: `'Title' is required` })
      Keyboard.dismiss()
      return
    } else {
      setTitleInputShow(false)
      setDescriptionInputShow(true)
      return
    }
  }

  const titleInput = () => {
    if (!titleInputShow) return null
    return (
      <View>
        <Text style={styles.inputHeader}>Job title</Text>
        <TextInput
          style={styles.input}
          maxLength={25}
          textAlign="center"
          placeholder="job title"
          value={title}
          onFocus={clearExperienceErrors}
          onChangeText={setTitle}
          autoCorrect={true}
          autoCapitalize="words"
          autoFocus={!error ? true : false}
        />
        {!error || error === null ? (
          <Text style={styles.maxCharactersNote}>
            max 25 characters ({!title ? '0' : title.length}
            /25)
          </Text>
        ) : (
          <>
            {error.title ? (
              <Text style={styles.error}>{error.title}</Text>
            ) : null}
          </>
        )}
        <View style={styles.nextBackButtonsBed}>
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => titleInputNext()}
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

  const descriptionInput = () => {
    if (!descriptionInputShow) return null
    return (
      <View>
        <Text style={styles.inputHeader}>Job description</Text>
        <TextInput
          style={styles.inputTextArea}
          maxLength={230}
          multiline={true}
          numberOfLines={50}
          placeholder="job description"
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
              setTitleInputShow(true)
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

  const saveButton = () => {
    if (!saveButtonShow) return null
    const formValues = {
      title,
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
              ? editExperience(id, formValues, () => {
                  navigation.navigate('Experience')
                  toggleHideNavLinks(false)
                })
              : createExperience(formValues, () => {
                  navigation.navigate('Experience')
                  toggleHideNavLinks(false)
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
        {!title ? null : (
          <View>
            <Text style={styles.previewLabel}>Job title</Text>
            <Text style={styles.previewText}>{title}</Text>
          </View>
        )}
        {!description ? null : (
          <View>
            <Text style={styles.previewLabel}>Job description</Text>
            <Text style={styles.previewText}>{description}</Text>
          </View>
        )}
      </View>
    )
  }

  const renderForm = () => {
    return (
      <>
        {titleInput()}
        {descriptionInput()}
        {saveButton()}
        {saveButtonShow ? null : <FormHintModal bit="experience" />}
      </>
    )
  }

  const renderContent = () => {
    if (loading) return <LoaderFullScreen />
    return (
      <>
        <NavigationEvents
          onWillBlur={clearExperienceErrors}
          onWillFocus={clearExperienceErrors}
        />
        <View View style={styles.bed}>
          {errorHeading()}
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
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
  formBed: {
    flexDirection: 'column',
    paddingTop: 30,
    paddingBottom: 10,
  },
  inputHeader: {
    color: '#ffff',
    width: '85%',
    alignSelf: 'center',
    marginTop: 5,
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
  inputTextArea: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    textAlignVertical: 'top',
    width: '85%',
    height: 200,
    borderRadius: 7,
    padding: 5,
    margin: 5,
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
  nextButtonIcon: {
    color: '#ffff',
    fontSize: 18,
    paddingLeft: 5,
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
  previewText: {
    marginBottom: 5,
  },
})

export default withNavigation(ExperienceCreateEditForm)
