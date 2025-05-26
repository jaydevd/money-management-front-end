import axios from "axios";

const useResetPassword = async ({ id, password }) => {
    try {

        // const baseUrl = 'https://money-management-f0al.onrender.com';
        const baseUrl = 'http://localhost:5000';

        const response = await axios.post(`${baseUrl}/auth/reset-password/${id}`, { password });
        return response;

    } catch (error) {
        console.log(error);

    }
}

export default useResetPassword;