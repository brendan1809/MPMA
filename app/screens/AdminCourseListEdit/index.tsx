import { Screen, TextInput, Button, ErrorMessage, Text, DropdownPicker } from "app/components"
import React, { useEffect, useState } from "react"

import { Dimensions, Image, View } from "react-native"
import { style } from "./styles"
import { Controller, useForm } from "react-hook-form"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import flash from "app/config/flash"
import { useNavigation, useRoute } from "@react-navigation/native"
import { size } from "lodash"
import { TouchableOpacity } from "react-native-gesture-handler"
import ImagePicker from "react-native-image-crop-picker"
import storage from "@react-native-firebase/storage"

export const AdminCourseListEdit = () => {
  const route = useRoute()
  const routeFrom = route?.params?.routeFrom || ""
  const editData = route?.params?.data
  const [isLecturerModalOpen, setIsLecturerModalOpen] = useState(false)
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false)
  const [studentList, setStudentList] = useState([])
  const [selectedLecturer, setSelectedLecturer] = useState([])
  const [selectedStudent, setSelectedStudent] = useState([])
  const [lecturerList, setLecturerList] = useState([])
  const navigation = useNavigation()
  const { control, handleSubmit, clearErrors, setValue, watch } = useForm({})

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    if (routeFrom === "add") {
      await addCourse(data)
    } else {
      await updateCourse(data)
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
      headerTitle: routeFrom === "add" ? "Add Course" : "Edit Course",
    })
    if (routeFrom === "edit") {
      fetchLecturer()
      fetchStudentList()
      fetchAssignedStudent(true)
      setValue("name", editData?.name)
      setValue("courseCode", editData?.courseCode)
      setValue("thumbnail", editData?.thumbnail)
      setSelectedLecturer(editData?.lecturer)
    }
  }, [])

  const fetchLecturer = async () => {
    setLoading(true)
    try {
      const usersCollectionRef = firestore().collection("users")

      // Construct the query to fetch all users
      const query = usersCollectionRef.where("role", "==", "lecturer")

      // Get the query results
      const querySnapshot = await query.get()

      // Process the fetched documents
      const users = []
      querySnapshot.forEach((doc) => {
        users.push(doc.data())
      })

      // Update the users state with filtered results
      setLecturerList(users)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      flash("error", "Failed to retreive lecturer")
    }
  }

  const fetchStudentList = async () => {
    setLoading(true)
    try {
      const usersCollectionRef = firestore().collection("users")

      // Construct the query to fetch all users
      const query = usersCollectionRef.where("role", "==", "student")

      // Get the query results
      const querySnapshot = await query.get()

      // Process the fetched documents
      const users = []
      querySnapshot.forEach((doc) => {
        users.push(doc.data())
      })

      // Update the users state with filtered results
      setStudentList(users)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      flash("error", "Failed to retreive student")
    }
  }

  const fetchAssignedStudent = async (isSetData) => {
    setLoading(true)
    try {
      const studentCoureworkRef = firestore().collection("studentCourse")

      // Construct the query to fetch all users
      const query = studentCoureworkRef.where("courseId", "==", editData?.id)

      // Get the query results
      const querySnapshot = await query.get()

      // Process the fetched documents
      const student = []
      querySnapshot.forEach((doc) => {
        student.push(doc.data()?.studentId)
      })

      if (isSetData) {
        // Update the users state with filtered results
        setSelectedStudent(student)
      }

      setLoading(false)

      return student
    } catch (error) {
      setLoading(false)
      flash("error", "Failed to retreive student")
      return null
    }
  }

  const updateCourse = async (data) => {
    try {
      const { name, courseCode, thumbnail } = data

      if (size(selectedStudent) > 0) {
        // Add selected students to the course
        selectedStudent.forEach((studentId) => {
          addStudentToCourse(studentId)
        })
      }

      // Fetch existing students assigned to the course
      const existingStudents = await fetchAssignedStudent(false)

      console.log(existingStudents, "----")

      // Compare with selected students and remove if needed
      existingStudents?.forEach(async (existingStudent) => {
        if (!selectedStudent.includes(existingStudent)) {
          await removeStudentFromCourse(existingStudent)
        }
      })
      // If in edit mode, get the uid of the user to update
      const courseId = editData.id

      // Reference the Firestore collection for users and get the specific user's document reference
      const userRef = firestore().collection("course").doc(courseId)

      // Use the 'update()' method to update the user document with the new data
      await userRef.update({
        name,
        courseCode,
        thumbnail,
        lecturer: selectedLecturer,
      })

      flash("success", "Course updated successfully")
      navigation.goBack()
    } catch {
      flash("error", "Failed to update course")
    }
  }

  const removeStudentFromCourse = async (studentId) => {
    try {
      const courseId = editData?.id
      const studentCoureworkRef = firestore().collection("studentCourse")

      // Find and delete the document where courseId and studentId match
      const querySnapshot = await studentCoureworkRef
        .where("courseId", "==", courseId)
        .where("studentId", "==", studentId)
        .get()

      querySnapshot.forEach(async (doc) => {
        await doc.ref.delete()
      })
    } catch {
      flash("error", "Failed to remove student from course")
    }
  }

  const addStudentToCourse = async (studentId) => {
    try {
      const courseId = editData?.id
      const studentCourseRef = firestore().collection("studentCourse")

      // Check if student already assigned to the course
      const querySnapshot = await studentCourseRef
        .where("courseId", "==", courseId)
        .where("studentId", "==", studentId)
        .get()

      // If a document exists, remove student from course, else add
      if (querySnapshot.size === 0) {
        const studentCourse = await studentCourseRef.doc()
        const studentCourseId = studentCourse.id
        await studentCourse
          .set({
            id: studentCourseId,
            studentId,
            courseId,
          })
          .catch(() => {
            flash("error", "Error storing student course details")
          })
          .finally(() => {
            setLoading(false)
          })
      }
    } catch {
      setLoading(false)
    }
  }

  const addCourse = async (data) => {
    const { name, courseCode, thumbnail } = data
    try {
      const courseRef = await firestore().collection("course").doc()
      const courseId = courseRef.id
      await courseRef
        .set({
          id: courseId,
          name,
          courseCode,
          thumbnail,
        })
        .then(async () => {
          flash("success", "Course create successfully")
          navigation.goBack()
        })
        .catch(() => {
          flash("error", "Error storing course details")
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
          name="name"
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
          name="courseCode"
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
                  title={"Course Code"}
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder={"Please enter course code"}
                />
              </>
            )
          }}
        />

        {routeFrom === "edit" && (
          <Controller
            name="lecturer"
            control={control}
            render={() => {
              return (
                <>
                  <Text style={style.fieldTitle}>{"Lecturer Assigned"}</Text>
                  <DropdownPicker
                    schema={{
                      label: "fullName",
                      value: "uid",
                    }}
                    open={isLecturerModalOpen}
                    searchPlaceholder="Please select a lecturer"
                    placeholder="Please select lecturer"
                    value={selectedLecturer}
                    items={lecturerList}
                    setOpen={setIsLecturerModalOpen}
                    setValue={setSelectedLecturer}
                  />
                </>
              )
            }}
          />
        )}

        {routeFrom === "edit" && (
          <Controller
            name="student"
            control={control}
            render={() => {
              return (
                <>
                  <Text style={style.fieldTitle}>{"Student Assigned"}</Text>
                  <DropdownPicker
                    multiple
                    schema={{
                      label: "fullName",
                      value: "uid",
                    }}
                    mode="BADGE"
                    open={isStudentModalOpen}
                    placeholder="Please select student"
                    searchPlaceholder="Please select a student"
                    value={selectedStudent}
                    items={studentList}
                    setOpen={setIsStudentModalOpen}
                    setValue={setSelectedStudent}
                  />
                </>
              )
            }}
          />
        )}

        <Text style={style.fieldTitle}>{"Upload (Cover Image)"}</Text>
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
                      }}
                      onPress={() => {
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
