/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Screen, Text, TextInput } from "app/components"
import { View, TouchableOpacity, Image } from "react-native"
import { style } from "./styles"
import React, { useState } from "react"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import flash from "app/config/flash"
import { Controller, useForm } from "react-hook-form"
import { useStores } from "app/models"
import logo from "assets/images/main-logo.png"

export const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit } = useForm()
  const { authStore } = useStores()

  const onSubmit = async (data) => {
    setLoading(true)
    await loginUserWithEmail(data?.email, data?.password)
  }

  const loginUserWithEmail = async (email, password) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password)
      const user = userCredential.user
      fetchUserRole(user?.uid)

      setLoading(false)
    } catch (error) {
      flash("error", "Failed to login")
      setLoading(false)
    }
  }

  const fetchUserRole = async (uid) => {
    try {
      const userRef = firestore().collection("users").doc(uid)
      const userSnapshot = await userRef.get()

      if (userSnapshot.exists) {
        const userData = userSnapshot.data()
        const { email, fullName, phoneNo, role, thumbnail, studentId } = userData

        if (role === "admin") {
          authStore.update({
            id: uid,
            email,
            fullName,
            phoneNumber: phoneNo,
            role,
            thumbnail,
          })
          navigation.reset({ index: 0, routes: [{ name: "AdminStack" }] })
        } else if (role === "lecturer") {
          authStore.update({
            id: uid,
            email,
            fullName,
            phoneNumber: phoneNo,
            role,
            thumbnail,
          })
          navigation.reset({ index: 0, routes: [{ name: "TabNavigator" }] })
        } else {
          authStore.update({
            id: uid,
            email,
            fullName,
            phoneNumber: phoneNo,
            studentId,
            role,
          })
          navigation.reset({ index: 0, routes: [{ name: "TabNavigator" }] })
        }

        flash("success", "Logged in successfully")
      } else {
        flash("error", "Failed to login")
      }
    } catch (error) {
      flash("error", "Failed to login")
    }
  }

  return (
    <Screen style={style.flex}>
      <View style={style.container}>
        <Image source={logo} style={style.logo} resizeMode="contain" />
        <Controller
          name="email"
          control={control}
          rules={{
            required: "This field is required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Invalid email format",
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <>
                <TextInput
                  error={error}
                  errorMessage={error?.message}
                  title={"Email"}
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  placeholder={"Please enter your email"}
                />
              </>
            )
          }}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: "This field is required",
            minLength: { value: 8, message: "Password too short" },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <>
                <TextInput
                  textContentType={"oneTimeCode"}
                  isPasswordField
                  errorMessage={error?.message}
                  error={error}
                  title={"Password"}
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={"Please enter your password"}
                />
              </>
            )
          }}
        />

        <Button
          loading={loading}
          style={style.button}
          title="Login"
          onPress={handleSubmit(onSubmit)}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ForgotPassword")
          }}
        >
          <Text style={style.text}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
}
