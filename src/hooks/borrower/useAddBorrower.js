import axios from "axios";

const useAddBorrower = async (body) => {
    try {
        const token = localStorage.getItem("token");

        const result = await axios.post('http://localhost:5000/borrower/add', body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

export default useAddBorrower;