import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { NavigationEvents } from 'react-navigation'
import { Text } from 'react-native-elements'
import { Context as UniversalContext } from '../../context/UniversalContext'

const RadioProficiencyButton = ({ bit, incomingProficiency, formPart }) => {
  const { setProficiency, resetProficiency } = useContext(UniversalContext)

  const [proficiencyOne, setProficiencyOne] = useState(false)
  const [proficiencyTwo, setProficiencyTwo] = useState(false)
  const [proficiencyThree, setProficiencyThree] = useState(false)
  const [proficiencyFour, setProficiencyFour] = useState(false)
  const [proficiencyFive, setProficiencyFive] = useState(false)

  useEffect(() => {
    presetProficiency()
  }, [])

  const presetProficiency = () => {
    if (incomingProficiency === 1) setProficiencyOne(true)
    if (incomingProficiency === 2) setProficiencyTwo(true)
    if (incomingProficiency === 3) setProficiencyThree(true)
    if (incomingProficiency === 4) setProficiencyFour(true)
    if (incomingProficiency === 5) setProficiencyFive(true)
  }

  const renderRadioButtons = () => {
    return (
      <View style={styles.proficiencyDotBed}>
        <TouchableOpacity
          style={styles.proficiencyDotContainer}
          onPress={() => {
            setProficiencyOne(true)
            setProficiencyTwo(false)
            setProficiencyThree(false)
            setProficiencyFour(false)
            setProficiencyFive(false)
            setProficiency(1)
          }}
        >
          {proficiencyOne ? (
            <FontAwesome style={styles.proficiencyDot} name="dot-circle-o" />
          ) : (
            <FontAwesome style={styles.proficiencyNoDot} name="circle-o" />
          )}
          <Text
            style={
              proficiencyOne
                ? styles.proficiencyNumberSelected
                : styles.proficiencyNumberNotSelected
            }
          >
            1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.proficiencyDotContainer}
          onPress={() => {
            setProficiencyOne(false)
            setProficiencyTwo(true)
            setProficiencyThree(false)
            setProficiencyFour(false)
            setProficiencyFive(false)
            setProficiency(2)
          }}
        >
          {proficiencyTwo ? (
            <FontAwesome style={styles.proficiencyDot} name="dot-circle-o" />
          ) : (
            <FontAwesome style={styles.proficiencyNoDot} name="circle-o" />
          )}
          <Text
            style={
              proficiencyTwo
                ? styles.proficiencyNumberSelected
                : styles.proficiencyNumberNotSelected
            }
          >
            2
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.proficiencyDotContainer}
          onPress={() => {
            setProficiencyOne(false)
            setProficiencyTwo(false)
            setProficiencyThree(true)
            setProficiencyFour(false)
            setProficiencyFive(false)
            setProficiency(3)
          }}
        >
          {proficiencyThree ? (
            <FontAwesome style={styles.proficiencyDot} name="dot-circle-o" />
          ) : (
            <FontAwesome style={styles.proficiencyNoDot} name="circle-o" />
          )}
          <Text
            style={
              proficiencyThree
                ? styles.proficiencyNumberSelected
                : styles.proficiencyNumberNotSelected
            }
          >
            3
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.proficiencyDotContainer}
          onPress={() => {
            setProficiencyOne(false)
            setProficiencyTwo(false)
            setProficiencyThree(false)
            setProficiencyFour(true)
            setProficiencyFive(false)
            setProficiency(4)
          }}
        >
          {proficiencyFour ? (
            <FontAwesome style={styles.proficiencyDot} name="dot-circle-o" />
          ) : (
            <FontAwesome style={styles.proficiencyNoDot} name="circle-o" />
          )}
          <Text
            style={
              proficiencyFour
                ? styles.proficiencyNumberSelected
                : styles.proficiencyNumberNotSelected
            }
          >
            4
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.proficiencyDotContainer}
          onPress={() => {
            setProficiencyOne(false)
            setProficiencyTwo(false)
            setProficiencyThree(false)
            setProficiencyFour(false)
            setProficiencyFive(true)
            setProficiency(5)
          }}
        >
          {proficiencyFive ? (
            <FontAwesome style={styles.proficiencyDot} name="dot-circle-o" />
          ) : (
            <FontAwesome style={styles.proficiencyNoDot} name="circle-o" />
          )}
          <Text
            style={
              proficiencyFive
                ? styles.proficiencyNumberSelected
                : styles.proficiencyNumberNotSelected
            }
          >
            5
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderLabel = () => {
    if (proficiencyOne) {
      return (
        <View style={styles.proficiencyInput}>
          {bit === 'language' ? (
            <Text style={styles.proficiencyInputText}>beginner</Text>
          ) : null}
          {bit === 'skill' ? (
            <Text style={styles.proficiencyInputText}>novice</Text>
          ) : null}
        </View>
      )
    }
    if (proficiencyTwo) {
      return (
        <View style={styles.proficiencyInput}>
          {bit === 'language' ? (
            <Text style={styles.proficiencyInputText}>elementary</Text>
          ) : null}
          {bit === 'skill' ? (
            <Text style={styles.proficiencyInputText}>beginner</Text>
          ) : null}
        </View>
      )
    }
    if (proficiencyThree) {
      return (
        <View style={styles.proficiencyInput}>
          {bit === 'language' ? (
            <Text style={styles.proficiencyInputText}>intermediate</Text>
          ) : null}
          {bit === 'skill' ? (
            <Text style={styles.proficiencyInputText}>skilled</Text>
          ) : null}
        </View>
      )
    }
    if (proficiencyFour) {
      return (
        <View style={styles.proficiencyInput}>
          {bit === 'language' ? (
            <Text style={styles.proficiencyInputText}>advanced</Text>
          ) : null}
          {bit === 'skill' ? (
            <Text style={styles.proficiencyInputText}>experienced</Text>
          ) : null}
        </View>
      )
    }
    if (proficiencyFive) {
      return (
        <View style={styles.proficiencyInput}>
          {bit === 'language' ? (
            <Text style={styles.proficiencyInputText}>proficient</Text>
          ) : null}
          {bit === 'skill' ? (
            <Text style={styles.proficiencyInputText}>expert</Text>
          ) : null}
        </View>
      )
    }
    return <Text style={styles.proficiencyInput}></Text>
  }

  return (
    <>
      <NavigationEvents
        onWillBlur={() => {
          setProficiencyOne(false)
          setProficiencyTwo(false)
          setProficiencyThree(false)
          setProficiencyFour(false)
          setProficiencyFive(false)
          resetProficiency()
        }}
        onWillFocus={() => {
          setProficiencyOne(false)
          setProficiencyTwo(false)
          setProficiencyThree(false)
          setProficiencyFour(false)
          setProficiencyFive(false)
          resetProficiency()
        }}
      />
      <View>{renderLabel()}</View>
      {renderRadioButtons()}
    </>
  )
}

const styles = StyleSheet.create({
  proficiencyDotBed: {
    width: '70%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingVertical: 7,
    paddingBottom: 30,
  },
  proficiencyDot: {
    color: '#F9B321',
    fontSize: 40,
  },
  proficiencyNoDot: {
    color: '#617795',
    fontSize: 40,
  },
  proficiencyNumberSelected: {
    color: '#F9B321',
    alignSelf: 'center',
    fontSize: 20,
  },
  proficiencyNumberNotSelected: {
    color: '#617795',
    alignSelf: 'center',
    fontSize: 20,
  },
  proficiencyInput: {
    alignSelf: 'center',
    height: 50,
    width: '85%',
    textAlign: 'center',
    borderRadius: 7,
    margin: 5,
  },
  proficiencyInputText: {
    color: '#ffff',
    fontFamily: 'sourceSansProLight',
    fontSize: 25,
  },
  selectProficiency: {
    backgroundColor: '#232936',
    borderColor: '#617795',
    borderWidth: 2,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '85%',
    borderRadius: 7,
    margin: 5,
  },
  selectProficiencyText: {
    color: '#617795',
  },
  proficiencyInput: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '85%',
    borderRadius: 7,
    margin: 5,
  },
})

export default RadioProficiencyButton
