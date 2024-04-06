import React, { useContext, useState } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import SkillEditForm from '../../../components/cvBitForms/SkillCreateEditForm'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import { Context as SkillContext } from '../../../context/SkillContext'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const SkillEditScreen = ({ navigation }) => {
  const [id] = useState(navigation.getParam('id'))
  const [skill] = useState(navigation.getParam('skill'))
  const [proficiency] = useState(navigation.getParam('proficiency'))

  const {
    state: { loading }
  } = useContext(SkillContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return (
      <SkillEditForm
        bit="skill"
        id={id}
        formType="edit"
        incomingSkill={skill}
        incomingProficiency={proficiency}
      />
    )
  }

  return renderContent()
}

SkillEditScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>edit skill</Text>,
    headerLeft: () => <HeaderBackButtonLink routeName="Skill" />
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
  }
})

export default SkillEditScreen
