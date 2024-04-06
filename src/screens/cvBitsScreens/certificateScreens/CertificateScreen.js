import React, { useContext, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { withNavigation, NavigationEvents } from 'react-navigation'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import DeleteModal from '../../../components/cvBitDeleteModals/DeleteModal'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import BitNoData from '../../../components/BitNoData'
import AddContentButtonLink from '../../../components/links/AddContentButtonLink'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'
import DoneButton from '../../../components/links/DoneButton'
import { Context as UniversalContext } from '../../../context/UniversalContext'
import { Context as CertificateContext } from '../../../context/CertificateContext'

const CertificateScreen = ({ navigation }) => {
  const [documentId, setDocumentId] = useState(null)
  const [documentSelected, setDocumentSelected] = useState(null)
  const [documentPublicId, setDocumentPublicId] = useState(null)

  const { showDeleteModal } = useContext(UniversalContext)

  const {
    state: { loading, certificates },
    fetchCertificates
  } = useContext(CertificateContext)

  const renderList = () => {
    if (loading || certificates === null) return <LoaderFullScreen />
    if (certificates.length < 1)
      return (
        <BitNoData
          cvBit="Certificate"
          routeName="CertificateCreate"
          buttonText="add certificate"
        />
      )
    return (
      <>
        <AddContentButtonLink
          routeName="CertificateCreate"
          text="upload certificate"
        />
        <FlatList
          keyExtractor={certificate => certificate._id}
          data={certificates}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <View>
                  {!item.pdfUrl ? null : (
                    <AntDesign name="pdffile1" style={styles.pdfIcon} />
                  )}
                  {!item.photoUrl ? null : (
                    <Image
                      style={styles.photo}
                      source={{
                        uri: `${item.photoUrl}`
                      }}
                    />
                  )}
                  <View style={styles.titleBed}>
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                  <View style={styles.buttonBed}>
                    <TouchableOpacity
                      style={styles.editButtonBed}
                      onPress={() =>
                        navigation.navigate('CertificateEdit', {
                          id: item._id,
                          title: item.title,
                          fileName: item.fileName,
                          photoUrl: item.photoUrl
                        })
                      }
                    >
                      <MaterialCommunityIcons
                        style={styles.actionButton}
                        name="pencil"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButtonBed}
                      onPress={() => {
                        setDocumentId(item._id)
                        setDocumentSelected(item.title)
                        setDocumentPublicId(item.publicId)
                        showDeleteModal()
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
        publicId={documentPublicId}
        bit="certificate"
      />
      <NavigationEvents
        onWillBlur={fetchCertificates}
        onWillFocus={fetchCertificates}
      />
      <View style={styles.bed}>{renderList()}</View>
      {loading || !certificates || certificates.length < 1 ? null : (
        <DoneButton text="Done" routeName="Dashboard" />
      )}
    </>
  )
}

CertificateScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>certificates</Text>,
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
  pdfIcon: {
    color: '#ffff',
    alignSelf: 'center',
    fontSize: 65,
    paddingBottom: 10
  },
  photo: {
    alignSelf: 'center',
    width: 65,
    height: 65,
    paddingBottom: 10
  },
  titleBed: {
    alignSelf: 'center',
    padding: 5
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

export default withNavigation(CertificateScreen)
