import React, { useState } from 'react';
import ImagePickerProps from './props';

export const ImagePicker: React.FC<ImagePickerProps> = ({ onChange }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setSelectedImage(selectedFile);
    onChange(selectedFile);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" />}
    </div>
  );
};

// export default ImagePicker;