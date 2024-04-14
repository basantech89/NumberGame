import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'
import colors from '../../constants/colors'

const PrimaryButton: React.FC<
  PropsWithChildren<PressableProps & React.RefAttributes<View>>
> = ({ children, ...rest }) => {
  return (
    <View style={styles.viewContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.pressed, styles.pressableContainer]
            : styles.pressableContainer
        }
        android_ripple={{
          color: colors.primary600
        }}
        {...rest}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
  viewContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden' // so that if any styling from the pressable go outside of it, then it's now shown, ripple effect for e.g.
  },
  pressableContainer: {
    backgroundColor: colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  pressed: {
    opacity: 0.75
  }
})
