import axios from "axios";
import getCookie from "../../helpers/getCookie";

const useInviteAdmin = async (body) => {
    try {

        const token = getCookie("token");

        const response = await axios.post('http://localhost:5000/admin/invite', body, {
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