import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'
import colors from '../../constants/colors'

const NumberContainer = ({ children }: PropsWithChildren) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}

export default NumberContainer

const deviceWidth = Dimensions.get('screen').width

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: colors.accent500,
    padding: deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 12 : 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: colors.accent500,
    fontSize: deviceWidth < 380 ? 12 : 36,
    fontFamily: 'OpenSans-Bold'
  }
})
