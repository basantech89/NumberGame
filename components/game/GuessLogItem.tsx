import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../constants/colors'

const GuessLogItem = ({
  roundNumber,
  guess
}: {
  roundNumber: number
  guess: number
}) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.textItem}>#{roundNumber}</Text>
      <Text style={styles.textItem}>Opponent's Guess: {guess}</Text>
    </View>
  )
}

export default GuessLogItem

const styles = StyleSheet.create({
  listItem: {
    borderColor: colors.primary800,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: colors.accent500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3
  },
  textItem: {
    fontFamily: 'OpenSans-Regular'
  }
})
