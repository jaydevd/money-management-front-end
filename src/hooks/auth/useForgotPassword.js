import axios from "axios";

const useForgotPassword = async ({ email }) => {
    try {

        // const baseUrl = 'https://money-management-f0al.onrender.com';
        const baseUrl = 'http://localhost:5000';

        const response = await axios.post(`${baseUrl}/auth/forgot-password`, { email });
        sessionStorage.clear();

        return response;

    } catch (error) {
        console.log(error);
    }
}

export default useForgotPassword;