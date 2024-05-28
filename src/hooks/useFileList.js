import { useCallback } from "react";
import api from "../services/api";

const useFileList = () => {
    const fetchFileList = useCallback(async () => {
        const response = await api.get("/file/getFileList");
        return response.data;
    }, []);

    return { fetchFileList };
}

export default useFileList;