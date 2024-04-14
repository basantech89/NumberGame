import { StyleSheet, Text } from 'react-native'
import React, { PropsWithChildren } from 'react'

const Title = (props: PropsWithChildren) => {
  return <Text style={styles.title}>{props.children}</Text>
}

export default Title

const styles = StyleSheet.create({
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'white',
    padding: 12
  }
})