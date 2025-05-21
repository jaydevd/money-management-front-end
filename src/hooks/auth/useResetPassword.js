import axios from "axios";

const useResetPassword = async ({ id, password }) => {
    try {

        const response = await axios.post(`http://localhost:5000/auth/reset-password/${id}`, { password });
        return response;

    } catch (error) {
        console.log(error);

    }
}

export default useResetPassword;