import useAuth from "./useAuth";
import axios from "../services/api";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.get('/auth/refresh', {
                withCredentials: true,
            });
            setAuth(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    return refresh;
};

export default useRefreshToken;