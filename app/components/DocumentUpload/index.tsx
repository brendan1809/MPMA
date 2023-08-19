import React from "react"
import { View, Text, TouchableOpacity, Platform, Linking } from "react-native"
import DocumentPicker, { DocumentPickerResponse } from "react-native-document-picker"
import storage from "@react-native-firebase/storage"
import styles from "./styles"
import RNFS from "react-native-fs"

const DocumentUpload = ({ setFile, file }) => {
  const handleUpload = async () => {
    try {
      const result: DocumentPickerResponse | null = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.docx, DocumentPicker.types.doc],
      })

      if (result) {
        const fileUri = Platform.OS === "android" ? result.uri : result.uri.replace("file://", "")
        const fileName = result.name
        const fileContent = await RNFS.readFile(fileUri, "base64")

        const documentRef = storage().ref().child(`documents/${fileName}`)

        console.log(documentRef, "-reffff")

        await documentRef.putString(fileContent, "base64")

        const downloadURL = await documentRef.getDownloadURL()

        console.log(downloadURL, "url")
        setFile(downloadURL)
      }
    } catch (error) {
      console.error("Error uploading document:", error)
      throw error
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity>
      {file && <Text onPress={() => Linking.openURL(file)}>{file}</Text>}
    </View>
  )
}

export default DocumentUpload
