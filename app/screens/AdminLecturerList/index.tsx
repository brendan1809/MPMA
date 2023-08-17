import { Screen, Text, TextInput } from "app/components"
import React, { useEffect, useState } from "react"

import { ActivityIndicator, Alert, FlatList, Image, TouchableOpacity, View } from "react-native"
import Icons from "@expo/vector-icons/AntDesign"
import firestore from "@react-native-firebase/firestore"
import { style } from "./styles"
import flash from "app/config/flash"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { colors } from "app/theme"

export const AdminLecturerListScreen = () => {
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [userList, setUserList] = useState([])
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const fetchUsers = async (searchName?: string) => {
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

      // Perform partial search on the client-side
      const filteredUsers = users.filter((user) =>
        user.fullName?.toLowerCase().includes(searchName?.toLowerCase()),
      )

      // Update the users state with filtered results
      setUserList(users || filteredUsers)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      flash("error", "Failed to retreive lecturer")
    }
  }

  const deleteUser = async (userId) => {
    setLoading(true)
    try {
      // Reference the Firestore collection for users
      const usersCollectionRef = firestore().collection("users")

      // Delete the user document based on the user ID
      await usersCollectionRef.doc(userId).delete()

      // After successful deletion, fetch the updated users
      flash("success", "Delete lecturer successfully")
      fetchUsers()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      flash("error", "Failed to delete lecturer")
    }
  }

  useEffect(() => {
    // Fetch users initially (without search)
    fetchUsers()
  }, [isFocused])

  return (
    <Screen>
      <View style={style.container}>
        <TextInput
          returnKeyType="search"
          autoComplete="off"
          placeholder="Search by name"
          value={searchText}
          onChangeText={setSearchText}
          containerStyle={style.searchContainer}
          onSubmitEditing={() => {
            fetchUsers(searchText)
          }}
        />
        {loading ? (
          <ActivityIndicator size={"large"} color={"white"} />
        ) : (
          <FlatList
            data={userList}
            ListEmptyComponent={() => {
              return (
                <View style={style.emptyContainer}>
                  <Text style={style.emptyTitle}>There's nothing in the list!</Text>
                </View>
              )
            }}
            renderItem={({ item }) => {
              return (
                <View style={style.contentContainer}>
                  <View style={style.row}>
                    <Image source={{ uri: item?.thumbnail }} style={style.image} />
                    <View style={style.textContainer}>
                      <Text style={{ color: colors.white }}>{item.fullName}</Text>
                      <Text style={{ color: colors.white }}>{item.phoneNo}</Text>
                      <Text style={{ color: colors.white }}>{item.email}</Text>
                    </View>
                  </View>
                  <View style={style.logoViewContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("AdminLecturerListEdit", {
                          routeFrom: "edit",
                          data: item,
                        })
                      }
                    >
                      <Icons name="edit" color="white" size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          "Warning",
                          "Are you sure you want to remove this?",
                          [
                            {
                              text: "Cancel",
                              style: "destructive",
                            },
                            {
                              text: "Confirm",
                              onPress: async () => {
                                deleteUser(item?.uid)
                              },
                            },
                          ],
                          { cancelable: false },
                        )
                      }}
                    >
                      <Icons name="delete" color="white" size={22} />
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }}
          />
        )}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("AdminLecturerListEdit", { routeFrom: "add" })}
        style={style.floatingButton}
      >
        <Text style={style.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </Screen>
  )
}
