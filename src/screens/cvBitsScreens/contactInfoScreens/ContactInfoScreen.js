import React, { useContext, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import {
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import LoaderFullScreen from '../../../components/loadingModals/LoaderFullScreen'
import BitNoData from '../../../components/BitNoData'
import HeaderBackButtonLink from '../../../components/links/HeaderBackButtonLink'
import DoneButton from '../../../components/links/DoneButton'
import DeleteModal from '../../../components/cvBitDeleteModals/DeleteModal'
import { Context as ContactInfoContext } from '../../../context/ContactInfoContext'
import { Context as UniversalContext } from '../../../context/UniversalContext'
import { ScrollView } from 'react-native-gesture-handler'

const ContactInfoScreen = ({ navigation }) => {
  const [documentId, setDocumentId] = useState('')

  const {
    state: { loading, contactInfo },
    fetchContactInfo
  } = useContext(ContactInfoContext)

  const { showDeleteModal } = useContext(UniversalContext)

  const renderContent = () => {
    if (loading || contactInfo === null) return <LoaderFullScreen />
    if (!contactInfo[0] || contactInfo.length < 1) {
      return (
        <BitNoData
          cvBit="Contact information"
          routeName="ContactInfoCreate"
          buttonText="add contact information"
        />
      )
    }
    const {
      _id,
      unit,
      complex,
      address,
      suburb,
      city,
      country,
      email,
      lastUpdate,
      phone,
      postalCode,
      province
    } = contactInfo[0]
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <View style={styles.contentBed}>
          {!email || email.length === 0 ? null : (
            <View style={styles.contentRow}>
              <Entypo name="email" style={styles.icon} />
              <Text style={styles.text}>{email}</Text>
            </View>
          )}
          {!phone || phone.length === 0 ? null : (
            <View style={styles.contentRow}>
              <Entypo name="phone" style={styles.icon} />
              <Text style={styles.text}>{phone}</Text>
            </View>
          )}
          {!unit || unit.length === 0 ? null : (
            <View style={styles.contentRow}>
              <Entypo name="address" style={styles.icon} />
              <Text style={styles.text}>unit: {unit}</Text>
            </View>
          )}
          {!complex || complex.length === 0 ? null : (
            <View style={styles.contentRow}>
              {!unit || unit.length === 0 ? (
                <Entypo name="address" style={styles.icon} />
              ) : (
                <Entypo style={styles.icon} />
              )}
              <Text style={styles.text}>{complex}</Text>
            </View>
          )}
          {!address || address.length === 0 ? null : (
            <View style={styles.contentRow}>
              {!unit && !complex ? (
                <Entypo name="address" style={styles.icon} />
              ) : (
                <Entypo style={styles.icon} />
              )}
              <Text style={styles.text}>{address}</Text>
            </View>
          )}
          {!suburb || suburb.length === 0 ? null : (
            <View style={styles.contentRow}>
              <Entypo style={styles.icon} />
              <Text style={styles.text}>{suburb}</Text>
            </View>
          )}
          {!city || city.length === 0 ? null : (
            <View style={styles.contentRow}>
              <Entypo style={styles.icon} />
              <Text style={styles.text}>{city}</Text>
            </View>
          )}
          {!postalCode || postalCode.length === 0 ? null : (
            <View style={styles.contentRow}>
              <Entypo style={styles.icon} />
              <Text style={styles.text}>{postalCode}</Text>
            </View>
          )}
          {!province || province.length === 0 ? null : (
            <View style={styles.contentRow}>
              <Entypo style={styles.icon} />
              <Text style={styles.text}>{province}</Text>
            </View>
          )}
          {!country || country.length === 0 ? null : (
            <View style={styles.contentRow}>
              <Entypo style={styles.icon} />
              <Text style={styles.text}>{country}</Text>
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
              navigation.navigate('ContactInfoEdit', {
                id: _id,
                unit,
                complex,
                address,
                suburb,
                city,
                country,
                email,
                lastUpdate,
                phone,
                postalCode,
                province
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
      </ScrollView>
    )
  }

  const renderUndefinedContent = () => {
    const { city, email, phone } = contactInfo[0]
    if (city && email && phone) return null
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
        {!email || email.length < 1 ? (
          <Text style={styles.undefinedContentTitle}>Email address</Text>
        ) : null}
        {!phone || phone.length < 1 ? (
          <Text style={styles.undefinedContentTitle}>Phone number</Text>
        ) : null}
        {!city || city.length < 1 ? (
          <Text style={styles.undefinedContentTitle}>
            City in which you reside
          </Text>
        ) : null}
      </View>
    )
  }

  return (
    <>
      <DeleteModal id={documentId} bit="contact information" />
      <NavigationEvents
        onWillBlur={fetchContactInfo}
        onWillFocus={fetchContactInfo}
      />
      <View style={styles.bed}>{renderContent()}</View>
      {loading || !contactInfo || contactInfo.length < 1 ? null : (
        <DoneButton text="Done" routeName="Dashboard" />
      )}
    </>
  )
}

ContactInfoScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: '#278ACD' },
    title: <Text style={styles.heading}>contact information</Text>,
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
    borderRadius: 7,
    marginTop: 10
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
    fontSize: 18,
    paddingLeft: 5,
    width: '90%'
  },
  addressbed: {
    flexDirection: 'row',
    paddingTop: 5
  },
  addressTextBed: {
    width: '90%'
  },
  addressText: {
    fontSize: 18,
    paddingLeft: 5,
    width: '100%'
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
    paddingTop: 20,
    marginBottom: 10
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

export default ContactInfoScreen
