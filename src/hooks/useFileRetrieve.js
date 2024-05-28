import { useCallback } from "react";
import api from "../services/api";

const useFileRetrieve = () => {
    const fetchFile = useCallback(async (fileName) => {
        const response = await api.get(`/file/${fileName}`);
        return response;
    }, []);

    return { fetchFile };
}

export default useFileRetrieve;