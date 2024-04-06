import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'

import Spacer from './Spacer'

const AuthForm = ({ headerText, errormessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState('')
  const [password, setPasswors] = useState('')

  return (
    <>
      <Spacer>
        <Text h4 style={styles.heading}>
          {headerText}
        </Text>
      </Spacer>
      <Spacer>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Spacer>
      <Spacer>
        <Input
          label="Password"
          value={password}
          onChangeText={setPasswors}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
      </Spacer>
      {errormessage.length > 0 ? (
        <Text style={styles.errorMessage}>{errormessage}</Text>
      ) : null}
      <Spacer>
        <Button
          onPress={() => onSubmit({ email, password })}
          title={submitButtonText}
        />
      </Spacer>
    </>
  )
}

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: 20,
    color: 'red',
  },
  link: {
    textAlign: 'center',
    color: 'blue',
  },
})

export default AuthForm
