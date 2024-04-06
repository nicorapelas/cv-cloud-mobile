import React, { useContext, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { NavigationEvents, withNavigation } from 'react-navigation'
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import BitNoData from '../../../components/BitNoData'
import AddContentButtonLink from '../../../components/links/AddContentButtonLink'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'
import DoneButton from '../../../components/links/DoneButton'
import DeleteModal from '../../../components/cvBitDeleteModals/DeleteModal'
import { Context as LanguageContext } from '../../../context/LanguageContext'
import { Context as UniversalContext } from '../../../context/UniversalContext'
import ProficiencyOne from '../../../components/proficiencyDots/ProficiencyOne'
import ProficiencyTwo from '../../../components/proficiencyDots/ProficiencyTwo'
import ProficiencyThree from '../../../components/proficiencyDots/ProficiencyThree'
import ProficiencyFour from '../../../components/proficiencyDots/ProficiencyFour'
import ProficiencyFive from '../../../components/proficiencyDots/ProficiencyFive'

const LanguageScreen = ({ navigation }) => {
  const [documentId, setDocumentId] = useState('')
  const [documentSelected, setDocumentSelected] = useState('')

  const { showDeleteModal } = useContext(UniversalContext)
  const {
    state: { loading, languages },
    fetchLanguages
  } = useContext(LanguageContext)

  const renderProfiencyDots = val => {
    if (val === 1) return <ProficiencyOne zoom="zoomedIn" />
    if (val === 2) return <ProficiencyTwo zoom="zoomedIn" />
    if (val === 3) return <ProficiencyThree zoom="zoomedIn" />
    if (val === 4) return <ProficiencyFour zoom="zoomedIn" />
    if (val === 5) return <ProficiencyFive zoom="zoomedIn" />
  }

  const renderList = () => {
    if (loading || languages === null) return <LoaderFullScreen />
    if (languages.length < 1)
      return (
        <BitNoData
          cvBit="Language"
          routeName="LanguageCreate"
          buttonText="add language"
        />
      )
    return (
      <>
        <FlatList
          keyExtractor={language => language._id}
          data={languages}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <View style={styles.documentBed}>
                  <View style={styles.titleBed}>
                    <Octicons style={styles.point} name="primitive-dot" />
                    <Text style={styles.title}>{item.language}</Text>
                  </View>
                </View>
                <View style={styles.itemTextProficiencyBed}>
                  {!item.write || item.write.length < 1 ? null : (
                    <View style={styles.itemTextProficiencyContainer}>
                      <Text style={styles.itemText}>write</Text>
                      {renderProfiencyDots(item.write)}
                    </View>
                  )}
                  {!item.read || item.read.length < 1 ? null : (
                    <View style={styles.itemTextProficiencyContainer}>
                      <Text style={styles.itemText}>read</Text>
                      {renderProfiencyDots(item.read)}
                    </View>
                  )}
                  {!item.speak || item.speak.length < 1 ? null : (
                    <View style={styles.itemTextProficiencyContainer}>
                      <Text style={styles.itemText}>speak</Text>
                      {renderProfiencyDots(item.speak)}
                    </View>
                  )}
                </View>
                <View style={styles.buttonBed}>
                  <TouchableOpacity
                    style={styles.editButtonBed}
                    onPress={() =>
                      navigation.navigate('LanguageEdit', {
                        id: item._id,
                        language: item.language
                      })
                    }
                  >
                    <MaterialCommunityIcons
                      style={styles.actionButton}
                      name="pencil"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButtonBed}>
                    <MaterialCommunityIcons
                      onPress={() => {
                        setDocumentId(item._id)
                        setDocumentSelected(item.language)
                        showDeleteModal()
                      }}
                      style={styles.actionButton}
                      name="delete"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )
          }}
        />
      </>
    )
  }

  return (
    <>
      <DeleteModal
        id={documentId}
        documentSelected={documentSelected}
        bit="language"
      />
      <NavigationEvents
        onWillBlur={fetchLanguages}
        onWillFocus={fetchLanguages}
      />
      {loading || !languages || languages.length < 1 ? null : (
        <AddContentButtonLink routeName="LanguageCreate" text="add language" />
      )}
      <View style={styles.bed}>{renderList()}</View>
      {loading || !languages || languages.length < 1 ? null : (
        <DoneButton text="Done" routeName="Dashboard" />
      )}
    </>
  )
}

LanguageScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>languages</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="Dashboard" />
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
    width: '100%',
    paddingHorizontal: '5%'
  },
  container: {
    backgroundColor: '#ffff',
    borderRadius: 5,
    padding: 7,
    margin: 5
  },
  documentBed: {
    flexDirection: 'row',
    paddingBottom: 10
  },
  titleBed: {
    flexGrow: 1.5,
    flex: 1,
    flexDirection: 'row',
    paddingTop: 7,
    paddingLeft: 10,
    paddingRight: 5
  },
  point: {
    paddingTop: 6,
    fontSize: 16
  },
  title: {
    fontSize: 22,
    paddingLeft: 7
  },
  itemTextProficiencyBed: {
    width: 210
  },
  itemTextProficiencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 25
  },
  itemText: {
    fontSize: 20,
    paddingTop: 7
  },
  buttonBed: {
    backgroundColor: '#232936',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 5,
    margin: 10,
    width: 115,
    borderRadius: 25
  },
  editButtonBed: {
    backgroundColor: '#558dd8',
    borderRadius: 25
  },
  deleteButtonBed: {
    backgroundColor: '#c35a44',
    borderRadius: 25
  },
  actionButton: {
    fontSize: 22,
    color: '#ffff',
    padding: 7
  }
})

export default withNavigation(LanguageScreen)
