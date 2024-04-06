import React, { useContext, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import BitNoData from '../../../components/BitNoData'
import DeleteModal from '../../../components/cvBitDeleteModals/DeleteModal'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'
import DoneButton from '../../../components/links/DoneButton'
import { Context as PersonalSummaryContext } from '../../../context/PersonalSummaryContext'
import { Context as UniversalContext } from '../../../context/UniversalContext'
import { ScrollView } from 'react-native-gesture-handler'

const PersonalSummaryScreen = ({ navigation }) => {
  const [documentId, setDocumentId] = useState('')

  const { showDeleteModal } = useContext(UniversalContext)
  const {
    state: { loading, personalSummary },
    fetchPersonalSummary
  } = useContext(PersonalSummaryContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    if (
      personalSummary === null ||
      !personalSummary[0] ||
      personalSummary.length < 1
    ) {
      return (
        <BitNoData
          cvBit="Personal summary"
          routeName="PersonalSummaryCreate"
          buttonText="add personal summary"
        />
      )
    }
    const { content, lastUpdate, _id } = personalSummary[0]
    return (
      <>
        <View style={styles.contentBed}>
          {!content || content.length < 1 ? null : (
            <ScrollView style={styles.contentRow}>
              <Text style={styles.text}>{content}</Text>
            </ScrollView>
          )}
          <View style={styles.lastUpdateRow}>
            <MaterialIcons style={styles.lastUpdateIcon} name="watch-later" />
            <Text style={styles.LastUpdateText}>
              Last update: {new Date(lastUpdate).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View style={styles.buttonBed}>
          <TouchableOpacity
            style={styles.editButtonBed}
            onPress={() =>
              navigation.navigate('PersonalSummaryEdit', {
                id: _id,
                content: content
              })
            }
          >
            <MaterialCommunityIcons style={styles.actionButton} name="pencil" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButtonBed}>
            <MaterialCommunityIcons
              onPress={() => {
                setDocumentId(_id)
                showDeleteModal()
              }}
              style={styles.actionButton}
              name="delete"
            />
          </TouchableOpacity>
        </View>
      </>
    )
  }

  return (
    <>
      <DeleteModal id={documentId} bit="personal summary" />
      <NavigationEvents
        onWillBlur={fetchPersonalSummary}
        onWillFocus={fetchPersonalSummary}
      />
      <View style={styles.bed}>{renderContent()}</View>
      {loading || !personalSummary || personalSummary.length < 1 ? null : (
        <DoneButton text="Done" routeName="Dashboard" />
      )}
    </>
  )
}

PersonalSummaryScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>personal summary</Text>,
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
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    padding: '5%'
  },
  contentBed: {
    backgroundColor: '#ffff',
    maxHeight: '70%',
    padding: 15,
    borderRadius: 7
  },
  contentRow: {
    paddingTop: 5
  },
  text: {
    width: '95%',
    fontSize: 18,
    paddingLeft: 5
  },
  addressbed: {
    flexDirection: 'row',
    paddingTop: 5
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
  buttonBed: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20
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

export default PersonalSummaryScreen
