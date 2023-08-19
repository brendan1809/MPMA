import { Screen, TextInput, Button, Text, DropdownPicker } from "app/components"
import React, { useEffect, useState } from "react"

import { Dimensions, Image, View, TouchableOpacity } from "react-native"
import { style } from "./styles"
import { Controller, useForm } from "react-hook-form"
import firestore from "@react-native-firebase/firestore"
import flash from "app/config/flash"
import { useNavigation, useRoute } from "@react-navigation/native"
import DateTimePickerModal, { CancelButton } from "react-native-modal-datetime-picker"
import moment from "moment"

export const AdminTimetableEditScreen = () => {
  const route = useRoute()
  const routeFrom = route?.params?.routeFrom || ""
  const editData = route?.params?.data
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState()
  const [isDateAttributeOpen, setIsDateAttributeOpen] = useState(false)
  const [selectedDateAttribute, setSelectedDateAttribute] = useState()
  const [courseList, setCourseList] = useState([])
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false)
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false)
  const [items] = useState([
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Fridayy" },
  ])

  const navigation = useNavigation()
  const { control, handleSubmit, setValue, watch } = useForm({})

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCourse()
    navigation.setOptions({
      headerTitle: routeFrom === "add" ? "Add Timetable" : "Edit Timetable",
    })
    if (routeFrom === "edit") {
      setValue("locationName", editData?.locationName)
      setValue("startTime", editData?.startTime)
      setValue("endTime", editData?.endTime)
      setSelectedDateAttribute(editData?.day)
      setSelectedCourse(editData?.courseId)
    }
  }, [])

  const onSubmit = async (data) => {
    setLoading(true)
    if (routeFrom === "add") {
      await addTimetable(data)
    } else {
      await updateTimetable(data)
    }
  }

  const handleStartDateConfirm = (date: Date) => {
    setValue("startTime", date)
    setStartDatePickerVisibility(false)
  }

  const handleEndDateConfirm = (date: Date) => {
    setValue("endTime", date)
    setEndDatePickerVisibility(false)
  }

  const fetchCourse = async () => {
    setLoading(true)
    try {
      const courseCollectionRef = firestore().collection("course")

      // Get the query results
      const querySnapshot = await courseCollectionRef.get()

      // Process the fetched documents
      const courses = []
      querySnapshot.forEach((doc) => {
        courses.push(doc.data())
      })

      setCourseList(courses)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      flash("error", "Failed to retreive course")
    }
  }

  const updateTimetable = async (data) => {
    try {
      const { locationName, startTime, endTime } = data

      // If in edit mode, get the uid of the user to update
      const courseId = editData.id

      // Reference the Firestore collection for users and get the specific user's document reference
      const userRef = firestore().collection("timetable").doc(courseId)

      const selectedCourseName = await courseList.filter((e) => e?.id === selectedCourse)

      // Use the 'update()' method to update the user document with the new data
      await userRef.update({
        locationName,
        startTime,
        endTime,
        courseName: selectedCourseName[0]?.name,
        courseId: selectedCourse,
        day: selectedDateAttribute,
      })

      flash("success", "Course updated successfully")
      navigation.goBack()
    } catch {
      flash("error", "Failed to update course")
    }
  }

  const addTimetable = async (data) => {
    const { locationName, startTime, endTime } = data
    try {
      // Query the timetable collection for existing entries with the same courseId and day
      const existingTimetableRef = firestore()
        .collection("timetable")
        .where("courseId", "==", selectedCourse)

      const existingTimetableSnapshot = await existingTimetableRef.get()

      // If an entry already exists, show an error message
      if (!existingTimetableSnapshot.empty) {
        flash("error", "A timetable entry already exists for this course and day.")
        setLoading(false)
        return
      }

      const timetableRef = await firestore().collection("timetable").doc()
      const timetableId = timetableRef.id
      const selectedCourseName = await courseList.filter((e) => e?.id === selectedCourse)

      await timetableRef
        .set({
          id: timetableId,
          locationName,
          startTime,
          endTime,
          courseName: selectedCourseName[0]?.name,
          courseId: selectedCourse,
          day: selectedDateAttribute,
        })
        .then(async () => {
          flash("success", "Timetable create successfully")
          navigation.goBack()
        })
        .catch(() => {
          flash("error", "Error storing timetable details")
        })
        .finally(() => {
          setLoading(false)
        })
    } catch (e) {
      flash("error", "Error storing timetable details")
      setLoading(false)
    }
  }

  return (
    <Screen preset="scroll">
      <View style={style.container}>
        <Controller
          name="course"
          control={control}
          render={() => {
            return (
              <>
                <Text style={style.fieldTitle}>{"Course"}</Text>
                <DropdownPicker
                  schema={{
                    label: "name",
                    value: "id",
                  }}
                  open={isCourseModalOpen}
                  searchPlaceholder="Please select a course"
                  placeholder="Please select course"
                  value={selectedCourse}
                  items={courseList}
                  setOpen={setIsCourseModalOpen}
                  setValue={setSelectedCourse}
                />
              </>
            )
          }}
        />

        <Controller
          name="locationName"
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
                  title={"Location Name"}
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
          name="startTime"
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field: { value }, fieldState: { error } }) => {
            console.log(value?.seconds)
            return (
              <>
                <TextInput
                  error={error}
                  errorMessage={error?.message}
                  value={
                    value?.seconds
                      ? moment.unix(value?.seconds).format("h:mm a")
                      : moment(value).format("h:mm a")
                  }
                  onPress={() => setStartDatePickerVisibility(true)}
                  title={"Start time"}
                  editable={false}
                  selectTextOnFocus={false}
                  placeholder={"Please enter start time"}
                  textFiledContainer={error && style.errorTextField}
                />
                <DateTimePickerModal
                  mode="time"
                  customCancelButtonIOS={(props) => (
                    <CancelButton {...props} buttonTextColorIOS="red" />
                  )}
                  maximumDate={watch("endTime") && new Date(watch("endTime"))}
                  isVisible={isStartDatePickerVisible}
                  onConfirm={handleStartDateConfirm}
                  onCancel={() => setStartDatePickerVisibility(false)}
                />
              </>
            )
          }}
        />

        <Controller
          name="endTime"
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field: { value }, fieldState: { error } }) => {
            return (
              <>
                <TextInput
                  error={error}
                  errorMessage={error?.message}
                  value={
                    value?.seconds
                      ? moment.unix(value?.seconds).format("h:mm a")
                      : moment(value).format("h:mm a")
                  }
                  onPress={() => setEndDatePickerVisibility(true)}
                  title={"End Time"}
                  editable={false}
                  selectTextOnFocus={false}
                  placeholder={"Please enter end time"}
                  textFiledContainer={error && style.errorTextField}
                />
                <DateTimePickerModal
                  mode="time"
                  minimumDate={watch("startTime") && new Date(watch("startTime"))}
                  customCancelButtonIOS={(props) => (
                    <CancelButton {...props} buttonTextColorIOS="red" />
                  )}
                  isVisible={isEndDatePickerVisible}
                  onConfirm={handleEndDateConfirm}
                  onCancel={() => setEndDatePickerVisibility(false)}
                />
              </>
            )
          }}
        />

        <Controller
          name="dateAttribute"
          control={control}
          render={() => {
            return (
              <>
                <Text style={style.fieldTitle}>{"Date Attribute"}</Text>
                <DropdownPicker
                  open={isDateAttributeOpen}
                  searchPlaceholder="Please select a date"
                  placeholder="Please select date"
                  value={selectedDateAttribute}
                  items={items}
                  setOpen={setIsDateAttributeOpen}
                  setValue={setSelectedDateAttribute}
                />
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
