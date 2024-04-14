import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Title from '../components/ui/Title'
import NumberContainer from '../components/game/NumberContainer'
import PrimaryButton from '../components/ui/PrimaryButton'
import Card from '../components/ui/Card'
import InstructionText from '../components/ui/InstructionText'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import GuessLogItem from '../components/game/GuessLogItem'

const generateRandomBetween = (min: number, max: number, exclude: number) => {
  const randomNum = Math.floor(Math.random() * (max - min)) + min

  if (randomNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return randomNum
  }
}

let minBoundary = 1
let maxBoundary = 100

const LaunchGame = ({
  userNumber,
  onCorrectGuess
}: {
  userNumber: number
  onCorrectGuess: (numberOfRounds: number) => void
}) => {
  const initialGuess = generateRandomBetween(
    minBoundary,
    maxBoundary,
    userNumber
  )
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [guessRounds, setGuessRounds] = useState([initialGuess])

  useEffect(() => {
    minBoundary = 1
    maxBoundary = 100
  }, [])

  const detectWrongDirection = (direction: 'lower' | 'greater') => {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'You know this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ])

      return false
    }

    return true
  }

  const guessNextNumber = (direction: 'lower' | 'greater') => {
    const shouldProceed = detectWrongDirection(direction)
    if (!shouldProceed) {
      return
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess
    } else {
      minBoundary = currentGuess + 1
    }

    const newRandomNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    )

    if (newRandomNumber === userNumber) {
      onCorrectGuess(guessRounds.length)
    }

    setCurrentGuess(newRandomNumber)
    setGuessRounds(prevGuessRounds => [newRandomNumber, ...prevGuessRounds])
  }

  return (
    <View style={styles.container}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={guessNextNumber.bind(this, 'greater')}>
              <FontAwesomeIcon icon={faPlus} color="white" size={24} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={guessNextNumber.bind(this, 'lower')}>
              <FontAwesomeIcon icon={faMinus} color="white" size={24} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          keyExtractor={item => item.toString()}
          renderItem={data => (
            <GuessLogItem
              roundNumber={guessRounds.length - data.index}
              guess={data.item}
            />
          )}
        />
      </View>
    </View>
  )
}

export default LaunchGame

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1
  },
  listContainer: {
    flex: 1,
    padding: 16
  },
  instructionText: {
    marginBottom: 12
  }
})
