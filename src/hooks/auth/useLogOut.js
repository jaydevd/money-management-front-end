import axios from "axios";
import getCookie from "../../helpers/getCookie";

const useLogOut = async () => {
    try {

        const token = getCookie("token");
        console.log(token);

        // const baseUrl = 'https://money-management-f0al.onrender.com';
        const baseUrl = 'http://localhost:5000';

        const response = await axios.post(`${baseUrl}/auth/logout`, null, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        sessionStorage.clear();

        const now = new Date();
        now.setTime(now.getTime() + 1 * 1000);
        const tokenExpiry = now.toUTCString();

        document.cookie = `token=; expires=${tokenExpiry}; path=/`;
        return response;

    } catch (error) {
        console.log(error);
    }
}

export default useLogOut;