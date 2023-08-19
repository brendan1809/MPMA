import { Screen, TextInput, Button, ErrorMessage, Text, DropdownPicker } from "app/components"
import React, { useEffect, useState } from "react"

import { View } from "react-native"
import { style } from "./styles"
import { Controller, useForm } from "react-hook-form"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import flash from "app/config/flash"
import { useNavigation, useRoute } from "@react-navigation/native"
import DocumentUpload from "app/components/DocumentUpload"

export const AdminCourseworkListEditScreen = () => {
  const route = useRoute()
  const routeFrom = route?.params?.routeFrom || ""
  const editData = route?.params?.data
  const courseId = route?.params?.courseId || ""
  const [selectedMethod, setSelectedMethod] = useState("")
  const [isMethodModalOpen, setIsmethodModalOpen] = useState(false)
  const [items] = useState([
    { label: "Assignment", value: "assignment" },
    { label: "Slide", value: "slide" },
    { label: "Tutorial", value: "tutorial" },
  ])
  const navigation = useNavigation()
  const { control, handleSubmit, clearErrors, setValue, watch } = useForm({})

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    if (routeFrom === "add") {
      await addCoursework(data)
    } else {
      await updateCoursework(data)
    }
  }

  const updateCoursework = async (data) => {
    try {
      const { title, document } = data

      const courseworkId = editData.id

      // Reference the Firestore collection for users and get the specific user's document reference
      const userRef = firestore().collection("coursework").doc(courseworkId)

      // Use the 'update()' method to update the user document with the new data
      await userRef.update({
        title,
        method: selectedMethod,
        document,
      })

      flash("success", "Coursework updated successfully")
      navigation.goBack()
    } catch (e) {
      console.log(e)
      setLoading(false)
      flash("error", "Failed to update coursework")
    }
  }

  const addCoursework = async (data) => {
    const { title, document } = data

    try {
      const courseworkRef = await firestore().collection("coursework").doc()
      const courseworkId = courseworkRef.id
      await courseworkRef
        .set({
          id: courseworkId,
          title,
          method: selectedMethod,
          document,
          courseId,
        })
        .then(async () => {
          console.log("success")
          flash("success", "Coursework create successfully")
          navigation.goBack()
        })
        .catch(() => {
          console.log("failed")
          flash("error", "Error storing coursework details")
        })
        .finally(() => {
          setLoading(false)
        })
    } catch (e) {
      console.log(e, "failed")
      setLoading(false)
    }
  }

  useEffect(() => {
    setSelectedMethod("assignment")
    navigation.setOptions({
      headerTitle: routeFrom === "add" ? "Add Coursework" : "Edit Coursework",
    })
    if (routeFrom === "edit") {
      setValue("title", editData?.title)
      setSelectedMethod(editData?.method)
      setValue("method", editData?.method)
      setValue("document", editData?.document)
    }
  }, [])

  return (
    <Screen preset="scroll">
      <View style={style.container}>
        <Controller
          name="method"
          control={control}
          render={() => {
            return (
              <>
                <Text style={style.fieldTitle}>{"Method"}</Text>
                <DropdownPicker
                  searchable={false}
                  open={isMethodModalOpen}
                  placeholder="Please select lecturer"
                  value={selectedMethod}
                  items={items}
                  setOpen={setIsmethodModalOpen}
                  setValue={setSelectedMethod}
                />
              </>
            )
          }}
        />

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
                  placeholder={"Please enter title"}
                />
              </>
            )
          }}
        />

        <Text style={style.fieldTitle}>{"Document"}</Text>
        <Controller
          name="document"
          rules={{
            required: "This field is required",
          }}
          control={control}
          render={({ fieldState: { error } }) => {
            return (
              <>
                <DocumentUpload
                  setFile={async (e) => await setValue("document", e)}
                  file={watch("document")}
                />
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
