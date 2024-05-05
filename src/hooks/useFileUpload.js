import { useCallback } from "react";
import api from "../services/api.js";

const useFileUpload = () => {
    const uploadFile = useCallback(async (formData) => {
        const response = await api.post("/upload", formData);
        return response.data;
    }, []);
    
    return { uploadFile };
}

export default useFileUpload;



