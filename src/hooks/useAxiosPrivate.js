import { axiosPrivate } from "../services/api";
import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
    const { refresh } = useRefreshToken();
    const { auth } = useAuth();

    /**
     * Interceptors are much like vanilla js event listeners. They get attached and we also need to remove them or piling them up would cause a mess with our requests and responses.
     */

    useEffect(() => {

        const requestInterceptor = axiosPrivate.interceptors.request.use(
            async (config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, 
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                console.log("inside useAxiosPrivate response interceptor");
                console.log(error?.response?.status);
                console.log(prevRequest._retry);

                if (error?.response?.status === 401 && !prevRequest?._retry) {
                    prevRequest._retry = true;
                    const result = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${result.accessToken}`;
                    return axiosPrivate(prevRequest);
                }

                return Promise.reject(error);
            }
        );

        return () => {
            privateApi.interceptors.request.eject(requestInterceptor);
            privateApi.interceptors.response.eject(responseInterceptor);
        }

    }, [auth, refresh]);

    return axiosPrivate;
}

export default useAxiosPrivate;

