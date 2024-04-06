import React, { useContext, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { NavigationEvents, withNavigation } from 'react-navigation'
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from '@expo/vector-icons'
import DeleteModal from '../../../components/cvBitDeleteModals/DeleteModal'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import BitNoData from '../../../components/BitNoData'
import AddContentButtonLink from '../../../components/links/AddContentButtonLink'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'
import DoneButton from '../../../components/links/DoneButton'
import { Context as ExperienceContext } from '../../../context/ExperienceContext'
import { Context as UniversalContext } from '../../../context/UniversalContext'

const ExperienceScreen = ({ navigation }) => {
  const [documentId, setDocumentId] = useState('')
  const [documentSelected, setDocumentSelected] = useState('')

  const {
    state: { loading, experiences },
    fetchExperiences
  } = useContext(ExperienceContext)
  const { showDeleteModal } = useContext(UniversalContext)

  const renderList = () => {
    if (loading || experiences === null) return <LoaderFullScreen />
    if (experiences.length < 1)
      return (
        <BitNoData
          cvBit="Work experience"
          routeName="ExperienceCreate"
          buttonText="add work experience"
        />
      )
    return (
      <>
        <FlatList
          keyExtractor={experience => experience._id}
          data={experiences}
          renderItem={({ item }) => {
            return (
              <View style={styles.contentBed}>
                {!item.title || item.title.length < 1 ? null : (
                  <View style={styles.contentRow}>
                    <FontAwesome style={styles.icon} name="dot-circle-o" />
                    <Text style={styles.text}>{item.title}</Text>
                  </View>
                )}
                {!item.description || item.description.length < 1 ? null : (
                  <View style={styles.contentRow}>
                    <MaterialIcons style={styles.icon} name="description" />
                    <Text style={styles.text}>{item.description}</Text>
                  </View>
                )}
                <View style={styles.lastUpdateRow}>
                  <MaterialIcons
                    style={styles.lastUpdateIcon}
                    name="watch-later"
                  />
                  <Text style={styles.LastUpdateText}>
                    Last update:{' '}
                    {new Date(item.lastUpdate).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.buttonBed}>
                  <TouchableOpacity style={styles.editButtonBed}>
                    <MaterialCommunityIcons
                      style={styles.actionButton}
                      name="pencil"
                      onPress={() =>
                        navigation.navigate('ExperienceEdit', {
                          id: item._id,
                          title: item.title,
                          description: item.description
                        })
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButtonBed}>
                    <MaterialCommunityIcons
                      style={styles.actionButton}
                      name="delete"
                      onPress={() => {
                        setDocumentId(item._id)
                        setDocumentSelected(item.title)
                        showDeleteModal()
                      }}
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
        bit="experience"
        documentSelected={documentSelected}
      />
      <NavigationEvents
        onWillBlur={fetchExperiences}
        onWillFocus={fetchExperiences}
      />
      {loading || !experiences || experiences.length < 1 ? null : (
        <AddContentButtonLink
          routeName="ExperienceCreate"
          text="add work experience"
        />
      )}
      <View style={styles.bed}>{renderList()}</View>
      {loading || !experiences || experiences.length < 1 ? null : (
        <DoneButton text="Done" routeName="Dashboard" />
      )}
    </>
  )
}

ExperienceScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>work experience</Text>,
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
    paddingHorizontal: '3%'
  },
  contentBed: {
    backgroundColor: '#ffff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 7
  },
  contentRow: {
    flexDirection: 'row',
    paddingTop: 5
  },
  icon: {
    width: 30,
    fontSize: 22
  },
  lastUpdateRow: {
    flexDirection: 'row',
    paddingTop: 20,
    fontSize: 5
  },
  lastUpdateIcon: {
    paddingTop: 3
  },
  LastUpdateText: {
    paddingLeft: 7
  },
  text: {
    fontSize: 18,
    paddingLeft: 5,
    width: '90%'
  },
  buttonBed: {
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 7,
    marginTop: 5
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
    fontSize: 30,
    color: '#ffff',
    padding: 7
  }
})

export default withNavigation(ExperienceScreen)
