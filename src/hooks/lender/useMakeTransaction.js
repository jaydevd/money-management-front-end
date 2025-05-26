import axios from "axios";
import getCookie from "../../helpers/getCookie";

const useMakeTransaction = async (body) => {
    try {

        body['date'] = Math.floor(+Date.parse(body.date) / 1000);

        const token = getCookie("token");

        const response = await axios.post('https://money-management-f0al.onrender.com/lender/transaction/receive', body, {
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