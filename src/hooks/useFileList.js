import { useCallback } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const GET_FILE_LIST_URL = "/file/getFileList";

const useFileList = () => {

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const fetchFileList = useCallback(async () => {
        try {
            const response = await axiosPrivate.get(GET_FILE_LIST_URL);
            return response.data;
        } catch (error) {
            if (error?.response?.data?.error.message === "jwt expired") {
                console.log("jwt expired");
            } else {
                throw error;
            }
        }
    }, [auth]);

    return { fetchFileList };
}

export default useFileList;