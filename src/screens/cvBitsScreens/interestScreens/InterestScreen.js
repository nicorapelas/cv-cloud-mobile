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
import DeleteModal from '../../../components/cvBitDeleteModals/DeleteModal'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'
import DoneButton from '../../../components/links/DoneButton'
import { Context as InterestContext } from '../../../context/InterestContext'
import { Context as UniversalContext } from '../../../context/UniversalContext'

const InterestScreen = ({ navigation }) => {
  const [documentId, setDocumentId] = useState('')
  const [documentSelected, setDocumentSelected] = useState('')

  const { showDeleteModal } = useContext(UniversalContext)
  const {
    state: { loading, interests },
    fetchInterests
  } = useContext(InterestContext)

  const renderList = () => {
    if (loading || loading === null || interests === null)
      return <LoaderFullScreen />
    if (interests.length < 1)
      return (
        <BitNoData
          cvBit="Interest"
          routeName="InterestCreate"
          buttonText="add interest"
        />
      )
    return (
      <>
        <AddContentButtonLink routeName="InterestCreate" text="add interest" />
        <FlatList
          keyExtractor={interest => interest._id}
          data={interests}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <View style={styles.titleBed}>
                  <Octicons style={styles.point} name="primitive-dot" />
                  <Text style={styles.title}>{item.interest}</Text>
                </View>
                <View style={styles.buttonBed}>
                  <TouchableOpacity
                    style={styles.editButtonBed}
                    onPress={() =>
                      navigation.navigate('InterestEdit', {
                        id: item._id,
                        interest: item.interest
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
                      style={styles.actionButton}
                      name="delete"
                      onPress={() => {
                        setDocumentId(item._id)
                        setDocumentSelected(item.interest)
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
        documentSelected={documentSelected}
        bit="interest"
      />
      <NavigationEvents
        onWillBlur={fetchInterests}
        onWillFocus={fetchInterests}
      />
      <View style={styles.bed}>{renderList()}</View>
      {loading || !interests || interests.length < 1 ? null : (
        <DoneButton text="Done" routeName="Dashboard" />
      )}
    </>
  )
}

InterestScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>Interests</Text>,
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
    width: '100%'
  },
  container: {
    backgroundColor: '#ffff',
    borderRadius: 5,
    padding: 7,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleBed: {
    flexDirection: 'row',
    paddingTop: 7,
    paddingLeft: 7
  },
  point: {
    paddingTop: 4,
    fontSize: 16
  },
  title: {
    fontSize: 20,
    paddingLeft: 10
  },
  buttonBed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 5,
    width: 90
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

export default withNavigation(InterestScreen)
