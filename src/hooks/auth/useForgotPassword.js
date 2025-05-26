import axios from "axios";

const useForgotPassword = async ({ email }) => {
    try {
        const response = await axios.post(`https://money-management-f0al.onrender.com/auth/forgot-password`, { email });
        sessionStorage.clear();

        return response;

    } catch (error) {
        console.log(error);
    }
}

export default useForgotPassword;