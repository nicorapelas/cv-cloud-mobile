import React, { useContext } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import { Context as SkillContext } from '../../../context/SkillContext'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import SkillCreateForm from '../../../components/cvBitForms/SkillCreateEditForm'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'

const SkillCreateScreen = () => {
  const {
    state: { loading }
  } = useContext(SkillContext)

  const renderContent = () => {
    if (loading || loading === null) return <LoaderFullScreen />
    return <SkillCreateForm bit="skill" formType="create" />
  }

  return renderContent()
}

SkillCreateScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    safeAreaInsets: Platform.OS === 'ios' ? { top: 43 } : null,
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>add skills</Text>,
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

export default SkillCreateScreen
