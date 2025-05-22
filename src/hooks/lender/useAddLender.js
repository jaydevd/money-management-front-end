import axios from "axios";

const useAddLender = async (body) => {
    try {
        const token = localStorage.getItem("token");

        const result = await axios.post('http://localhost:5000/lender/add', body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export default useAddLender;