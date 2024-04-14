import React, { useState } from 'react'

import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'

import PrepareGame from './screens/PrepareGame'
import LinearGradient from 'react-native-linear-gradient'
import LaunchGame from './screens/LaunchGame'
import colors from './constants/colors'
import GameOver from './screens/GameOver'

function App(): React.JSX.Element {
  const [userNumber, setUserNumber] = useState<number | null>(null)
  const [isGameOver, setIsGameOver] = useState<boolean>(true)
  const [guessRounds, setGuessRounds] = useState<number>(0)

  const gameOver = (numberOfRounds: number) => {
    setIsGameOver(true)
    setGuessRounds(numberOfRounds)
  }

  const startGame = (pickedNumber: number) => {
    setUserNumber(pickedNumber)
    setIsGameOver(false)
  }

  const restartGame = () => {
    setUserNumber(null)
    setGuessRounds(0)
  }

  let screen = <PrepareGame onNumberValidated={startGame} />
  if (userNumber) {
    screen = <LaunchGame userNumber={userNumber} onCorrectGuess={gameOver} />
  }

  if (isGameOver && userNumber) {
    screen = (
      <GameOver
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={restartGame}
      />
    )
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[colors.primary700, colors.accent500]}
        style={styles.root}
      >
        <ImageBackground
          source={require('./assets/images/background.png')}
          resizeMode="cover"
          style={styles.root}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.root}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.15 // 85% transparency
  }
})

export default App
