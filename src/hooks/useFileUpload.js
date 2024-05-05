import { useCallback } from "react";
import api from "../services/api.js";

const useFileUpload = () => {
    const uploadFile = useCallback(async (formData) => {
        const response = await api.post("/file/upload", formData);
        return response;
    }, []);
    
    return { uploadFile };
}

export default useFileUpload;



