import React, { useContext, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { withNavigation, NavigationEvents } from 'react-navigation'
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import DeleteModal from '../../../components/cvBitDeleteModals/DeleteModal'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import BitNoData from '../../../components/BitNoData'
import AddContentButtonLink from '../../../components/links/AddContentButtonLink'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'
import { Context as PhotoContext } from '../../../context/PhotoContext'

const PhotoScreen = ({ navigation }) => {
  const [photoSelected, setPhotoSelected] = useState(null)
  const [documentId, setDocumentId] = useState('')
  const [documentSelected, setDocumentSelected] = useState('')

  const {
    state: { loading, photos, assignedPhotoId },
    fetchPhotos,
    assignPhoto,
    deleteSmallPhoto,
    deletePhoto,
    resetAssignedPhotoId
  } = useContext(PhotoContext)

  const renderList = () => {
    if (loading || photos === null) return <LoaderFullScreen />
    if (photos.length < 1)
      return (
        <BitNoData
          cvBit="Photo"
          routeName="PhotoCreate"
          buttonText="add photo"
        />
      )
    return (
      <>
        <AddContentButtonLink routeName="PhotoCreate" text="upload photo" />
        <FlatList
          keyExtractor={photo => photo._id}
          data={photos}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <View>
                  {photoSelected === item._id ||
                  assignedPhotoId == item._id ||
                  (item.assigned && photoSelected === null) ? (
                    <View style={styles.assignedImage}>
                      <Feather
                        style={styles.assignedImageIcon}
                        name="check-circle"
                        size={24}
                      />
                      <Text style={styles.assignedImageText}>assigned</Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.assignImageButton}
                      onPress={() => {
                        setPhotoSelected(item._id)
                        resetAssignedPhotoId()
                        assignPhoto(item._id)
                      }}
                    >
                      <Text style={styles.assignImageButtonText}>
                        use photo
                      </Text>
                    </TouchableOpacity>
                  )}
                  <View style={styles.titleBed}>
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                  <View style={styles.buttonBed}>
                    <TouchableOpacity style={styles.editButtonBed}>
                      <MaterialCommunityIcons
                        style={styles.actionButton}
                        name="pencil"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButtonBed}
                      onPress={() => {
                        deletePhoto(item._id)
                        deleteSmallPhoto(item)
                      }}
                    >
                      <MaterialCommunityIcons
                        style={styles.actionButton}
                        name="delete"
                      />
                    </TouchableOpacity>
                  </View>
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
        bit="attribute"
      />
      <NavigationEvents onWillBlur={fetchPhotos} onWillFocus={fetchPhotos} />
      <View style={styles.bed}>{renderList()}</View>
    </>
  )
}

PhotoScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>photo</Text>,
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
    backgroundColor: '#2e3647',
    margin: 10,
    padding: 10,
    borderRadius: 7,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  assignImageButton: {
    backgroundColor: '#278ACD',
    borderColor: '#ffff',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 5,
    height: 40
  },
  assignImageButtonText: {
    color: '#ffff'
  },
  assignedImage: {
    backgroundColor: '#0ca302',
    borderColor: '#ffff',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 5,
    height: 40
  },
  assignedImageIcon: {
    color: '#ffff',
    paddingTop: 3
  },
  assignedImageText: {
    color: '#ffff',
    paddingLeft: 5
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 7
  },
  titleBed: {
    alignSelf: 'center',
    paddingTop: 5
  },
  title: {
    color: '#ffff',
    fontSize: 17
  },
  buttonBed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: 120,
    paddingTop: 5
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

export default withNavigation(PhotoScreen)
