import React, { useState, useEffect } from 'react'
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native'
import * as RNLocalize from 'react-native-localize'

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)

  useEffect(() => {
    // Detect user's country code
    const detectedCountryCode = RNLocalize.getCountry()
    setCountryCode(detectedCountryCode)
  }, [])

  const countryPhoneFormats = {
    ZA: { countryCode: '+27', localCodeLength: 1, totalLength: 10 },
    US: { countryCode: '+1', localCodeLength: 1, totalLength: 10 },
    IN: { countryCode: '+91', localCodeLength: 0, totalLength: 10 },
    // Add more countries and their formats here
  }

  const formatPhoneNumber = (number, countryCode) => {
    let formattedNumber = number.replace(/[^\d]/g, '')
    const format = countryPhoneFormats[countryCode]

    if (format && formattedNumber.length === format.totalLength) {
      if (
        format.localCodeLength > 0 &&
        formattedNumber.startsWith('0'.repeat(format.localCodeLength))
      ) {
        formattedNumber =
          format.countryCode + formattedNumber.substring(format.localCodeLength)
      } else if (format.localCodeLength === 0) {
        formattedNumber = format.countryCode + formattedNumber
      }
    }
    return formattedNumber
  }

  const requestOtp = () => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber, countryCode)
    if (!formattedPhoneNumber) {
      Alert.alert('Invalid Number', 'Please enter a valid phone number.')
      return
    }
    // API call to your backend to request OTP
    // Example: send formattedPhoneNumber to your '/send-otp' endpoint
    // ...
    setOtpSent(true)
    Alert.alert('OTP Sent', 'An OTP has been sent to your phone.')
  }

  const verifyOtp = () => {
    // API call to your backend to verify OTP
    // Example: send phoneNumber and otp to your '/verify-otp' endpoint
    // ...
    Alert.alert('Success', 'Phone number verified!')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login with Phone Number</Text>

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="number-pad"
        editable={!otpSent}
      />

      {otpSent && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
          />
          <Button title="Verify OTP" onPress={verifyOtp} />
        </>
      )}

      {!otpSent && <Button title="Request OTP" onPress={requestOtp} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
})

export default Login
