import React, { useContext, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { withNavigation, NavigationEvents } from 'react-navigation'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { MaterialIcons } from '@expo/vector-icons'
import LoaderFullScreen from '../../components/loadingModals/LoaderFullScreen'
import { Context as UniversalContext } from '../../context/UniversalContext'

const StartUpForm = ({ navigation }) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const {
    state: { startUpFormLoading, error },
    createStartUpInfo,
    clearErrors,
    buildCV,
    toggleHideNavLinks,
  } = useContext(UniversalContext)

  const errorHeading = () => {
    if (error === null) return null
    return (
      <View style={styles.errorHeadingBed}>
        <Text style={styles.errorHeadingText}>please attend to errors</Text>
      </View>
    )
  }

  const renderForm = () => {
    const formValues = {
      fullName,
      email,
      phone,
    }
    return (
      <>
        {!error || error === null ? (
          <View style={styles.headerMessagebed}>
            <Text style={styles.headerMessageText}>
              We don't have enough data to start building your CV.
            </Text>
            <Text style={styles.headerMessageText}>
              Let's start with some contact infomation.
            </Text>
          </View>
        ) : null}
        <>
          <Text style={styles.inputHeading}>Full name</Text>
          <TextInput
            style={styles.input}
            textAlign="center"
            placeholder="full name"
            value={fullName}
            onChangeText={setFullName}
            onFocus={clearErrors}
            autoCorrect={false}
            autoCapitalize="words"
            autoFocus={!error ? true : false}
          />
        </>
        {error === null ? null : (
          <>
            {error.fullName ? (
              <Text style={styles.error}>{error.fullName}</Text>
            ) : null}
          </>
        )}
        <>
          <Text style={styles.inputHeading}>Email address</Text>
          <TextInput
            style={styles.input}
            textAlign="center"
            placeholder="email"
            value={email}
            onFocus={clearErrors}
            onChangeText={setEmail}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            autoFocus={!error ? true : false}
          />
        </>
        {error === null ? null : (
          <>
            {error.email ? (
              <Text style={styles.error}>{error.email}</Text>
            ) : null}
          </>
        )}
        <>
          <Text style={styles.inputHeading}>Phone number</Text>
          <TextInput
            style={styles.input}
            textAlign="center"
            placeholder="phone number"
            value={phone}
            onFocus={clearErrors}
            onChangeText={setPhone}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="phone-pad"
            autoFocus={!error ? true : false}
          />
        </>
        {error === null ? null : (
          <>
            {error.phone ? (
              <Text style={styles.error}>{error.phone}</Text>
            ) : null}
          </>
        )}
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => {
            toggleHideNavLinks(true)
            createStartUpInfo(formValues, () => {
              buildCV()
              toggleHideNavLinks(false)
              navigation.navigate('ViewCV')
            })
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

  const renderContent = () => {
    if (startUpFormLoading) return <LoaderFullScreen />
    return (
      <>
        <NavigationEvents onWillBlur={clearErrors} onWillFocus={clearErrors} />
        <View View style={styles.bed}>
          {errorHeading()}
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            keyboardShouldPersistTaps="always"
          >
            {renderForm()}
          </ScrollView>
          {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
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
  headerMessagebed: {
    paddingBottom: 20,
  },
  headerMessageText: {
    color: '#ffff',
    paddingHorizontal: 40,
    paddingTop: 5,
    textAlign: 'center',
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

export default withNavigation(StartUpForm)
