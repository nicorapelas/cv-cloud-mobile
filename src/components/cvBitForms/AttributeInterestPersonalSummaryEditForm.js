import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { withNavigation, NavigationEvents } from 'react-navigation'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { MaterialIcons } from '@expo/vector-icons'
import LoaderFullScreen from '../loadingModals/LoaderFullScreen'
import FormHintModal from '../hints/FormHintModal'
import { Context as AttributeContext } from '../../context/AttributeContext'
import { Context as InterestContext } from '../../context/InterestContext'
import { Context as PersonalSummaryContext } from '../../context/PersonalSummaryContext'
import { Context as UniversalContext } from '../../context/UniversalContext'

const AttributeInterestPersonalSummaryEditForm = ({
  navigation,
  id,
  bit,
  incomingValue,
}) => {
  const [incomingBit, setIncomingBit] = useState('')
  const [attribute, setAttribute] = useState('')
  const [interest, setInterest] = useState('')
  const [personalSummary, setPersonalSummary] = useState('')

  const {
    state: { loading: attributeLoading },
    editAttribute,
  } = useContext(AttributeContext)

  const {
    state: { loading: interestLoading },
    editInterest,
  } = useContext(InterestContext)

  const {
    state: { loading: PersonalSummaryLoading },
    editPersonalSummary,
  } = useContext(PersonalSummaryContext)

  const {
    state: { tipSelected },
    tipSelectReset,
    buildCV,
    toggleHideNavLinks,
  } = useContext(UniversalContext)

  useEffect(() => {
    setIncomingBit(bit)
    setAttribute(incomingValue)
    setInterest(incomingValue)
    setPersonalSummary(incomingValue)
  }, [])

  const selectFormFields = () => {
    if (incomingBit === 'attribute') {
      return (
        <>
          <Text style={styles.inputHeading}>Attribute</Text>
          <TextInput
            style={styles.input}
            maxLength={25}
            textAlign="center"
            placeholder="attribute"
            value={tipSelected ? tipSelected : attribute}
            onChangeText={setAttribute}
            onFocus={() => {
              tipSelectReset()
            }}
            autoFocus={true}
            autoCorrect={true}
          />
          <Text style={styles.maxCharactersNote}>
            max 25 characters ({!attribute ? '0' : attribute.length}
            /25)
          </Text>
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => {
              toggleHideNavLinks(true)
              editAttribute(
                id,
                tipSelected
                  ? { attribute: tipSelected }
                  : { attribute: attribute },
                () => {
                  toggleHideNavLinks(false)
                  tipSelectReset()
                  navigation.navigate('Attribute')
                }
              )
              buildCV()
              setAttribute('')
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
        </>
      )
    }
    if (incomingBit === 'interest') {
      return (
        <>
          <Text style={styles.inputHeading}>Interenst</Text>
          <TextInput
            style={styles.input}
            maxLength={25}
            textAlign="center"
            placeholder="interest"
            value={tipSelected ? tipSelected : interest}
            onChangeText={setInterest}
            onFocus={() => {
              tipSelectReset()
            }}
            autoFocus={true}
            autoCorrect={true}
          />
          <Text style={styles.maxCharactersNote}>
            max 25 characters ({!interest ? '0' : interest.length}
            /25)
          </Text>
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => {
              toggleHideNavLinks(true)
              editInterest(
                id,
                tipSelected
                  ? { interest: tipSelected }
                  : { interest: interest },
                () => {
                  toggleHideNavLinks(false)
                  tipSelectReset()
                  navigation.navigate('Interest')
                }
              )
              buildCV()
              setInterest('')
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
        </>
      )
    }
    if (incomingBit === 'personalSummary') {
      return (
        <>
          <Text style={styles.inputHeading}>Personal summary</Text>
          <TextInput
            style={styles.inputTextArea}
            maxLength={330}
            multiline={true}
            numberOfLines={10}
            placeholder="personal summary"
            value={personalSummary}
            onChangeText={setPersonalSummary}
            autoCorrect={true}
            autoFocus={true}
          />
          <Text style={styles.maxCharactersNote}>
            max 330 characters ({!interest ? '0' : interest.length}
            /330)
          </Text>
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => {
              toggleHideNavLinks(true)
              editPersonalSummary(id, { content: personalSummary }, () => {
                toggleHideNavLinks(false)
                tipSelectReset()
                navigation.navigate('PersonalSummary')
              })
              buildCV()
              setPersonalSummary('')
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
        </>
      )
    }
    return null
  }

  const renderForm = () => {
    if (
      attributeLoading ||
      attributeLoading === null ||
      interestLoading ||
      interestLoading === null ||
      PersonalSummaryLoading ||
      PersonalSummaryLoading === null
    )
      return <LoaderFullScreen />
    return (
      <View style={styles.formBed}>
        {selectFormFields()}
        <FormHintModal bit={bit} />
      </View>
    )
  }

  return (
    <>
      <NavigationEvents
        onWillBlur={tipSelectReset}
        onWillFocus={tipSelectReset}
      />
      <View View style={styles.bed}>
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
})

export default withNavigation(AttributeInterestPersonalSummaryEditForm)
