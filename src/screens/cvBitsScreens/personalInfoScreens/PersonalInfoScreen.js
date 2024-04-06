import React, { useContext, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import moment from 'moment'
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  Octicons,
  FontAwesome5
} from '@expo/vector-icons'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import BitNoData from '../../../components/BitNoData'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'
import DoneButton from '../../../components/links/DoneButton'
import DeleteModal from '../../../components/cvBitDeleteModals/DeleteModal'
import { Context as PersonalInfoContext } from '../../../context/PersonalInfoContext'
import { Context as UniversalContext } from '../../../context/UniversalContext'

const PersonalInfoScreen = ({ navigation }) => {
  const [documentId, setDocumentId] = useState('')

  const { showDeleteModal } = useContext(UniversalContext)
  const {
    state: { loading, personalInfo },
    fetchPersonalInfo
  } = useContext(PersonalInfoContext)

  const renderContent = () => {
    if (loading || personalInfo === null) return <LoaderFullScreen />
    if (personalInfo.length < 1 || !personalInfo[0])
      return (
        <BitNoData
          cvBit="PersonalInfo"
          routeName="PersonalInfoCreate"
          buttonText="add personal information"
        />
      )
    const {
      _id,
      fullName,
      idNumber,
      gender,
      ppNumber,
      dateOfBirth,
      saCitizen,
      nationality,
      driversLicense,
      licenseCode,
      lastUpdate
    } = personalInfo[0]
    return (
      <>
        <View style={styles.contentBed}>
          {!fullName || fullName.length < 1 ? null : (
            <View style={styles.contentRow}>
              <MaterialIcons style={styles.icon} name="person" />
              <Text style={styles.text}>{fullName}</Text>
            </View>
          )}
          {!dateOfBirth || dateOfBirth.length < 1 ? null : (
            <View style={styles.contentRow}>
              <FontAwesome style={styles.icon} name="birthday-cake" />
              <Text style={styles.text}>
                {moment(dateOfBirth).format('DD MMMM YYYY')}
              </Text>
            </View>
          )}
          {!gender || gender.length < 1 || gender === 'none' ? null : (
            <View style={styles.contentRow}>
              {gender === 'male' ? (
                <MaterialCommunityIcons
                  style={styles.icon}
                  name="gender-male"
                />
              ) : (
                <MaterialCommunityIcons
                  style={styles.icon}
                  name="gender-female"
                />
              )}
              <Text style={styles.text}>{gender}</Text>
            </View>
          )}
          {!saCitizen ? null : (
            <View style={styles.contentRow}>
              <FontAwesome5 style={styles.icon} name="globe-africa" />
              <Text style={styles.text}>South African</Text>
            </View>
          )}
          {saCitizen || !nationality ? null : (
            <View style={styles.contentRow}>
              <Octicons style={styles.icon} name="globe" />
              <Text style={styles.text}>{nationality}</Text>
            </View>
          )}
          {!saCitizen || !idNumber ? null : (
            <View style={styles.contentRow}>
              <FontAwesome style={styles.icon} name="id-card" />
              <Text style={styles.text}>{idNumber}</Text>
            </View>
          )}
          {(saCitizen && idNumber) || !ppNumber ? null : (
            <View style={styles.contentRow}>
              <MaterialCommunityIcons style={styles.icon} name="passport" />
              <Text style={styles.text}>{ppNumber}</Text>
            </View>
          )}
          {!driversLicense ? null : (
            <View style={styles.contentRow}>
              <FontAwesome style={styles.icon} name="drivers-license-o" />
              <Text style={styles.text}>
                Drivers license:{' '}
                {!licenseCode || licenseCode.length < 1
                  ? 'unspecified'
                  : licenseCode}
              </Text>
            </View>
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
              navigation.navigate('PersonalInfoEdit', {
                id: _id,
                dateOfBirth,
                driversLicense,
                fullName,
                gender,
                idNumber,
                licenseCode,
                nationality,
                ppNumber,
                saCitizen
              })
            }
          >
            <MaterialCommunityIcons style={styles.actionButton} name="pencil" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButtonBed}>
            <MaterialCommunityIcons
              style={styles.actionButton}
              name="delete"
              onPress={() => {
                setDocumentId(_id)
                showDeleteModal()
              }}
            />
          </TouchableOpacity>
        </View>
        {renderUndefinedContent()}
      </>
    )
  }

  const renderUndefinedContent = () => {
    const { fullName, gender, dateOfBirth } = personalInfo[0]
    if (fullName && gender && dateOfBirth) return null
    return (
      <View style={styles.undefinedContentBed}>
        <Text
          style={
            Platform.OS === 'ios'
              ? styles.undefinedContentInstructionIos
              : styles.undefinedContentInstructionAndroid
          }
        >
          You are missing some potentially important information, consider
          adding:
        </Text>
        {!fullName || fullName.length < 1 ? (
          <Text style={styles.undefinedContentTitle}>Full Name</Text>
        ) : null}
        {!dateOfBirth || dateOfBirth.length < 1 ? (
          <Text style={styles.undefinedContentTitle}>Date of birth</Text>
        ) : null}
        {!gender || gender.length < 1 || gender === 'none' ? (
          <Text style={styles.undefinedContentTitle}>Gender</Text>
        ) : null}
      </View>
    )
  }

  return (
    <>
      <DeleteModal id={documentId} bit="personal information" />
      <NavigationEvents
        onWillBlur={fetchPersonalInfo}
        onWillFocus={fetchPersonalInfo}
      />
      <View style={styles.bed}>{renderContent()}</View>
      {loading || !personalInfo || personalInfo.length < 1 ? null : (
        <DoneButton text="Done" routeName="Dashboard" />
      )}
    </>
  )
}

PersonalInfoScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>personal information</Text>,
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
    paddingTop: 10,
    borderRadius: 7
  },
  contentRow: {
    flexDirection: 'row',
    paddingTop: 5
  },
  icon: {
    width: 30,
    fontSize: 22
  },
  text: {
    width: '90%',
    fontSize: 18,
    paddingLeft: 5
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
  },
  undefinedContentBed: {
    borderColor: '#f9b321',
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 20,
    padding: 7
  },
  undefinedContentInstructionIos: {
    color: '#f9b321',
    marginBottom: 10,
    fontSize: 15,
    fontWeight: '100'
  },
  undefinedContentInstructionAndroid: {
    color: '#f9b321',
    marginBottom: 5,
    fontSize: 15,
    fontFamily: 'sourceSansProLight'
  },
  undefinedContentTitle: {
    color: '#f9b321',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 5
  }
})

export default PersonalInfoScreen
