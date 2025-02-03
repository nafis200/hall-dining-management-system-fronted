import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://hall-management-beta.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;