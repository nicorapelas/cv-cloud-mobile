import React, { useContext, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { NavigationEvents, withNavigation } from 'react-navigation'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import BitNoData from '../../../components/BitNoData'
import DeleteModal from '../../../components/cvBitDeleteModals/DeleteModal'
import AddContentButtonLink from '../../../components/links/AddContentButtonLink'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'
import DoneButton from '../../../components/links/DoneButton'
import { Context as ReferenceContext } from '../../../context/ReferenceContext'
import { Context as UniversalContext } from '../../../context/UniversalContext'

const ReferenceScreen = ({ navigation }) => {
  const [documentId, setDocumentId] = useState('')
  const [documentSelected, setDocumentSelected] = useState('')

  const {
    state: { loading, references },
    fetchReferences
  } = useContext(ReferenceContext)

  const { showDeleteModal } = useContext(UniversalContext)

  const renderList = () => {
    if (loading || references === null) return <LoaderFullScreen />
    if (references.length < 1)
      return (
        <BitNoData
          cvBit="Reference"
          routeName="ReferenceCreate"
          buttonText="add reference"
        />
      )
    return (
      <>
        <FlatList
          keyExtractor={reference => reference._id}
          data={references}
          renderItem={({ item }) => {
            return (
              <>
                <View style={styles.contentBed}>
                  {!item.name || item.name.length < 1 ? null : (
                    <View style={styles.contentRow}>
                      <MaterialIcons style={styles.icon} name="person" />
                      <Text style={styles.text}>{item.name}</Text>
                    </View>
                  )}
                  {!item.company || item.company.length < 1 ? null : (
                    <View style={styles.contentRow}>
                      <MaterialIcons style={styles.icon} name="business" />
                      <Text style={styles.text}>{item.company}</Text>
                    </View>
                  )}
                  {!item.phone || item.phone.length < 1 ? null : (
                    <View style={styles.contentRow}>
                      <MaterialCommunityIcons
                        style={styles.icon}
                        name="cellphone-basic"
                      />
                      <Text style={styles.text}>{item.phone}</Text>
                    </View>
                  )}
                  {!item.email || item.email.length < 1 ? null : (
                    <View style={styles.contentRow}>
                      <MaterialCommunityIcons
                        style={styles.icon}
                        name="email"
                      />
                      <Text style={styles.text}>{item.email}</Text>
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
                          navigation.navigate('ReferenceEdit', {
                            id: item._id,
                            name: item.name,
                            company: item.company,
                            email: item.email,
                            phone: item.phone
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
                          setDocumentSelected(item.name)
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
        bit="reference"
        documentSelected={documentSelected}
      />
      <NavigationEvents
        onWillBlur={fetchReferences}
        onWillFocus={fetchReferences}
      />
      {loading || !references || references.length < 1 ? null : (
        <AddContentButtonLink
          routeName="ReferenceCreate"
          text="add reference"
        />
      )}
      <View style={styles.bed}>{renderList()}</View>
      {loading || !references || references.length < 1 ? null : (
        <DoneButton text="Done" routeName="Dashboard" />
      )}
    </>
  )
}

ReferenceScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>reference</Text>,
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

export default withNavigation(ReferenceScreen)
