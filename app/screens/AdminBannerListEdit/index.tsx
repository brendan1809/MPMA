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

export const AdminBannerListEdit = () => {
  const route = useRoute()
  const routeFrom = route?.params?.routeFrom || ""
  const editData = route?.params?.data
  const navigation = useNavigation()
  const { control, handleSubmit, clearErrors, setValue, watch } = useForm({})

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    if (routeFrom === "add") {
      await addBanner(data)
    } else {
      await updateBanner(data)
    }
  }

  const uploadImage = () => {
    ImageCropPicker.openPicker({
      includeBase64: true,
      cropping: true,
    }).then(async (image) => {
      const storageRef = storage().ref(`/banners/${image.filename}`)
      await storageRef.putFile(image.path, { contentType: image.mime })

      const downloadURL = await storageRef.getDownloadURL()
      setValue("thumbnail", downloadURL)
      clearErrors("thumbnail")
    })
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: routeFrom === "add" ? "Add Banner" : "Edit Banner",
    })
    if (routeFrom === "edit") {
      setValue("title", editData?.title)
      setValue("description", editData?.description)
      setValue("thumbnail", editData?.thumbnail)
    }
  }, [])

  const updateBanner = async (data) => {
    try {
      const { title, description, thumbnail } = data
      // If in edit mode, get the uid of the user to update
      const bannerId = editData.id

      // Reference the Firestore collection for users and get the specific user's document reference
      const userRef = firestore().collection("banners").doc(bannerId)

      // Use the 'update()' method to update the user document with the new data
      await userRef.update({
        title,
        description,
        thumbnail,
      })

      flash("success", "Banner updated successfully")
      navigation.goBack()
    } catch {
      flash("error", "Failed to update banner")
    }
  }

  const addBanner = async (data) => {
    const { title, description, thumbnail } = data
    try {
      const bannerRef = await firestore().collection("banners").doc()
      const bannerId = bannerRef.id
      await bannerRef
        .set({
          id: bannerId,
          title,
          description,
          thumbnail
        })
        .then(async () => {
          flash("success", "Banner create successfully")
          navigation.goBack()
        })
        .catch(() => {
          flash("error", "Error storing banner details")
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
                  placeholder={"Please enter banner title"}
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
                  value={value}
                  onChangeText={onChange}
                  title={"Decription"}
                  placeholder={"Please enter banner description"}
                  errorMessage={error?.message}
                  error={error}
                  textFiledContainer={[{ marginBottom: 0 }, error && style.errorTextField]}
                  style={style.phoneNumberInputStyle}
                />
              </>
            )
          }}
        />

        <Text style={style.fieldTitle}>{"Banner Picture"}</Text>
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
