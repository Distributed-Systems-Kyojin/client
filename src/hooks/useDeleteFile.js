import { useCallback } from "react";
import api from "../services/api";

// toastify
import { toast } from 'react-toastify';

const useDeleteFile = () => {
    const deleteFile = useCallback(async (fileId) => {
        try {
            const response = await api.delete(`/file/deleteFile/${fileId}`);
            return response.data;
        } catch (error) {
            console.log(error.message);
            toast.error("An error occurred while deleting the file.");
        }
    }, []);

    return { deleteFile };
}

export default useDeleteFile;