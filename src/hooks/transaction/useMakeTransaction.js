import axios from "axios";
import getCookie from "../../helpers/getCookie";

const useMakeTransaction = async (body) => {
    try {

        const token = getCookie("token");
        const response = await axios.post('http://localhost:5000/borrower/transaction', body, {
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