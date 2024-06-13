import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const AvatarUpload = ({ setAvatarUrl }) => {
    const [preview, setPreview] = useState(null);

    const onDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error('Failed to upload image');
            }

            const data = await response.json();
            setAvatarUrl(data.secure_url);
            setPreview(URL.createObjectURL(file));
        } catch (error) {
            console.error('Error uploading avatar:', error);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const dropzoneStyle = {
        border: '2px dashed #007bff',
        borderRadius: '5px',
        padding: '20px',
        textAlign: 'center',
        marginTop: '20px',
    };

    return (
        <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} />
            {preview ? (
                <img src={preview} alt="Avatar Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            ) : (
                <p>Drag 'n' drop an image, or click to select one</p>
            )}
        </div>
    );
};

export default AvatarUpload;
