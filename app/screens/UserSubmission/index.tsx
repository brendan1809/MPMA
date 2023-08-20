import { Screen, TextInput, Button, ErrorMessage, Text } from "app/components"
import React, { useEffect, useState } from "react"

import { Linking, View } from "react-native"
import { style } from "./styles"
import { Controller, useForm } from "react-hook-form"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import flash from "app/config/flash"
import { useNavigation, useRoute } from "@react-navigation/native"
import DocumentUpload from "app/components/DocumentUpload"
import { useStores } from "app/models"

export const UserSubmissionScreen = () => {
  const route = useRoute()
  const editData = route?.params?.data
  const courseId = editData?.courseId || ""
  const { authStore } = useStores()
  const [submittedDocument, setSubmittedDocument] = useState(false)

  const navigation = useNavigation()
  const { control, handleSubmit, setValue, watch } = useForm({})

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    if (!submittedDocument) {
      await addStudentSubmission(data)
    } else {
      await updateStudentSubmission(data)
    }
  }

  const fetchStudentSubmission = async () => {
    try {
      const studentId = authStore?.id

      const studentSubmissionRef = firestore().collection("studentCoursework")

      const querySnapshot = await studentSubmissionRef
        .where("studentId", "==", studentId)
        .where("courseworkId", "==", editData?.id)
        .get()

      if (!querySnapshot.empty) {
        const documentUrl = querySnapshot.docs[0]?.data()?.document
        setSubmittedDocument(documentUrl) // Set the submitted document URL
      } else {
        setSubmittedDocument(null) // No submission found
      }
    } catch (error) {
      flash("error", "Failed to check student submission")
    }
  }

  const updateStudentSubmission = async (data) => {
    try {
      const { document } = data

      const courseworkId = editData.id

      // Reference the Firestore collection for student coursework
      const studentCourseworkRef = firestore().collection("studentCoursework")

      // Query for the document with the specific courseworkId
      const querySnapshot = await studentCourseworkRef
        .where("courseworkId", "==", courseworkId)
        .get()

      if (!querySnapshot.empty) {
        // Get the reference to the specific document
        const userRef = studentCourseworkRef.doc(querySnapshot.docs[0].id)

        // Use the 'update()' method to update the "document" field with the new data
        await userRef.update({
          document, // Update the "document" field with the new value
          updatedAt: new Date(),
        })

        flash("success", "Update successfully")
        navigation.goBack()
      }
    } catch (e) {
      console.log(e)
      setLoading(false)
      flash("error", "Failed to update student coursework")
    }
  }

  const addStudentSubmission = async (data) => {
    const { document } = data

    try {
      const studentCoursework = await firestore().collection("studentCoursework").doc()
      const studentCourseworkId = studentCoursework.id
      await studentCoursework
        .set({
          id: studentCourseworkId,
          document,
          courseId,
          studentId: authStore?.id,
          courseworkId: editData?.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .then(async () => {
          console.log("success")
          flash("success", "Upload successfully")
          navigation.goBack()
        })
        .catch(() => {
          console.log("failed")
          flash("error", "Error storing student coursework details")
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
    navigation.setOptions({
      headerTitle: "Submission",
    })
    fetchStudentSubmission()
    if (submittedDocument) {
      setValue("document", editData?.document)
    }
  }, [])

  return (
    <Screen preset="scroll">
      <View style={style.container}>
        <Text style={style.fieldTitle}>{editData?.title}</Text>
        <Text style={style.fieldTitle}>Document Link</Text>
        <Text style={{ color: "#1877f2" }} onPress={() => Linking.openURL(editData?.document)}>
          Download
        </Text>
        <Text style={style.fieldTitle}>{"Submission File"}</Text>
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
                  file={watch("document") || submittedDocument}
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
          title={submittedDocument ? "Update" : "Add"}
        />
      </View>
    </Screen>
  )
}
