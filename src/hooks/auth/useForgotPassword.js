import axios from "axios";

const useForgotPassword = async ({ email }) => {
    try {
        const response = await axios.post(`http://localhost:5000/auth/forgot-password`, { email });
        localStorage.clear();

        return response;

    } catch (error) {
        console.log(error);
    }
}

export default useForgotPassword;