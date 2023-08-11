import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
// import { DocumentUploadProps } from './props';
import styles from './styles';

const DocumentUpload = ({ onUpload }) => {
  const [result, setResult] = useState<DocumentPickerResponse | null>(null);

  const handleUpload = async () => {
    try {
      const pickedResult: DocumentPickerResponse | null = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.docx, DocumentPicker.types.doc],
      });

      if (pickedResult) {
        setResult(pickedResult)
        onUpload(result.uri);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User cancelled the picker
      } else {
        // Handle other errors
        console.error('Error picking document:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {result && result.name ? (
        <Text>Uploaded: {result.name}"</Text>
      ) : (
        <Text>Select a file to upload</Text>
      )}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DocumentUpload;