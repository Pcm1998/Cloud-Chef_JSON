import { useMutation, UseMutationResult, UseMutationOptions } from 'react-query';
import axios, { AxiosResponse } from 'axios';

// Define the type for the file and query parameters
interface UploadFileParams {
  file: File;
  id: string;
  // Add other query parameters here
}

// Create the hook for uploading a file
export const useUploadFile = (): UseMutationResult<
  AxiosResponse<any>, // Replace with the expected response type
  unknown, // Replace with the error type
  UploadFileParams
> => {
  return useMutation(
    (params: UploadFileParams) => {
      const { file, ...otherParams } = params;
      const formData = new FormData();
      formData.append('file', file);
      // Append other query parameters to the formData

      return axios.post(`${process.env.REACT_APP_API_URL}/upload?id=${otherParams.id}`, formData, {
        // Add any additional configurations for the file upload
      }, );
    },
    {
      // Add any additional options for the useMutation hook
    }
  );
};
