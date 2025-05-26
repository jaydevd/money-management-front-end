import axios from "axios";
import getCookie from "../../helpers/getCookie";

const useInviteAdmin = async (body) => {
    try {

        const token = getCookie("token");
        // const baseUrl = 'https://money-management-f0al.onrender.com';
        const baseUrl = 'http://localhost:5000';

        const response = await axios.post(`${baseUrl}/admin/invite`, body, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        console.log(response);
        return response;

    } catch (error) {
        console.log(error);
    }
}

export default useInviteAdmin;