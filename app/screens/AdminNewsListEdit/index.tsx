import { Screen, TextInput, Button, ErrorMessage, Text } from "app/components"
import React, { useEffect, useState } from "react"

import { Dimensions, Image, View, TouchableOpacity } from "react-native"
import { style } from "./styles"
import { Controller, useForm } from "react-hook-form"
import firestore from "@react-native-firebase/firestore"
import flash from "app/config/flash"
import { useNavigation, useRoute } from "@react-navigation/native"
import storage from "@react-native-firebase/storage"
import ImageCropPicker from "react-native-image-crop-picker"

export const AdminNewsListEdit = () => {
  const route = useRoute()
  const routeFrom = route?.params?.routeFrom || ""
  const editData = route?.params?.data
  const navigation = useNavigation()
  const { control, handleSubmit, clearErrors, setValue, watch } = useForm({})

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    if (routeFrom === "add") {
      await addNews(data)
    } else {
      await updateNews(data)
    }
  }

  const uploadImage = () => {
    ImageCropPicker.openPicker({
      includeBase64: true,
      cropping: true,
    }).then(async (image) => {
      const storageRef = storage().ref(`/news/${image.filename}`)
      await storageRef.putFile(image.path, { contentType: image.mime })

      const downloadURL = await storageRef.getDownloadURL()
      setValue("thumbnail", downloadURL)
      clearErrors("thumbnail")
    })
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: routeFrom === "add" ? "Add News" : "Edit News",
    })
    if (routeFrom === "edit") {
      setValue("title", editData?.title)
      setValue("description", editData?.description)
      setValue("thumbnail", editData?.thumbnail)
    }
  }, [])

  const updateNews = async (data) => {
    try {
      const { title, description, thumbnail } = data
      // If in edit mode, get the uid of the user to update
      const newsId = editData.id

      // Reference the Firestore collection for users and get the specific user's document reference
      const userRef = firestore().collection("news").doc(newsId)

      // Use the 'update()' method to update the user document with the new data
      await userRef.update({
        thumbnail,
        title,
        description
      })

      flash("success", "Banner updated successfully")
      navigation.goBack()
    } catch {
      flash("error", "Failed to update banner")
    }
  }

  const addNews = async (data) => {
    const { thumbnail, title, description } = data
    try {
      const newsRef = await firestore().collection("news").doc()
      const newsId = newsRef.id

      // Use FieldValue.serverTimestamp() to get the server's timestamp
      const timestamp = firestore.FieldValue.serverTimestamp();

      await newsRef
        .set({
          id: newsId,
          title,
          description,
          thumbnail,
          createdAt: timestamp
        })
        .then(async () => {
          flash("success", "news create successfully")
          navigation.goBack()
        })
        .catch(() => {
          flash("error", "Error storing news details")
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
          name="title"
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
                  title={"Title"}
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={"Please enter a title"}
                />
              </>
            )
          }}
        />
        <Controller
          name="description"
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
                  title={"Description"}
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  multiline={true}
                  autoCorrect={false}
                  placeholder={"Please enter a description"}
                  style={style.phoneNumberInputStyle}
                />
              </>
            )
          }}
        />
        <Text style={style.fieldTitle}>{"News Picture"}</Text>
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
                        uploadImage()
                      }}
                    >
                      <Image
                        source={{ uri: watch("thumbnail") }}
                        resizeMode="contain"
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
