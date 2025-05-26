import axios from "axios";
import getCookie from "../../helpers/getCookie";

const useMakeTransaction = async (body) => {
    try {

        const token = getCookie("token");
        const response = await axios.post('https://money-management-f0al.onrender.com/borrower/transaction', body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;

    } catch (error) {
        console.log(error);
    }
}

export default useMakeTransaction;