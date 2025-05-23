import axios from "axios";
import getCookie from "../../helpers/getCookie";

const useAddBorrower = async (body) => {
    try {

        const token = getCookie("token");

        const response = await axios.post('http://localhost:5000/borrower/add', body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);

        return response;

    } catch (error) {
        console.log(error);
    }
}

export default useAddBorrower;