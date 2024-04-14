import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View
} from 'react-native'
import React, { useState } from 'react'
import PrimaryButton from '../components/ui/PrimaryButton'
import { SafeParseSuccess, z } from 'zod'
import colors from '../constants/colors'
import Title from '../components/ui/Title'
import Card from '../components/ui/Card'
import InstructionText from '../components/ui/InstructionText'

const PrepareGame = (props: {
  onNumberValidated: (pickedNumber: number) => void
}) => {
  const [enteredNumber, setEnteredNumber] = useState<string>('')

  const { width, height } = useWindowDimensions()

  const numberSchema = z
    .union([z.string().min(1, 'Must provide a number'), z.number()])
    .pipe(
      z.coerce.number({ invalid_type_error: 'Must be a number' }).min(1).max(99)
    )

  const numberInputHandler = (enteredText: string) =>
    setEnteredNumber(enteredText)

  const resetEnteredNumber = () => setEnteredNumber('')

  const validateEnteredText = () => {
    const output = numberSchema.safeParse(enteredNumber)
    if (!output.success) {
      Alert.alert('Invalid Number!', output.error.issues[0].message, [
        { text: 'Okay', style: 'destructive', onPress: resetEnteredNumber }
      ])
    }

    props.onNumberValidated((output as SafeParseSuccess<number>).data)
  }

  const marginTop = height < 380 ? 30 : 100

  return (
    <ScrollView style={styles.keyboardView}>
      <KeyboardAvoidingView style={styles.keyboardView} behavior="position">
        <View style={[styles.viewContainer, { marginTop }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              value={enteredNumber}
              onChangeText={numberInputHandler}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.buttonViewContainer}>
                <PrimaryButton onPress={resetEnteredNumber}>
                  Reset
                </PrimaryButton>
              </View>
              <View style={styles.buttonViewContainer}>
                <PrimaryButton onPress={validateEnteredText}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default PrepareGame

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center'
  },
  numberInput: {
    height: 60,
    width: 50,
    fontSize: 32,
    borderBottomColor: colors.accent500,
    borderBottomWidth: 2,
    color: colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  buttonViewContainer: {
    flex: 1
  }
})
