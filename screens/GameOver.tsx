import { StyleSheet, Image, View, Text, Dimensions } from 'react-native'
import React from 'react'
import Title from '../components/ui/Title'
import colors from '../constants/colors'
import PrimaryButton from '../components/ui/PrimaryButton'

const GameOver = ({
  roundsNumber,
  userNumber,
  onRestart
}: {
  roundsNumber: number
  userNumber: number
  onRestart: () => void
}) => {
  return (
    <View style={styles.container}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/success.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{' '}
        rounds to guess the number{' '}
        <Text style={styles.highlight}>{userNumber}</Text>
      </Text>
      <PrimaryButton onPress={onRestart}>Start New Game</PrimaryButton>
    </View>
  )
}

export default GameOver

const deviceWidth = Dimensions.get('screen').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    borderRadius: deviceWidth < 380 ? 75 : 150,
    width: deviceWidth < 380 ? 150 : 300,
    height: deviceWidth < 380 ? 150 : 300,
    borderWidth: 3,
    borderColor: colors.primary800,
    overflow: 'hidden',
    margin: 36
  },
  image: {
    width: '100%',
    height: '100%'
  },
  summaryText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24
  },
  highlight: {
    fontFamily: 'OpenSans-Bold',
    color: colors.primary500
  }
})
