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
  Foundation,
  FontAwesome
} from '@expo/vector-icons'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import BitNoData from '../../../components/BitNoData'
import DeleteModal from '../../../components/cvBitDeleteModals/DeleteModal'
import AddContentButtonLink from '../../../components/links/AddContentButtonLink'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'
import DoneButton from '../../../components/links/DoneButton'
import { Context as TertEduContext } from '../../../context/TertEduContext'
import { Context as UniversalContext } from '../../../context/UniversalContext'

const TertEduScreen = ({ navigation }) => {
  const [documentId, setDocumentId] = useState('')
  const [documentSelected, setDocumentSelected] = useState('')

  const {
    state: { loading, tertEdus },
    fetchTertEdus
  } = useContext(TertEduContext)

  const { showDeleteModal } = useContext(UniversalContext)

  const renderList = () => {
    if (loading || tertEdus === null) return <LoaderFullScreen />
    if (tertEdus.length < 1)
      return (
        <BitNoData
          cvBit="Tertiary education"
          routeName="TertEduCreate"
          buttonText="add tertiary education"
        />
      )
    return (
      <>
        <FlatList
          keyExtractor={tertEdu => tertEdu._id}
          data={tertEdus}
          renderItem={({ item }) => {
            return (
              <>
                <View style={styles.contentBed}>
                  {!item.instituteName ||
                  item.instituteName.length < 1 ? null : (
                    <View style={styles.contentRow}>
                      <MaterialCommunityIcons
                        style={styles.icon}
                        name="school"
                      />
                      <Text style={styles.text}>{item.instituteName}</Text>
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
                  {!item.certificationType ||
                  item.certificationType.length < 1 ? null : (
                    <View style={styles.contentRow}>
                      <FontAwesome style={styles.icon} name="certificate" />
                      <Text style={styles.text}>{item.certificationType}</Text>
                    </View>
                  )}
                  {!item.description || item.description.length < 1 ? null : (
                    <View style={styles.contentRow}>
                      <MaterialCommunityIcons
                        name="text-subject"
                        style={styles.icon}
                      />
                      <Text style={styles.text}>{item.description}</Text>
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
                          navigation.navigate('TertEduEdit', {
                            id: item._id,
                            instituteName: item.instituteName,
                            startDate: item.startDate,
                            endDate: item.endDate,
                            certificationType: item.certificationType,
                            description: item.description,
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
                          setDocumentSelected(item.instituteName)
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
        bit="tertiary education"
        documentSelected={documentSelected}
      />
      <NavigationEvents
        onWillBlur={fetchTertEdus}
        onWillFocus={fetchTertEdus}
      />
      {loading || !tertEdus || tertEdus.length < 1 ? null : (
        <AddContentButtonLink
          routeName="TertEduCreate"
          text="add tertiary education"
        />
      )}
      <View style={styles.bed}>{renderList()}</View>
      {loading || !tertEdus || tertEdus.length < 1 ? null : (
        <DoneButton text="Done" routeName="Dashboard" />
      )}
    </>
  )
}

TertEduScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>tertiary education</Text>,
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

export default withNavigation(TertEduScreen)
