import axios from "axios";

const useResetPassword = async ({ id, password }) => {
    try {

        const response = await axios.post(`https://money-management-f0al.onrender.com/auth/reset-password/${id}`, { password });
        return response;

    } catch (error) {
        console.log(error);

    }
}

export default useResetPassword;