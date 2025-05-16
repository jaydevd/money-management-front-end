import axios from "axios";

const useMakeTransaction = async (body) => {
    try {
        const token = localStorage.getItem("token");
        body['date'] = Math.floor(+Date.parse(body.date) / 100);

        const result = await axios.post('http://localhost:5000/lender/transaction/receive', body, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        return result;
    } catch (error) {
        console.log(error);
    }
}

export default useMakeTransaction;