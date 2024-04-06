import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import { Text } from 'react-native-elements'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { withNavigation, NavigationEvents } from 'react-navigation'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { useKeyboard } from '@react-native-community/hooks'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import LoaderFullScreen from '../loadingModals/LoaderFullScreen'
import RadioProficiencyButton from '../../components/buttons/RadioProficienctButton'
import FormHintModal from '../hints/FormHintModal'
import { Context as SkillContext } from '../../context/SkillContext'
import { Context as UniversalContext } from '../../context/UniversalContext'
import { Platform } from 'react-native'

const SkillCreateEditForm = ({
  navigation,
  bit,
  formType,
  id,
  incomingSkill,
}) => {
  const [skill, setSkill] = useState(null)
  const [proficiencyInputShow, setProficiencyInputShow] = useState(false)

  const {
    state: { loading, error },
    createSkill,
    editSkill,
    addError,
    clearSkillErrors,
  } = useContext(SkillContext)
  const {
    state: { proficiency },
    buildCV,
    toggleHideNavLinks,
  } = useContext(UniversalContext)

  useEffect(() => {
    if (error) toggleHideNavLinks(false)
  }, [error])

  useEffect(() => {
    if (error) setProficiencyInputShow(false)
  }, [error])

  useEffect(() => {
    if (incomingSkill) setSkill(incomingSkill)
  }, [incomingSkill])

  const keyboard = useKeyboard()

  const errorHeading = () => {
    if (!error) return null
    return (
      <View style={styles.errorHeadingBed}>
        <Text style={styles.errorHeadingText}>please attend to errors</Text>
      </View>
    )
  }

  const skillInputNext = () => {
    if (!skill || skill.length < 1 || !skill.replace(/\s/g, '').length) {
      addError(`'Skill' is required`)
      Keyboard.dismiss()
    } else {
      setProficiencyInputShow(true)
    }
  }

  const renderProficiencyInput = () => {
    if (!proficiencyInputShow) return null
    return (
      <>
        <Text style={styles.heading}>How good are you at {skill}?</Text>
        <RadioProficiencyButton bit="skill" />
      </>
    )
  }

  const renderButtons = () => {
    return (
      <View style={styles.nextBackButtonsBed}>
        {!proficiencyInputShow ? null : (
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => {
              setProficiencyInputShow(false)
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
        )}
        {!proficiencyInputShow ? (
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => skillInputNext()}
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
        ) : (
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => {
              toggleHideNavLinks(true)
              {
                formType === 'create'
                  ? createSkill({ skill, proficiency }, () => {
                      toggleHideNavLinks(false)
                      navigation.navigate('Skill')
                    })
                  : editSkill(id, { skill, proficiency }, () => {
                      toggleHideNavLinks(false)
                      navigation.navigate('Skill')
                    })
              }
              buildCV()
              setSkill(null)
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
        )}
      </View>
    )
  }

  const renderForm = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return (
      <View style={styles.formBed}>
        <View style={styles.formBed} behavior="padding">
          {proficiencyInputShow ? null : (
            <>
              <Text style={styles.inputHeading}>Skill</Text>
              <TextInput
                style={styles.input}
                maxLength={25}
                textAlign="center"
                placeholder="skill"
                value={skill}
                onChangeText={setSkill}
                onFocus={() => clearSkillErrors()}
                autoCorrect={true}
                autoFocus={!error ? true : false}
              />
              {!error ? (
                <Text style={styles.maxCharactersNote}>
                  max 25 characters ({!skill ? '0' : skill.length}
                  /25)
                </Text>
              ) : (
                <Text style={styles.error}>{error}</Text>
              )}
            </>
          )}
          {renderProficiencyInput()}
          {renderButtons()}
        </View>
        <FormHintModal bit={bit} />
      </View>
    )
  }

  return (
    <>
      <NavigationEvents
        onWillBlur={() => clearSkillErrors()}
        onWillFocus={() => clearSkillErrors()}
      />
      <View style={styles.bed}>
        {errorHeading()}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="always"
        >
          {renderForm()}
          {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
        </ScrollView>
      </View>
    </>
  )
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
  inputHeading: {
    color: '#ffff',
    width: '85%',
    alignSelf: 'center',
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
  headingBed: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headingContainer: {
    backgroundColor: '#ffff',
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 15,
    borderRadius: 5,
  },
  point: {
    fontSize: 16,
    paddingTop: 10,
  },
  heading: {
    color: '#ffff',
    alignSelf: 'center',
    fontSize: 18,
    marginBottom: 5,
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
    height: 40,
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
  },
  nextButtonIcon: {
    color: '#ffff',
    fontSize: 18,
    paddingLeft: 5,
  },
})

export default withNavigation(SkillCreateEditForm)
