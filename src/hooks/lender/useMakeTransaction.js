import axios from "axios";
import getCookie from "../../helpers/getCookie";

const useMakeTransaction = async (body) => {
    try {

        body['date'] = Math.floor(+Date.parse(body.date) / 1000);

        const token = getCookie("token");

        const response = await axios.post('http://localhost:5000/lender/transaction/receive', body, {
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