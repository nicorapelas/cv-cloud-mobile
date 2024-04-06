import React, { useContext, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { NavigationEvents, withNavigation } from 'react-navigation'
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons'
import BitNoData from '../../../components/BitNoData'
import AddContentButtonLink from '../../../components/links/AddContentButtonLink'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'
import DoneButton from '../../../components/links/DoneButton'
import DeleteModal from '../../../components/cvBitDeleteModals/DeleteModal'
import { Context as SkillContext } from '../../../context/SkillContext'
import { Context as UniversalContext } from '../../../context/UniversalContext'
import ProficiencyOne from '../../../components/proficiencyDots/ProficiencyOne'
import ProficiencyTwo from '../../../components/proficiencyDots/ProficiencyTwo'
import ProficiencyThree from '../../../components/proficiencyDots/ProficiencyThree'
import ProficiencyFour from '../../../components/proficiencyDots/ProficiencyFour'
import ProficiencyFive from '../../../components/proficiencyDots/ProficiencyFive'

const SkillScreen = ({ navigation }) => {
  const [documentId, setDocumentId] = useState('')
  const [documentSelected, setDocumentSelected] = useState('')

  const { showDeleteModal } = useContext(UniversalContext)
  const {
    state: { loading, skills },
    fetchSkills
  } = useContext(SkillContext)

  const renderLoader = () => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="small" color="#ededed" />
      </View>
    )
  }

  const renderList = () => {
    if (loading || skills === null)
      return <View style={styles.statusBed}>{renderLoader()}</View>
    if (skills.length < 1)
      return (
        <BitNoData
          cvBit="Skill"
          routeName="SkillCreate"
          buttonText="add skill"
        />
      )
    return (
      <>
        <AddContentButtonLink routeName="SkillCreate" text="add skill" />
        <FlatList
          keyExtractor={skill => skill._id}
          data={skills}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <View style={styles.documentBed}>
                  <View style={styles.titleBed}>
                    <Octicons style={styles.point} name="primitive-dot" />
                    <Text style={styles.title}>{item.skill}</Text>
                  </View>
                  <View style={styles.proficiencyBed}>
                    {item.proficiency === 1 ? (
                      <ProficiencyOne zoom="zoomedIn" />
                    ) : null}
                    {item.proficiency === 2 ? (
                      <ProficiencyTwo zoom="zoomedIn" />
                    ) : null}
                    {item.proficiency === 3 ? (
                      <ProficiencyThree zoom="zoomedIn" />
                    ) : null}
                    {item.proficiency === 4 ? (
                      <ProficiencyFour zoom="zoomedIn" />
                    ) : null}
                    {item.proficiency === 5 ? (
                      <ProficiencyFive zoom="zoomedIn" />
                    ) : null}
                  </View>
                </View>
                <View style={styles.buttonBed}>
                  <TouchableOpacity
                    style={styles.editButtonBed}
                    onPress={() =>
                      navigation.navigate('SkillEdit', {
                        id: item._id,
                        skill: item.skill,
                        proficiency: item.proficiency
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
                        setDocumentSelected(item.skill)
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
        bit="skill"
      />
      <NavigationEvents onWillBlur={fetchSkills} onWillFocus={fetchSkills} />
      <View style={styles.bed}>{renderList()}</View>
      {loading || !skills || skills.length < 1 ? null : (
        <DoneButton text="Done" routeName="Dashboard" />
      )}
    </>
  )
}

SkillScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>skills</Text>,
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
    paddingLeft: 7,
    paddingRight: 5
  },
  point: {
    paddingTop: 4,
    fontSize: 16
  },
  title: {
    fontSize: 20,
    paddingLeft: 10
  },
  proficiencyBed: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    flex: 1
  },
  buttonBed: {
    backgroundColor: '#232936',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginLeft: 5,
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

export default withNavigation(SkillScreen)
