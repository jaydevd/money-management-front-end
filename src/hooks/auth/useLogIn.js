import axios from "axios";

const useLogIn = async (data) => {
    try {


        // const baseUrl = 'https://money-management-f0al.onrender.com';
        const baseUrl = 'http://localhost:5000';

        const response = await axios.post(`${baseUrl}/auth/login`, data);

        const token = response.data.data.token;
        console.log('token: ', token);

        const now = new Date();
        now.setTime(now.getTime() + 1 * 3600 * 1000);
        const tokenExpiry = now.toUTCString();

        document.cookie = `token=${token}; expires=${tokenExpiry}; path=/`;

        const admin = response.data.data.adminDetails;
        sessionStorage.setItem("admin", JSON.stringify(admin));

        return response;

    } catch (error) {
        console.log(error);
        sessionStorage.clear();

        return error.response;
    }
}

export default useLogIn;