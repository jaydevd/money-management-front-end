import axios from "axios";

const useMakeTransaction = async (body) => {
    try {
        const token = localStorage.getItem("token");
        body['date'] = Math.floor(+Date.parse(body.date) / 1000);

        const result = await axios.post('http://localhost:5000/borrower/transaction/pay', body, {
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