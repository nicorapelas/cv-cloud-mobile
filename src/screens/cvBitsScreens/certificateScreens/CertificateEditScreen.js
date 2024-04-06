import React, { useContext, useState } from 'react'
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image
} from 'react-native'
import { Text } from 'react-native-elements'
import { TextInput, ScrollView } from 'react-native-gesture-handler'
import { useKeyboard } from '@react-native-community/hooks'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import { Context as CertificateContext } from '../../../context/CertificateContext'
import { Context as UniversalContext } from '../../../context/UniversalContext'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const CertificateEditScreen = ({ navigation }) => {
  const [id] = useState(navigation.getParam('id'))
  const [title, setTitle] = useState(navigation.getParam('title'))
  const [photoUrl] = useState(navigation.getParam('photoUrl'))

  const {
    state: { loading },
    editCertificate
  } = useContext(CertificateContext)

  const { buildCV } = useContext(UniversalContext)

  const keyboard = useKeyboard()

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return (
      <View style={styles.bed}>
        <View>
          <ScrollView keyboardShouldPersistTaps="always">
            {!photoUrl ? (
              <AntDesign name="pdffile1" style={styles.fileSelectedIcon} />
            ) : (
              <Image
                style={styles.photo}
                source={{
                  uri: `${photoUrl}`
                }}
              />
            )}

            <TextInput
              style={styles.input}
              textAlign="center"
              placeholder="title"
              value={title}
              onChangeText={setTitle}
              onFocus={() => {
                setTitle('')
              }}
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.addButtonContainer}
              onPress={() => {
                editCertificate(id, { title: title }, () => {
                  navigation.navigate('Certificate')
                })
                buildCV()
                setTitle('')
              }}
            >
              <MaterialIcons style={styles.addButtonIcon} name="add-circle" />
              <Text style={styles.addButtonText}>save</Text>
            </TouchableOpacity>
            <KeyboardSpacer />
          </ScrollView>
        </View>
      </View>
    )
  }

  return renderContent()
}

CertificateEditScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>edit certificate</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="Certificate" />
  }
}

const styles = StyleSheet.create({
  heading: {
    color: '#ffff',
    fontSize: 22
  },
  bed: {
    backgroundColor: '#232936',
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  fileSelectedIcon: {
    color: '#ffff',
    fontSize: 60,
    alignSelf: 'center',
    paddingBottom: 10
  },
  photo: {
    height: 90,
    width: 90,
    alignSelf: 'center',
    marginBottom: 7
  },
  input: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    height: 50,
    width: '85%',
    textAlign: 'center',
    borderRadius: 7,
    margin: 5
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
    height: 40
  },
  addButtonIcon: {
    color: '#ffff',
    fontSize: 18,
    paddingRight: 5
  },
  addButtonText: {
    color: '#ffff',
    fontSize: 18
  }
})

export default CertificateEditScreen
