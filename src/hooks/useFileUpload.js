import { useCallback } from "react";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate.js";

const useFileUpload = () => {

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const uploadFile = useCallback(async (formData) => {
        try {
            const response = await axiosPrivate.post("/file/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response;
        } catch (error) {
            if (error?.response?.data?.error.message === "jwt expired") {
                console.log("jwt expired");
            } else {
                throw error;
            }
        }
    }, [auth]);
    
    return { uploadFile };
}

export default useFileUpload;



