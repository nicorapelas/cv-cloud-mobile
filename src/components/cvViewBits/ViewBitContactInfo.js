import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'

const ViewBitContactInfo = ({
  contactInfo,
  contactInfoSample,
  showSample,
  zoom,
}) => {
  const renderAddress = () => {
    if (contactInfo === null || !contactInfo[0] || contactInfo.length < 1)
      return null
    const {
      unit,
      complex,
      address,
      suburb,
      city,
      province,
      country,
      postalCode,
    } = contactInfo[0]
    if (!address && !suburb && !city && !province && !country && !postalCode)
      return null
    return (
      <View
        style={
          zoom === 'zoomedOut'
            ? stylesZoomedOut.contentRow
            : stylesZoomedIn.contentRow
        }
      >
        <Entypo
          name="address"
          style={
            zoom === 'zoomedOut' ? stylesZoomedOut.icon : stylesZoomedIn.icon
          }
        />
        <View>
          {!unit || unit.length < 1 ? null : (
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              unit: {unit}
            </Text>
          )}
          {!complex || complex.length < 1 ? null : (
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {complex}
            </Text>
          )}
          {!address || address.length < 1 ? null : (
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {address}
            </Text>
          )}
          {!suburb || suburb.length < 1 ? null : (
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {suburb}
            </Text>
          )}
          {!city || city.length < 1 ? null : (
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {city}
            </Text>
          )}
          {!province || province.length < 1 ? null : (
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {province}
            </Text>
          )}
          {!country || country.length < 1 ? null : (
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {country}
            </Text>
          )}
          {!postalCode || postalCode.length < 1 ? null : (
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {postalCode}
            </Text>
          )}
        </View>
      </View>
    )
  }

  const renderContent = () => {
    if (contactInfo === null || !contactInfo[0] || contactInfo.length < 1)
      return null
    const { email, phone } = contactInfo[0]
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
          Contact Details
        </Text>
        {!email || email.length === 0 ? null : (
          <View
            style={
              zoom === 'zoomedOut'
                ? stylesZoomedOut.contentRow
                : stylesZoomedIn.contentRow
            }
          >
            <Entypo
              name="email"
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.icon
                  : stylesZoomedIn.icon
              }
            />
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {email}
            </Text>
          </View>
        )}
        {!phone || phone.length === 0 ? null : (
          <View
            style={
              zoom === 'zoomedOut'
                ? stylesZoomedOut.contentRow
                : stylesZoomedIn.contentRow
            }
          >
            <Entypo
              name="phone"
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.icon
                  : stylesZoomedIn.icon
              }
            />
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {phone}
            </Text>
          </View>
        )}
        {renderAddress()}
        <View
          style={zoom === 'zoomedOut' ? stylesZoomedOut.hr : stylesZoomedIn.hr}
        />
      </View>
    )
  }

  const renderAddressSample = () => {
    if (
      contactInfoSample === null ||
      !contactInfoSample[0] ||
      contactInfoSample.length < 1
    )
      return null
    const {
      unit,
      complex,
      address,
      suburb,
      city,
      province,
      country,
      postalCode,
    } = contactInfoSample[0]
    if (!address && !suburb && !city && !province && !country && !postalCode)
      return null
    return (
      <View
        style={
          zoom === 'zoomedOut'
            ? stylesZoomedOut.contentRow
            : stylesZoomedIn.contentRow
        }
      >
        <Entypo
          name="address"
          style={
            zoom === 'zoomedOut' ? stylesZoomedOut.icon : stylesZoomedIn.icon
          }
        />
        <View>
          {!unit || unit.length < 1 ? null : (
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              unit: {unit}
            </Text>
          )}
          {!complex || complex.length < 1 ? null : (
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {complex}
            </Text>
          )}
          {!address || address.length < 1 ? null : (
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {address}
            </Text>
          )}
          {!suburb || suburb.length < 1 ? null : (
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {suburb}
            </Text>
          )}
          {!city || city.length < 1 ? null : (
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {city}
            </Text>
          )}
          {!province || province.length < 1 ? null : (
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {province}
            </Text>
          )}
          {!country || country.length < 1 ? null : (
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {country}
            </Text>
          )}
          {!postalCode || postalCode.length < 1 ? null : (
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {postalCode}
            </Text>
          )}
        </View>
      </View>
    )
  }

  const renderContentSample = () => {
    if (
      contactInfoSample === null ||
      !contactInfoSample[0] ||
      contactInfoSample.length < 1
    )
      return null
    const { email, phone } = contactInfoSample[0]
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
          Contact Details
        </Text>
        {!email || email.length === 0 ? null : (
          <View
            style={
              zoom === 'zoomedOut'
                ? stylesZoomedOut.contentRow
                : stylesZoomedIn.contentRow
            }
          >
            <Entypo
              name="email"
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.icon
                  : stylesZoomedIn.icon
              }
            />
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {email}
            </Text>
          </View>
        )}
        {!phone || phone.length === 0 ? null : (
          <View
            style={
              zoom === 'zoomedOut'
                ? stylesZoomedOut.contentRow
                : stylesZoomedIn.contentRow
            }
          >
            <Entypo
              name="phone"
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.icon
                  : stylesZoomedIn.icon
              }
            />
            <Text
              style={
                zoom === 'zoomedOut'
                  ? stylesZoomedOut.text
                  : stylesZoomedIn.text
              }
            >
              {phone}
            </Text>
          </View>
        )}
        {renderAddressSample()}
        <View
          style={zoom === 'zoomedOut' ? stylesZoomedOut.hr : stylesZoomedIn.hr}
        />
      </View>
    )
  }

  return !showSample ? renderContent() : renderContentSample()
}

const stylesZoomedOut = StyleSheet.create({
  heading: {
    color: '#ffff',
    fontFamily: 'oswaldBold',
    textTransform: 'uppercase',
    fontSize: 10,
    paddingLeft: 10,
    paddingRight: 5,
    paddingTop: 15,
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

export default ViewBitContactInfo
