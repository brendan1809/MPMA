import { Screen, TextInput, Button, ErrorMessage, Text } from "app/components"
import React, { useEffect, useState } from "react"

import { Dimensions, Image, View } from "react-native"
import { style } from "./styles"
import { Controller, useForm } from "react-hook-form"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import flash from "app/config/flash"
import { useNavigation, useRoute } from "@react-navigation/native"
import { toLower, upperFirst } from "lodash"
import { TouchableOpacity } from "react-native-gesture-handler"
import ImagePicker from "react-native-image-crop-picker"
import storage from "@react-native-firebase/storage"

export const AdminStudentListEdit = () => {
  const route = useRoute()
  const routeFrom = route?.params?.routeFrom || ""
  const editData = route?.params?.data
  const navigation = useNavigation()
  const { control, handleSubmit, clearErrors, setValue, watch } = useForm({})

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    if (routeFrom === "add") {
      await registerUserWithEmail(data)
    } else {
      await updateUser(data)
    }
  }

  const uploadImage = () => {
    ImagePicker.openPicker({
      includeBase64: true,
    }).then(async (image) => {
      const storageRef = storage().ref(`/images/${image.filename}`)
      await storageRef.putFile(image.path, { contentType: image.mime })

      const downloadURL = await storageRef.getDownloadURL()
      setValue("thumbnail", downloadURL)
      clearErrors("thumbnail")
    })
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: routeFrom === "add" ? "Add Student" : "Edit Student",
    })
    if (routeFrom === "edit") {
      setValue("fullName", editData?.fullName)
      setValue("phoneNo", editData?.phoneNo)
      setValue("email", editData?.email)
      setValue("studentId", editData?.studentId)
      setValue("thumbnail", editData?.thumbnail)
    }
  }, [])

  const updateUser = async (data) => {
    try {
      const { fullName, phoneNo, email, studentId, thumbnail } = data
      // If in edit mode, get the uid of the user to update
      const userId = editData.uid

      // Reference the Firestore collection for users and get the specific user's document reference
      const userRef = firestore().collection("users").doc(userId)

      // Use the 'update()' method to update the user document with the new data
      await userRef.update({
        fullName,
        phoneNo,
        email,
        studentId,
        thumbnail,
      })

      flash("success", "User updated successfully")
      navigation.goBack()
    } catch {
      flash("error", "Failed to update user")
    }
  }

  const registerUserWithEmail = async (data) => {
    const { fullName, phoneNo, email, password, studentId, thumbnail } = data
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (e) => {
          const userRef = firestore().collection("users").doc(e?.user?.uid)
          await userRef
            .set({
              uid: e?.user?.uid,
              fullName,
              phoneNo,
              email,
              studentId,
              thumbnail,
              role: "student",
            })
            .then(async () => {
              flash("success", "Student create successfully")
              await auth().signOut()
              navigation.goBack()
            })

            .catch(() => {
              console.log("error")
              flash("error", "Error storing student details")
            })
            .finally(() => {
              setLoading(false)
            })
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            flash("error", "That email address is already in use!")
          }
          if (error.code === "auth/invalid-email") {
            flash("error", "That email address is invalid!")
          }
        })
        .finally(() => {
          setLoading(false)
        })
    } catch {
      setLoading(false)
    }
  }

  return (
    <Screen preset="scroll">
      <View style={style.container}>
        <Controller
          name="fullName"
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <>
                <TextInput
                  error={error}
                  errorMessage={error?.message}
                  title={"Name"}
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={"Please enter name"}
                />
              </>
            )
          }}
        />

        <Controller
          name="phoneNo"
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  title={"Phone Number"}
                  keyboardType="phone-pad"
                  placeholder={"Please enter phone number"}
                  errorMessage={error?.message}
                  error={error}
                  textFiledContainer={[{ marginBottom: 0 }, error && style.errorTextField]}
                  style={style.phoneNumberInputStyle}
                />
              </>
            )
          }}
        />

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
                  placeholder={"Please enter email"}
                />
              </>
            )
          }}
        />

        <Controller
          name="studentId"
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <>
                <TextInput
                  error={error}
                  errorMessage={error?.message}
                  title={"Student ID"}
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={"Please enter student ID"}
                />
              </>
            )
          }}
        />

        {routeFrom === "add" && (
          <>
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
                      placeholder={"Please enter password"}
                    />
                  </>
                )
              }}
            />

            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "This field is required",
                minLength: { value: 8, message: "Password too short" },
                validate: {
                  value: (value) =>
                    watch("password") === value || "Password and confirm password must be same",
                },
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                  <>
                    <TextInput
                      textContentType={"oneTimeCode"}
                      isPasswordField
                      errorMessage={error?.message}
                      error={error}
                      title={"Confirm Password"}
                      value={value}
                      onChangeText={onChange}
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholder={upperFirst(toLower("Please enter confirm password"))}
                    />
                  </>
                )
              }}
            />
          </>
        )}

        <Text style={style.fieldTitle}>{"Profile Picture"}</Text>
        <Controller
          name="thumbnail"
          rules={{
            required: "This field is required",
          }}
          control={control}
          render={({ fieldState: { error } }) => {
            return (
              <>
                {watch("thumbnail") && (
                  <View style={style.marginBottomTen}>
                    <TouchableOpacity
                      style={{
                        maxHeight: Dimensions.get("screen").height * 0.3,
                        maxWidth: Dimensions.get("screen").height * 0.3,
                      }}
                      onPress={() => {
                        console.log("123")
                        uploadImage()
                      }}
                    >
                      <Image
                        source={{ uri: watch("thumbnail") }}
                        resizeMode="cover"
                        style={style.uploadImage}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                {!watch("thumbnail") && (
                  <Button
                    title={"Upload"}
                    style={style.marginBottomTen}
                    onPress={() => {
                      uploadImage()
                    }}
                  />
                )}
                {error && <ErrorMessage customMessage={error?.message} />}
              </>
            )
          }}
        />

        <Button
          loading={loading}
          style={style.button}
          onPress={handleSubmit(onSubmit)}
          title={routeFrom === "edit" ? "Update" : "Add"}
        />
      </View>
    </Screen>
  )
}
