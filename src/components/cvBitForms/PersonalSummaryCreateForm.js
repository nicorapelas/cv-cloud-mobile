import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { withNavigation, NavigationEvents } from 'react-navigation'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { useKeyboard } from '@react-native-community/hooks'
import { MaterialIcons } from '@expo/vector-icons'
import LoaderFullScreen from '../loadingModals/LoaderFullScreen'
import FormHintModal from '../hints/FormHintModal'
import { Context as PersonalSummaryContext } from '../../context/PersonalSummaryContext'
import { Context as UniversalContext } from '../../context/UniversalContext'

const PersonalSummaryCreateForm = ({ navigation, bit }) => {
  const [personalSummaryNew, setPersonalSummaryNew] = useState(null)

  const {
    state: { loading, error },
    createPersonalSummary,
    clearPersonalSummaryErrors,
  } = useContext(PersonalSummaryContext)

  const { tipSelectReset, buildCV, toggleHideNavLinks } =
    useContext(UniversalContext)

  useEffect(() => {
    if (error) toggleHideNavLinks(false)
  }, [error])

  const keyboard = useKeyboard()

  const errorHeading = () => {
    if (!error) return null
    return (
      <View style={styles.errorHeadingBed}>
        <Text style={styles.errorHeadingText}>please attend to errors</Text>
      </View>
    )
  }

  const renderForm = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return (
      <View style={styles.formBed}>
        <Text style={styles.inputHeader}>Personal summary</Text>
        <TextInput
          style={styles.inputTextArea}
          maxLength={330}
          multiline={true}
          numberOfLines={100}
          placeholder="personal summary"
          value={personalSummaryNew}
          onChangeText={setPersonalSummaryNew}
          onFocus={clearPersonalSummaryErrors}
          autoCorrect={true}
          autoCapitalize="sentences"
          autoFocus={!error ? true : false}
        />
        {!error ? (
          <Text style={styles.maxCharactersNote}>
            max 330 characters (
            {!personalSummaryNew ? '0' : personalSummaryNew.length}
            /330)
          </Text>
        ) : (
          <Text style={styles.error}>{error}</Text>
        )}
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => {
            toggleHideNavLinks(true)
            createPersonalSummary({ content: personalSummaryNew }, () => {
              toggleHideNavLinks(false)
              navigation.navigate('PersonalSummary')
            })
            buildCV()
            setPersonalSummaryNew(null)
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

  const androidHintModalVisible = () => {
    if (Platform.OS === 'ios') return null
    if (keyboard.keyboardShown) return null
    return <FormHintModal bit={bit} />
  }

  return (
    <>
      <NavigationEvents
        onWillBlur={() => {
          tipSelectReset()
          clearPersonalSummaryErrors()
        }}
        onWillFocus={() => {
          tipSelectReset()
          clearPersonalSummaryErrors()
        }}
      />
      <View style={styles.bed}>
        {errorHeading()}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="always"
        >
          {renderForm()}
          {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
          {Platform.OS === 'ios' ? (
            <FormHintModal bit={bit} />
          ) : (
            androidHintModalVisible()
          )}
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
    marginVertical: 10,
  },
  inputHeader: {
    color: '#ffff',
    width: '85%',
    alignSelf: 'center',
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
  maxCharactersNote: {
    color: '#ffff',
    width: '85%',
    alignSelf: 'center',
    marginBottom: 15,
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
    paddingTop: 5,
    paddingBottom: 20,
  },
})

export default withNavigation(PersonalSummaryCreateForm)
