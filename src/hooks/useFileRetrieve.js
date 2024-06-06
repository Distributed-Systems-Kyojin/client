import { useCallback } from "react";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useFileRetrieve = () => {

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const fetchFile = useCallback(async (fileId) => {
        try {
            const response = await axiosPrivate.get(`/file/retrieve/${fileId}`, {
                responseType: "arraybuffer",
            });
            return response;
        } catch (error) {
            error = JSON.parse(new TextDecoder().decode(new Uint8Array(response.data)));
            console.log(error?.response);
            if (error?.response?.data?.error.message === "jwt expired") {
                console.log("jwt expired");
            } else {
                throw error;
            }
        }
    }, [auth]);

    return { fetchFile };
}

export default useFileRetrieve;