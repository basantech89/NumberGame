import { StyleSheet, Text, TextProps, View } from 'react-native'
import React, { PropsWithChildren } from 'react'
import colors from '../../constants/colors'

const InstructionText = ({
  children,
  style,
  ...rest
}: PropsWithChildren<TextProps>) => {
  return (
    <Text style={[styles.instructionText, style]} {...rest}>
      {children}
    </Text>
  )
}

export default InstructionText

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'OpenSans-Regular',
    color: colors.accent500,
    fontSize: 24
  }
})
