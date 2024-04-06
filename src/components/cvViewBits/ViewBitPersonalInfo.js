import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
  MaterialCommunityIcons,
  FontAwesome,
  Octicons,
} from '@expo/vector-icons'

const ViewBitPersonalInfo = ({
  personalInfo,
  personalInfoSample,
  showSample,
  zoom,
}) => {
  const renderContent = () => {
    if (personalInfo === null || !personalInfo[0] || personalInfo.length < 1)
      return null
    const {
      idNumber,
      gender,
      ppNumber,
      nationality,
      driversLicense,
      licenseCode,
    } = personalInfo[0]
    return (
      <View
        style={zoom === 'zoomedOut' ? stylesZoomedOut.bed : stylesZoomedIn.bed}
      >
        <Text
          style={
            zoom === 'zoomedOut'
              ? stylesZoomedOut.heading
              : stylesZoomedIn.heading
          }
        >
          Personal information
        </Text>
        {!nationality || nationality.length < 1 ? (
          <View
            style={
              zoom === 'zoomedOut'
                ? stylesZoomedOut.contentRow
                : stylesZoomedIn.contentRow
            }
          >
            <Octicons
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.icon
                  : stylesZoomedIn.icon
              }
              name="globe"
            />
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              South African
            </Text>
          </View>
        ) : (
          <View
            style={
              zoom === 'zoomedOut'
                ? stylesZoomedOut.contentRow
                : stylesZoomedIn.contentRow
            }
          >
            <Octicons
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.icon
                  : stylesZoomedIn.icon
              }
              name="globe"
            />
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {nationality}
            </Text>
          </View>
        )}
        {!idNumber || idNumber.length < 1 ? null : (
          <View
            style={
              zoom === 'zoomedOut'
                ? stylesZoomedOut.contentRow
                : stylesZoomedIn.contentRow
            }
          >
            <FontAwesome
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.icon
                  : stylesZoomedIn.icon
              }
              name="id-card"
            />
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {idNumber}
            </Text>
          </View>
        )}
        {!ppNumber || ppNumber.length < 1 ? null : (
          <View
            style={
              zoom === 'zoomedOut'
                ? stylesZoomedOut.contentRow
                : stylesZoomedIn.contentRow
            }
          >
            <MaterialCommunityIcons
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.icon
                  : stylesZoomedIn.icon
              }
              name="passport"
            />
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {ppNumber}
            </Text>
          </View>
        )}
        {!gender || gender.length < 1 || gender === 'none' ? null : (
          <View
            style={
              zoom === 'zoomedOut'
                ? stylesZoomedOut.contentRow
                : stylesZoomedIn.contentRow
            }
          >
            {gender === 'male' ? (
              <MaterialCommunityIcons
                style={
                  zoom === 'zoomedOut'
                    ? stylesZoomedOut.icon
                    : stylesZoomedIn.icon
                }
                name="gender-male"
              />
            ) : (
              <MaterialCommunityIcons
                style={
                  zoom === 'zoomedOut'
                    ? stylesZoomedOut.icon
                    : stylesZoomedIn.icon
                }
                name="gender-female"
              />
            )}
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {gender}
            </Text>
          </View>
        )}
        {!driversLicense ? null : (
          <View
            style={
              zoom === 'zoomedOut'
                ? stylesZoomedOut.contentRow
                : stylesZoomedIn.contentRow
            }
          >
            <FontAwesome
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.icon
                  : stylesZoomedIn.icon
              }
              name="drivers-license-o"
            />
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              License:
            </Text>
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {licenseCode}
            </Text>
          </View>
        )}
        <View
          style={zoom === 'zoomedOut' ? stylesZoomedOut.hr : stylesZoomedIn.hr}
        />
      </View>
    )
  }

  const renderSampleContent = () => {
    if (
      personalInfoSample === null ||
      !personalInfoSample[0] ||
      personalInfoSample.length < 1
    )
      return null
    const {
      idNumber,
      gender,
      ppNumber,
      nationality,
      driversLicense,
      licenseCode,
    } = personalInfoSample[0]
    return (
      <View
        style={zoom === 'zoomedOut' ? stylesZoomedOut.bed : stylesZoomedIn.bed}
      >
        <Text
          style={
            zoom === 'zoomedOut'
              ? stylesZoomedOut.heading
              : stylesZoomedIn.heading
          }
        >
          Personal information
        </Text>
        {!nationality || nationality.length < 1 ? (
          <View
            style={
              zoom === 'zoomedOut'
                ? stylesZoomedOut.contentRow
                : stylesZoomedIn.contentRow
            }
          >
            <Octicons
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.icon
                  : stylesZoomedIn.icon
              }
              name="globe"
            />
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              South African
            </Text>
          </View>
        ) : (
          <View
            style={
              zoom === 'zoomedOut'
                ? stylesZoomedOut.contentRow
                : stylesZoomedIn.contentRow
            }
          >
            <Octicons
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.icon
                  : stylesZoomedIn.icon
              }
              name="globe"
            />
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {nationality}
            </Text>
          </View>
        )}
        {!idNumber || idNumber.length < 1 ? null : (
          <View
            style={
              zoom === 'zoomedOut'
                ? stylesZoomedOut.contentRow
                : stylesZoomedIn.contentRow
            }
          >
            <FontAwesome
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.icon
                  : stylesZoomedIn.icon
              }
              name="id-card"
            />
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {idNumber}
            </Text>
          </View>
        )}
        {!ppNumber || ppNumber.length < 1 ? null : (
          <View
            style={
              zoom === 'zoomedOut'
                ? stylesZoomedOut.contentRow
                : stylesZoomedIn.contentRow
            }
          >
            <MaterialCommunityIcons
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.icon
                  : stylesZoomedIn.icon
              }
              name="passport"
            />
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {ppNumber}
            </Text>
          </View>
        )}
        {!gender || gender.length < 1 || gender === 'none' ? null : (
          <View
            style={
              zoom === 'zoomedOut'
                ? stylesZoomedOut.contentRow
                : stylesZoomedIn.contentRow
            }
          >
            {gender === 'male' ? (
              <MaterialCommunityIcons
                style={
                  zoom === 'zoomedOut'
                    ? stylesZoomedOut.icon
                    : stylesZoomedIn.icon
                }
                name="gender-male"
              />
            ) : (
              <MaterialCommunityIcons
                style={
                  zoom === 'zoomedOut'
                    ? stylesZoomedOut.icon
                    : stylesZoomedIn.icon
                }
                name="gender-female"
              />
            )}
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {gender}
            </Text>
          </View>
        )}
        {!driversLicense ? null : (
          <View
            style={
              zoom === 'zoomedOut'
                ? stylesZoomedOut.contentRow
                : stylesZoomedIn.contentRow
            }
          >
            <FontAwesome
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.icon
                  : stylesZoomedIn.icon
              }
              name="drivers-license-o"
            />
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              License:
            </Text>
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {licenseCode}
            </Text>
          </View>
        )}
        <View
          style={zoom === 'zoomedOut' ? stylesZoomedOut.hr : stylesZoomedIn.hr}
        />
      </View>
    )
  }

  return !showSample ? renderContent() : renderSampleContent()
}

const stylesZoomedOut = StyleSheet.create({
  heading: {
    color: '#ffff',
    fontFamily: 'oswaldBold',
    textTransform: 'uppercase',
    fontSize: 10,
    paddingLeft: 10,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  contentRow: {
    paddingLeft: 10,
    paddingRight: 5,
    paddingTop: 2,
    flexDirection: 'row',
  },
  icon: {
    color: '#ffff',
    paddingTop: 2,
    fontSize: 6,
  },
  text: {
    color: '#ffff',
    fontSize: 7,
    paddingLeft: 2,
    paddingBottom: 2,
  },
  addressText: {
    color: '#ffff',
    fontSize: 14,
    paddingLeft: 17,
    paddingBottom: 2,
  },
  hr: {
    borderBottomColor: '#ffff',
    borderBottomWidth: 1,
    padding: 5,
    marginHorizontal: 10,
  },
})

const stylesZoomedIn = StyleSheet.create({
  heading: {
    color: '#ffff',
    fontFamily: 'oswaldBold',
    textTransform: 'uppercase',
    fontSize: 22,
    paddingLeft: 25,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 5,
  },
  contentRow: {
    paddingLeft: 25,
    paddingRight: 10,
    flexDirection: 'row',
  },
  icon: {
    color: '#ffff',
    paddingTop: 2,
  },
  text: {
    color: '#ffff',
    fontSize: 14,
    paddingLeft: 5,
    paddingBottom: 2,
  },
  addressText: {
    color: '#ffff',
    fontSize: 14,
    paddingLeft: 17,
    paddingBottom: 2,
  },
  hr: {
    borderBottomColor: '#ffff',
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 10,
  },
})

export default ViewBitPersonalInfo
