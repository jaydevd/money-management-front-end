import axios from "axios";
import getCookie from "../../helpers/getCookie";

const useAddLender = async (body) => {
    try {

        const token = getCookie("token");

        // const baseUrl = 'https://money-management-f0al.onrender.com';
        const baseUrl = 'http://localhost:5000';

        const response = await axios.post(`${baseUrl}/lender/add`, body, {
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