import React, { useEffect, useContext, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { TextInput } from 'react-native-gesture-handler'

import { Context as BurgerMenuContext } from '../../../context/BurgerMenuContext'
import { Context as AuthContext } from '../../../context/AuthContext'

const UsersInfo = () => {
  const [buttonVisible, setButtonVisible] = useState(true)

  const {
    state: { usersInfoContentVisible },
    setUsersInfoContentVisible,
  } = useContext(BurgerMenuContext)

  const {
    state: { usersInfoContent },
    fetchUsersInfoContent,
  } = useContext(AuthContext)

  useEffect(() => {
    fetchUsersInfoContent()
  }, [])

  const renderContent = () => {
    if (!usersInfoContentVisible || !usersInfoContent) return null
    return (
      <View style={styles.bed}>
        <TouchableOpacity
          onPress={() => {
            setButtonVisible(true)
            setUsersInfoContentVisible(false)
          }}
        >
          <Text style={styles.closeButton}>close</Text>
        </TouchableOpacity>
        <Text style={styles.totalUsersText}>
          Total users: {usersInfoContent.length}
        </Text>
        <FlatList
          keyExtractor={(usersInfoContent) => usersInfoContent._id}
          data={usersInfoContent}
          renderItem={({ item }) => {
            return (
              <ScrollView style={styles.listItemBed}>
                <Text style={styles.listItemText}>{item.email}</Text>
              </ScrollView>
            )
          }}
        />
      </View>
    )
  }

  const renderButton = () => {
    if (!buttonVisible) return null
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setButtonVisible(false)
          setUsersInfoContentVisible(true)
        }}
      >
        <Text style={styles.buttonText}>Users info</Text>
      </TouchableOpacity>
    )
  }

  return (
    <>
      {renderContent()}
      {renderButton()}
    </>
  )
}

const styles = StyleSheet.create({
  bed: {
    backgroundColor: '#278ACD',
    borderColor: '#ffff',
    alignSelf: 'center',
    width: '95%',
    maxHeight: 175,
    borderWidth: 2,
    borderRadius: 7,
    marginVertical: 3,
  },
  totalUsersText: {
    color: '#ffff',
    textAlign: 'center',
    marginVertical: 5,
  },
  listItemText: {
    color: '#ffff',
    textAlign: 'center',
    marginVertical: 2,
  },
  button: {
    backgroundColor: '#278ACD',
    borderColor: '#ffff',
    alignSelf: 'center',
    width: '80%',
    borderWidth: 2,
    borderRadius: 7,
    marginVertical: 3,
    padding: 7,
  },
  buttonText: {
    color: '#ffff',
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    color: '#278ACD',
    backgroundColor: '#ffff',
    alignSelf: 'center',
    paddingVertical: 3,
    paddingHorizontal: 7,
    marginVertical: 7,
    borderRadius: 7,
  },
})

export default UsersInfo
