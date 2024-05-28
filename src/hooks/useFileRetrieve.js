import { useCallback } from "react";
import api from "../services/api";

const useFileRetrieve = () => {
    const fetchFile = useCallback(async (fileId) => {
        const response = await api.get(`/file/retrieve/${fileId}`);
        return response;
    }, []);

    return { fetchFile };
}

export default useFileRetrieve;