import axios from "axios";

const useMakeTransaction = async (body) => {
    try {
        const token = localStorage.getItem("token");
        body['date'] = Math.floor(+Date.parse(body.date) / 1000);
        console.log(body);

        const result = await axios.post('http://localhost:5000/lender/transaction/receive', body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return result;
    } catch (error) {
        console.log(error);
    }
}

export default useMakeTransaction;