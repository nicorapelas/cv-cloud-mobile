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
  Foundation
} from '@expo/vector-icons'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import BitNoData from '../../../components/BitNoData'
import DeleteModal from '../../../components/cvBitDeleteModals/DeleteModal'
import AddContentButtonLink from '../../../components/links/AddContentButtonLink'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'
import DoneButton from '../../../components/links/DoneButton'
import { Context as SecondEduContext } from '../../../context/SecondEduContext'
import { Context as UniversalContext } from '../../../context/UniversalContext'

const SecondEduScreen = ({ navigation }) => {
  const [documentId, setDocumentId] = useState('')
  const [documentSelected, setDocumentSelected] = useState('')

  const {
    state: { loading, secondEdus },
    fetchSecondEdus
  } = useContext(SecondEduContext)

  const { showDeleteModal } = useContext(UniversalContext)

  const renderList = () => {
    if (loading || secondEdus === null) return <LoaderFullScreen />
    if (secondEdus.length < 1)
      return (
        <BitNoData
          cvBit="Secondary education"
          routeName="SecondEduCreate"
          buttonText="add secondary education"
        />
      )
    return (
      <>
        <FlatList
          keyExtractor={secondEdu => secondEdu._id}
          data={secondEdus}
          renderItem={({ item }) => {
            return (
              <>
                <View style={styles.contentBed}>
                  {!item.schoolName || item.schoolName.length < 1 ? null : (
                    <View style={styles.contentRow}>
                      <MaterialCommunityIcons
                        style={styles.icon}
                        name="school"
                      />
                      <Text style={styles.text}>{item.schoolName}</Text>
                    </View>
                  )}
                  {!item.startDate ? null : (
                    <View style={styles.contentRow}>
                      <Foundation style={styles.icon} name="calendar" />
                      <Text style={styles.text}>
                        {item.startDate}
                        {!item.endDate ? null : ` - ${item.endDate}`}
                      </Text>
                    </View>
                  )}
                  {!item.subjects || item.subjects.length < 1 ? null : (
                    <View style={styles.subjectsBed}>
                      <MaterialCommunityIcons
                        style={styles.subjectsIcon}
                        name="text-subject"
                      />
                      <View style={styles.subjectsContainer}>
                        {item.subjects.map(sub => {
                          return (
                            <Text style={styles.subjectText} key={sub.key}>
                              {sub.subject}
                            </Text>
                          )
                        })}
                      </View>
                    </View>
                  )}
                  {!item.additionalInfo ||
                  item.additionalInfo.length < 1 ? null : (
                    <View style={styles.contentRow}>
                      <MaterialCommunityIcons
                        name="information"
                        style={styles.icon}
                      />
                      <Text style={styles.text}>{item.additionalInfo}</Text>
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
                          navigation.navigate('SecondEduEdit', {
                            id: item._id,
                            schoolName: item.schoolName,
                            startDate: item.startDate,
                            endDate: item.endDate,
                            subjects: item.subjects,
                            additionalInfo: item.additionalInfo
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
                          setDocumentSelected(item.schoolName)
                          showDeleteModal()
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
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
        bit="secondary education"
        documentSelected={documentSelected}
      />
      <NavigationEvents
        onWillBlur={fetchSecondEdus}
        onWillFocus={fetchSecondEdus}
      />
      {loading || !secondEdus || secondEdus.length < 1 ? null : (
        <AddContentButtonLink
          routeName="SecondEduCreate"
          text="add secondary education"
        />
      )}
      <View style={styles.bed}>{renderList()}</View>
      {loading || !secondEdus || secondEdus.length < 1 ? null : (
        <DoneButton text="Done" routeName="Dashboard" />
      )}
    </>
  )
}

SecondEduScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>secondary education</Text>,
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
    width: 22,
    fontSize: 22
  },
  subjectsBed: {
    flexDirection: 'row'
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 25
  },
  subjectsIcon: {
    fontSize: 22,
    width: 25
  },
  subjectText: {
    fontSize: 18,
    paddingLeft: 10
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

export default withNavigation(SecondEduScreen)
