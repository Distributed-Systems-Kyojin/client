import { useCallback } from "react";
import api from "../services/api";

const useDeleteFile = () => {
    const deleteFile = useCallback(async (fileId) => {
        const response = await api.delete(`/file/deleteFile/${fileId}`);
        return response;
    }, []);

    return { deleteFile };
}

export default useDeleteFile;