import { useCallback } from "react";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useDeleteFile = () => {

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const deleteFile = useCallback(async (fileId) => {
        try {
            const response = await axiosPrivate.delete(`/file/deleteFile/${fileId}`);
            return response;
        } catch (error) {
            if (error?.response?.data?.error.message === "jwt expired") {
                console.log("jwt expired");
            } else {
                throw error;
            }
        }
    }, [auth]);

    return { deleteFile };
}

export default useDeleteFile;