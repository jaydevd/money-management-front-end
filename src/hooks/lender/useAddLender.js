import axios from "axios";
import getCookie from "../../helpers/getCookie";

const useAddLender = async (body) => {
    try {

        const token = getCookie("token");

        const response = await axios.post('https://money-management-f0al.onrender.com/lender/add', body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;

    } catch (error) {
        console.log(error);
    }
}

export default useAddLender;