import axios from "axios";
import getCookie from "../../helpers/getCookie";

const useInviteAdmin = async (body) => {
    try {

        const token = getCookie("token");

        const response = await axios.post('https://money-management-f0al.onrender.com/admin/invite', body, {
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