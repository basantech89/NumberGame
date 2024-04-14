import {
  StyleSheet,
  Image,
  View,
  Text,
  useWindowDimensions,
  ScrollView
} from 'react-native'
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
  const { width, height } = useWindowDimensions()

  let imageSize = 300
  if (width < 380) {
    imageSize = 150
  }

  if (height < 400) {
    imageSize = 80
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2
  }

  return (
    <ScrollView style={styles.takeFullSpace}>
      <View style={styles.container}>
        <Title>GAME OVER!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
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
    </ScrollView>
  )
}

export default GameOver

// const deviceWidth = Dimensions.get('screen').width

const styles = StyleSheet.create({
  takeFullSpace: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    // borderRadius: deviceWidth < 380 ? 75 : 150,
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
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
