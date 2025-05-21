import axios from "axios";

const useForgotPassword = async ({ email }) => {
    try {
        console.log(email);
        const url = 'http://localhost:5173/auth/reset-password';
        const response = await axios.post(`http://localhost:5000/auth/forgot-password`, { email, url });

        localStorage.clear();

        return response;

    } catch (error) {
        console.log(error);
    }
}

export default useForgotPassword;