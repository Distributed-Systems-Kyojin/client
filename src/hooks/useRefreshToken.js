import useAuth from "./useAuth";
import axios from "../services/api";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true,
        });
        console.log("inside useRefreshToken: ", response.data);
        setAuth(response.data);
    }

    return { refresh };
};

export default useRefreshToken;