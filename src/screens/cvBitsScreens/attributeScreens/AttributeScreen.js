import React, { useContext, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { withNavigation, NavigationEvents } from 'react-navigation'
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import BitNoData from '../../../components/BitNoData'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'
import AddContentButtonLink from '../../../components/links/AddContentButtonLink'
import DoneButton from '../../../components/links/DoneButton'
import DeleteModal from '../../../components/cvBitDeleteModals/DeleteModal'
import { Context as AttributeContext } from '../../../context/AttributeContext'
import { Context as UniversalContext } from '../../../context/UniversalContext'

const AttributeScreen = ({ navigation }) => {
  const [documentId, setDocumentId] = useState('')
  const [documentSelected, setDocumentSelected] = useState('')

  const { showDeleteModal } = useContext(UniversalContext)
  const {
    state: { loading, attributes },
    fetchAttributes,
  } = useContext(AttributeContext)

  const renderList = () => {
    if (loading || attributes === null) return <LoaderFullScreen />
    if (!attributes || attributes.length < 1)
      return (
        <BitNoData
          cvBit="Attributes"
          routeName="AttributeCreate"
          buttonText="add attribute"
        />
      )
    return (
      <>
        <FlatList
          keyExtractor={(attribute) => attribute._id}
          data={attributes}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <View style={styles.titleBed}>
                  <Octicons style={styles.point} name="primitive-dot" />
                  <Text style={styles.title}>{item.attribute}</Text>
                </View>
                <View style={styles.buttonBed}>
                  <TouchableOpacity
                    style={styles.editButtonBed}
                    onPress={() =>
                      navigation.navigate('AttributeEdit', {
                        id: item._id,
                        attribute: item.attribute,
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
                        setDocumentSelected(item.attribute)
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
        bit="attribute"
      />
      <NavigationEvents
        onWillBlur={fetchAttributes}
        onWillFocus={fetchAttributes}
      />
      {loading || !attributes || attributes.length < 1 ? null : (
        <AddContentButtonLink
          routeName="AttributeCreate"
          text="add attribute"
        />
      )}
      <View style={styles.bed}>{renderList()}</View>
      {loading || !attributes || attributes.length < 1 ? null : (
        <DoneButton text="Done" routeName="Dashboard" />
      )}
    </>
  )
}

AttributeScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>attributes</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="Dashboard" />,
  }
}

const styles = StyleSheet.create({
  heading: {
    color: '#ffff',
    fontSize: 22,
  },
  bed: {
    backgroundColor: '#232936',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: '2%',
  },
  container: {
    backgroundColor: '#ffff',
    borderRadius: 5,
    padding: 7,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleBed: {
    flexDirection: 'row',
    paddingTop: 7,
    paddingLeft: 7,
    flex: 1,
  },
  point: {
    paddingTop: 4,
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    paddingLeft: 10,
    width: '90%',
  },
  buttonBed: {
    backgroundColor: '#232936',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    paddingHorizontal: 5,
    paddingVertical: 5,
    maxHeight: 45,
    borderRadius: 25,
  },
  editButtonBed: {
    backgroundColor: '#278ACD',
    borderRadius: 25,
  },
  deleteButtonBed: {
    backgroundColor: '#f56c6c',
    borderRadius: 25,
  },
  actionButton: {
    fontSize: 22,
    color: '#ffff',
    padding: 7,
  },
})

export default withNavigation(AttributeScreen)
