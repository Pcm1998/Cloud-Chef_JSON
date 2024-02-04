// FileUpload.tsx
import React, { ChangeEvent, useState } from 'react';
import { useUploadFile } from '../api/file-upload';
import { ulid } from 'ulid';
import { getLocalStorage, setLocalStorage } from './LocalStorage';
import { useQueryClient } from 'react-query';

interface Styles {
  container: React.CSSProperties;
  fileInput: React.CSSProperties;
  uploadButton: React.CSSProperties;
  customInputLabel: React.CSSProperties;
}

const FileUpload: React.FC<{}> = () => {
  const mutation = useUploadFile();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };
  let id = getLocalStorage() || ulid()
  const queryClient = useQueryClient();

  const queryKey = 'data';


  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      if (!selectedFile.name.endsWith('.json')) {
        setSelectedFile(null);
        alert('Please select json file');
      }
      reader.onload = () => {
        try {
          const jsonData = JSON.parse(reader.result as string);
          mutation.mutate({file: selectedFile, id: id}, {onSuccess(data, variables, context) {
              setLocalStorage(id);
              setSelectedFile(null);
              queryClient.invalidateQueries(queryKey);

              alert('File successfully uploaded!')
          },})
        } catch (error) {
          setSelectedFile(null);
          console.error('Error parsing JSON file:', error);
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  const styles: Styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      marginBottom: '20px',
      justifyContent: 'center'
    },
    fileInput: {
      marginBottom: '10px',
      display: 'none',
    },
    customInputLabel: {
      cursor: 'pointer',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
      display: 'inline-block',
    },
    
    uploadButton: {
      padding: '10px',
      margin: '10px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <>
    <h5 style={{textAlign: 'center'}}>Upload JSON file to view the Tree Hierarchy </h5>
    <div style={styles.container}>
    <label htmlFor="fileInput" style={styles.customInputLabel}>
      {selectedFile ? selectedFile.name :  "Choose a JSON file" }
      <input
        type="file"
        id="fileInput"
        accept=".json"
        onChange={handleFileChange}
        style={styles.fileInput}
      />
    </label>
      <button
        onClick={handleUpload}
        disabled={!selectedFile}
        style={styles.uploadButton}
      >
        Upload
      </button>
    </div>
    </>
  );
};


export default FileUpload;
