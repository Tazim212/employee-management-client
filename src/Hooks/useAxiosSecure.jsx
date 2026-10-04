import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 5000,
});

const useAxiosSecure = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config => {
      const token = localStorage.getItem("token")
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }

    ));

    const resInterceptor = instance.interceptors.response.use((response) => {
      return response
    }, (error) => {
      const statusCode = error.status;
      if (statusCode === 401 || statusCode === 403) {
            navigate("/login")
      }

      return Promise.reject(error)
    })

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(resInterceptor)
    }


  }, [user])
  return instance
}
export default useAxiosSecure;